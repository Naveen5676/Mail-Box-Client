import React, { Fragment, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailAction } from "../../Store/EmailSlice";
import bluedot from "../../Assets/bluedot.jpg";
import whitedot from "../../Assets/whitedot.jpg";
import { Link } from "react-router-dom";

const Inbox = () => {
  let dispatch = useDispatch();
  const reducerdata = useSelector((state) => state.email.receivedemaildata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");
        const response = await fetch(
          `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}.json`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data. Status: ${response.status}`);
        }
        const resdata = await response.json();
        if (resdata) {
          const dataArray = Object.entries(resdata).map(([id, data]) => ({
            id,
            ...data,
          }));
          dispatch(emailAction.receivedemail(dataArray));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const data = useSelector((state) => state.email.receivedemaildata);
  console.log("reducer data", data);

  const messageinfoHandler = (item) => {
    console.log("card clicked");
    let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}/${item.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageread: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          // Dispatch the action to update the Redux store
          dispatch(
            emailAction.receivedemail(
              data.map((i) =>
                i.id === item.id ? { ...i, messageread: false } : i
              )
            )
          );
          // dispatch(emailAction.updatemessage(item.id))

          alert("message changes to true");
        }
        if (!res.ok) {
          throw new Error("error will updating message status");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Container>
        <Row>
          {data.map((item) => (
            <Col key={item.id} xs={12} md={12} lg={12}>
              <Link
                to={`/inboxdetail/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card onClick={() => messageinfoHandler(item)}>
                  <Card.Body style={{ whiteSpace: "nowrap" }}>
                    <Card.Img
                      src={item.messageread ? whitedot : bluedot}
                      style={{ width: "20px", height: "20px" }}
                    />
                    {/* <Card.Text style={{ display: "inline" }}>
                      {item.messageread ? "msg read" : "msg not read"}
                    </Card.Text> */}
                    <Card.Text
                      style={{ display: "inline", marginLeft: "15px" }}
                    >
                      {item.sentfromemail}
                    </Card.Text>
                    <Card.Text
                      style={{ display: "inline", marginLeft: "10px" }}
                    >
                      {item.subject}
                    </Card.Text>
                    <Card.Text
                      style={{ display: "inline", marginLeft: "10px" }}
                    >
                      {item.message}
                    </Card.Text>
                    <Card.Text
                      style={{ display: "inline", marginLeft: "10px" }}
                    >
                      {item.id}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Inbox;
