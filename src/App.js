import "./App.css";
import { Fragment } from "react";
import Headers from "./Components/UI/Header";
import AuthPage from "./Components/Pages/Auth-page";
import Home from "./Components/Pages/Home";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Fragment>
      <Headers />
      <Switch>
        <Route path="/Auth">
          <AuthPage />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
