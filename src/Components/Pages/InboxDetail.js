import React, { Fragment, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InboxDetail = () => {
  const params = useParams();
  const emaildata = useSelector((state) => state.email.receivedemaildata);

  // Use find to get the exact email data based on params.item
  const exactemaildata = emaildata.find((data) => data.id === params.itemID);

  console.log("Redux state in InboxDetail:", emaildata);
  console.log("exactemaildata:", exactemaildata);
  console.log("params", params.itemID);

  if (!exactemaildata) {
    // Handle the case where no matching email is found
    return <div>Email not found</div>;
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Card>
              <Card.Title style={{ paddingLeft: "30px", paddingTop: "20px" }}>
                {exactemaildata.subject}
              </Card.Title>
              <Card.Body>
                <Card.Text>
                  sent From : {exactemaildata.sentfromemail}
                </Card.Text>
                <Card.Text>Subject : {exactemaildata.subject}</Card.Text>
                <Card.Text>Body : {exactemaildata.message}</Card.Text>
                <Card.Text>To email :{exactemaildata.email}</Card.Text>
                {/* Add other properties as needed */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default InboxDetail;
