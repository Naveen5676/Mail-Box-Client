import React from "react";
import { Navbar, Container , Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import gmail from '../../Assets/gmailmainlogo.png'

const Headers = () => {
  return (
    <Navbar bg="dark">
      <Container className="d-flex ">
        {/* <Navbar.Brand href="#" className="text-white">
          Header Component
        </Navbar.Brand> */}
        <Image src={gmail} alt="Gmail Logo" className="gmail-logo" />
      </Container>
    </Navbar>
  );
};
export default Headers;
