import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { convertToRaw } from "draft-js";

const ComposeForm = () => {
  let sentemail = useRef();
  let subject = useRef();

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

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            {" "}
            {/* Set the desired width for the card */}
            <Card>
              <Card.Body>
                <Form onSubmit={mailSubmitHandler}>
                  <Form.Group controlId="toField">
                    <Form.Control
                      type="email"
                      placeholder="To"
                      ref={sentemail}
                    />
                  </Form.Group>
                  <Form.Group controlId="subjectField">
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      ref={subject}
                    />
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComposeForm;
