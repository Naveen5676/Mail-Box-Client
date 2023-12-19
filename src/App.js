import "./App.css";
import { Fragment } from "react";
import Headers from "./Components/UI/Header";
import AuthPage from "./Components/Pages/Auth-page";
import Home from "./Components/Pages/Home";
import { Route, Switch } from "react-router-dom";
import InboxDetail from "./Components/Pages/InboxDetail";
import SidePanel from "./Components/UI/SidePanel";
import Sent from "./Components/Pages/Sent";
import SentDetails from "./Components/Pages/SentDetails";
import { useSelector } from "react-redux";

function App() {
  const loginingo = useSelector((state)=> state.auth.islogged)
  return (
    <Fragment>
      <Headers />
      <div className="container-fluid">
        <div className="row flex-nowrap">
        {loginingo &&<div className="col-auto col-md-2 col-xl-1 px-sm-2 px-0 bg-dark">
            <SidePanel />
          </div>}
          <div className="col py-3">
            <Switch>
              <Route path="/Auth">
                <AuthPage />
              </Route>
              <Route path="/Home">
                {loginingo && <Home />}
              </Route>
              <Route path='/Sent'>
                {loginingo && <Sent/>}
              </Route>
              <Route path="/inboxdetail/:inboxitemID">
                {loginingo && <InboxDetail />}
              </Route>
              <Route path='/Sentdetails/:sentitemID'>
                {loginingo && <SentDetails/>}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
