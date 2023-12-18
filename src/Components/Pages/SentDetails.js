import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const SentDetails =()=>{

  const params = useParams();
  const emaildata = useSelector((state) => state.email.sentemaildata);

  // Use find to get the exact email data based on params.item
  const exactemaildata = emaildata.find((data) => data.id === params.sentitemID)
    return(
        <Fragment>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>

            <Card>
              <h1>Sent Email Details</h1>
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
}
export default SentDetails