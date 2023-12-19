import React, { useEffect } from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import gmail from "../../Assets/gmailmainlogo.png";
import logout from "../../Assets/logoutbtn.png";
import { useDispatch, useSelector } from "react-redux";
import { Authaction } from "../../Store/AuthSlice";
import { useHistory } from "react-router-dom";

const Headers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isloggedin = useSelector((state) => state.auth.islogged);

  useEffect(() => {
    const email = localStorage.getItem("loginemail");
    if (email) {
      dispatch(Authaction.login());
    }
  });

  const logoutbtnHandler = () => {
    dispatch(Authaction.logout());
    history.replace("/auth");
  };
  return (
    <Navbar bg="dark">
      <Container className="d-flex ">
        {/* <Navbar.Brand href="#" className="text-white">
          Header Component
        </Navbar.Brand> */}
        <Image
          src={gmail}
          style={{ marginLeft: "100px" }}
          alt="Gmail Logo"
          className="gmail-logo"
        />
        {isloggedin && (
          <Button
            onClick={logoutbtnHandler}
            style={{ background: "none", border: "none" }}
          >
            <Image src={logout} alt="logout" />
          </Button>
        )}
      </Container>
    </Navbar>
  );
};
export default Headers;
