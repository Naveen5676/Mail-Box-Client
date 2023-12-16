import React, { Fragment, useRef, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import signup from "../../Assets/signup2.jpg";
import login from "../../Assets/login.jpg";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  const [loginsignup, setloginsignup] = useState(true);
  let enetredemail = useRef();
  let enteredpwd = useRef();
  let reenteredpwd = useRef();
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if passwords match
    let renterdpwd; // Declare renterdpwd outside the block

    if (!loginsignup) {
      renterdpwd = reenteredpwd.current.value; // Assign value inside the block
    }

    if (loginsignup) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
        {
          method: "POST",
          body: JSON.stringify({
            email: enetredemail.current.value,
            password: enteredpwd.current.value,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("logged in successfully");
            history.replace("/home");
          } else {
            throw new Error("error while login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (enteredpwd.current.value !== renterdpwd) {
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
    }
  };

  const loginorsignupbtnHandler = () => {
    setloginsignup((preValue) => !preValue);
  };

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col>
            <Card>
              <Card.Img
                src={loginsignup ? login : signup}
                style={{ height: "500px", width: "600px" }}
              />
            </Card>
          </Col>
          <Col className="px-0" style={{ border: "2px solid black" }}>
            <Card
              style={{
                backgroundColor: loginsignup ? "#057afb" : "rgb(201, 76, 76)",
                padding: loginsignup ? "100px" : "80px",
              }}
            >
              <Card.Title className="text-center" style={{ fontSize: "30px" }}>
                {loginsignup ? "LOGIN" : "SIGN-UP"}
              </Card.Title>
              <Card.Body className="text-white d-flex flex-column align-items-center">
                <form
                  className="text-white"
                  style={{ fontSize: "20px" }}
                  onSubmit={submitHandler}
                >
                  <label>Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="Email"
                    ref={enetredemail}
                    required
                  />
                  <br />
                  <label>Password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    ref={enteredpwd}
                    required
                  />
                  <br />
                  {!loginsignup && (
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="mt-2"
                      ref={reenteredpwd}
                      {...(loginsignup
                        ? { required: false }
                        : { required: true })}
                    ></input>
                  )}
                  {!loginsignup && <br />}
                  <Button
                    type="submit"
                    variant="success"
                    style={{ width: "240px", marginTop: "20px" }}
                  >
                    {loginsignup ? "Login" : "Sign-Up"}
                  </Button>
                </form>
              </Card.Body>
              <Button variant="dark" onClick={loginorsignupbtnHandler}>
                {loginsignup
                  ? "Dont have an account create one here?"
                  : "Have an account Login Click Here?"}
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AuthPage;
