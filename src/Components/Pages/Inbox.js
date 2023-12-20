import React, { Fragment, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailAction } from "../../Store/EmailSlice";
import bluedot from "../../Assets/bluedot.jpg";
import whitedot from "../../Assets/whitedot.jpg";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const Inbox = () => {
  let dispatch = useDispatch();
 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");
  //       const response = await fetch(
  //         `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}.json`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`Error fetching data. Status: ${response.status}`);
  //       }
  //       const resdata = await response.json();
  //       if (resdata) {
  //         const dataArray = Object.entries(resdata).map(([id, data]) => ({
  //           id,
  //           ...data,
  //         }));
  //         dispatch(emailAction.receivedemail(dataArray));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

   //   fetchData();
  //       // Fetch data every 2 minutes (120,000 milliseconds)
  //       const intervalId = setInterval(fetchData, 2000);
  //       console.log('Interval set up.');
  //       // Cleanup the interval when the component unmounts
  //       return () =>{ clearInterval(intervalId);  console.log('Interval cleared.');}
  // }, [dispatch]);

  let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");
  const [resdata] = useFetch(`https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}.json`)
  {resdata && dispatch(emailAction.receivedemail(resdata));}


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
                i.id === item.id ? { ...i, messageread: true } : i
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
          dispatch(emailAction.deleteereceivedmail(id));
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
        <h1>Received Emails</h1>
          {data.map((item) => (
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
                  to={`/inboxdetail/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card  style={{ border: 'none' }} onClick={() => messageinfoHandler(item)}>
                    <Card.Body>
                      <Card.Img
                        src={item.messageread ? whitedot : bluedot}
                        style={{ width: "20px", height: "20px" }}
                      />
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

export default Inbox;
