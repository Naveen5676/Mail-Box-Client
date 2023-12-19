import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import gmaillogo from "../../Assets/gmaillogo2.png";
import compose from "../../Assets/compose.png";
import { Button, Image } from "react-bootstrap";

const SidePanel = () => {
  let count = 0;
  const emaildata = useSelector((state) => state.email.receivedemaildata);

  emaildata.forEach((data) => {
    if (data.messageread === false) {
      count++;
    }
  });

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-11 col-sm-4 col-md-5 col-lg-4 col-xl-2 px-sm-2 px-0 bg-dark min-vh-1">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <img
                  src={gmaillogo}
                  style={{ width: "80px" }}
                  alt="Gmail Logo"
                  className="gmail-logo"
                />
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item" style={{ marginBottom: "8px" }}>
                  <NavLink to="/home" activeStyle={{ color: "white" }}>
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      Inbox {count}
                    </span>
                  </NavLink>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <a href="#" className="nav-link px-0 align-middle">
                    <NavLink to="/sent" activeStyle={{ color: "white" }}>
                      <i className="fs-4 bi-table"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Sent</span>
                    </NavLink>
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-0 align-middle">
                    <Button
                      style={{
                        background: "none",
                        border: "none",
                        marginLeft: "-45px",
                      }}
                    >
                      <Image
                        src={compose}
                        style={{ marginLeft: "-px", width: "130px" }}
                      ></Image>{" "}
                    </Button>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          {/* Removed the div tag that restricted the right side */}
        </div>
      </div>
    </Fragment>
  );
};

export default SidePanel;
