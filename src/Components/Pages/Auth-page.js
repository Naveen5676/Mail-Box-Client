import React, { Fragment, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import signup from "../../Assets/signup2.jpg";

const AuthPage = () => {
  let enetredemail = useRef();
  let enteredpwd = useRef();
  let reenteredpwd = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (enteredpwd.current.value !== reenteredpwd.current.value) {
      alert("Passwords do not match");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
      {
        method: "POST",
        body: JSON.stringify({
          email: enetredemail.current.value,
          password: enteredpwd.current.value,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("account created successfully");
        }
        if (!response.ok) {
          throw new Error(response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col>
            <Card>
              <Card.Img
                src={signup}
                style={{ height: "470px", width: "600px" }}
              />
            </Card>
          </Col>
          <Col className="px-0" style={{ border: "2px solid black" }}>
            <Card
              style={{ backgroundColor: "rgb(201, 76, 76)", padding: "75px" }}
            >
              <Card.Title className="text-center" style={{ fontSize: "30px" }}>
                Sign Up
              </Card.Title>
              <Card.Body className="text-white d-flex flex-column align-items-center">
                <form
                  className="text-white"
                  style={{ fontSize: "20px" }}
                  onSubmit={submitHandler}
                >
                  <label>Email</label>
                  <br />
                  <input type="email" placeholder="Email" ref={enetredemail} />
                  <br />
                  <label>Password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    ref={enteredpwd}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mt-2"
                    ref={reenteredpwd}
                  ></input>
                  <br />
                  <br />
                  <Button type="submit">Sign-Up</Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AuthPage;
