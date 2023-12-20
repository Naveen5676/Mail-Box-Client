import React, { useRef, useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from "react-bootstrap";
import { convertToRaw } from "draft-js";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Authaction } from "../../Store/AuthSlice";
import { Modalaction } from "../../Store/ModalSlice";

const ComposeModal = () => {
  let sentemail = useRef();
  let subject = useRef();

  const composebtnstate = useSelector((state) => state.modal.composebtn);
  console.log(composebtnstate);
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState("");
  //console.log(editorState);

  const mailSubmitHandler = (e) => {
    // Get the plain text content from the editorState
    const editorContent = editorState.getCurrentContent();
    const rawContentState = convertToRaw(editorContent);
    const message = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");

    e.preventDefault();
    let data = {
      sentfromemail: localStorage.getItem("loginemail"),
      email: sentemail.current.value,
      subject: subject.current.value,
      message: message,
      messageread: false,
    };

    const sendingemail = localStorage.getItem("loginemail");
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/sent/${sendingemail}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error while sending data");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let receivedemail = sentemail.current.value.replace(/[@.]/g, "");
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${receivedemail}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function MyVerticallyCenteredModal(props) {
    const modalclosebtnHandler = () => {
      props.onHide();
      dispatch(Modalaction.setFalse());
    };

    const handleModalClose = () => {
      dispatch(Modalaction.setFalse());
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Compose Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={mailSubmitHandler}>
            <Form.Group controlId="toField">
              <Form.Control type="email" placeholder="To" ref={sentemail} />
            </Form.Group>
            <Form.Group controlId="subjectField">
              <Form.Control type="text" placeholder="Subject" ref={subject} />
            </Form.Group>
            <Form.Group controlId="editorField">
              <Editor
                editorState={editorState}
                onEditorStateChange={(newEditorState) =>
                  setEditorState(newEditorState)
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={modalclosebtnHandler}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(composebtnstate);
  }, [composebtnstate]);

  return (
    <div>
      <>
        {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}
        {/* {setModalShow(composebtnstate)} */}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    </div>
  );
};

export default ComposeModal;
