import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

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
                <li class="nav-item">
                  <a href="#" class="nav-link align-middle px-0">
                    <i class="fs-4 bi-house"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Inbox</span>
                    <p>{count}</p>
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-table"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline">Orders</span>
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
