import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const Headers = () => {
  return (
    <Navbar bg="dark">
      <Container className="d-flex ">
        <Navbar.Brand href="#" className="text-white">
          Header Component
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default Headers;
