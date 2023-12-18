import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

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
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span class="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
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
                  <a href="#" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-people"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Customers</span>{" "}
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
