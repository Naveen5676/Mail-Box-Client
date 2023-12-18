import React, { Fragment } from "react";
import Inbox from "./Inbox";
import ComposeForm from "./ComposeForm";
import SidePanel from "./SidePanel";
const Home = () => {
  return (
    <Fragment>
      <div class="col py-3">
        <ComposeForm />
        <Inbox />
      </div>
    </Fragment>
  );
};

export default Home;
