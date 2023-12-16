import React, { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

const Inbox = () => {
  const [emailData, setemailData] = useState([]);

  let email = localStorage.getItem("loginemail").replace(/[@.]/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/received/${email}.json`
        );
        const data = await response.json();
        const dataArray = Object.entries(data).map(([id, data]) => ({
          id,
          ...data,
        }));

        setemailData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <Fragment>
      <Container>
        <Row>
          {emailData.map((item) => (
            <Col key={item.id} xs={12} md={12} lg={12}>
              <Card>
                <Card.Body style={{ whiteSpace: "nowrap" }}>
                  <Card.Text style={{ display: "inline" }}>
                    {item.sentfromemail}
                  </Card.Text>
                  <Card.Text style={{ display: "inline", marginLeft: "10px" }}>
                    {item.subject}
                  </Card.Text>
                  <Card.Text style={{ display: "inline", marginLeft: "10px" }}>
                    {item.message}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Inbox;
