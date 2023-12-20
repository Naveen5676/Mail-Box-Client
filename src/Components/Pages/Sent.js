import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailAction } from "../../Store/EmailSlice";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sent = () => {
  const dispatch = useDispatch();
  const sentdata = useSelector((state) => state.email.sentemaildata);
  useEffect(() => {
    let email = localStorage.getItem("loginemail");
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/sent/${email}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          const dataArray = Object.entries(data).map(([id, data]) => ({
            id,
            ...data,
          }));
          dispatch(emailAction.sentemail(dataArray));
          //console.log(dataArray)
        }
      });
  }, [dispatch]);

  const deleteHandler = (id) => {
    let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch(emailAction.deletesentmail(id));
          alert("deleted");
        }
        if (!res.ok) {
          throw new Error("error");
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
        <h1>Sent Emails</h1>
          {sentdata.map((item) => (
            <Col
              key={item.id}
              xs={12}
              md={12}
              lg={12}
              style={{ border: "3px solid #ccc", marginBottom: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/Sentdetails/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card  style={{ border: 'none' }}>
                    <Card.Body>
                      {/* <Card.Img
                      src={item.messageread ? whitedot : bluedot}
                      style={{ width: "20px", height: "20px" }}
                    /> */}
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
                      {/* <Card.Text
                    style={{ display: "inline", marginLeft: "10px" }}
                  >
                    {item.id}
                  </Card.Text> */}
                    </Card.Body>
                  </Card>
                </Link>
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};
export default Sent;
