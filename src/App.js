import "./App.css";
import { Fragment } from "react";
import Headers from "./Components/UI/Header";
import AuthPage from "./Components/Pages/Auth-page";

function App() {
  return (
    <Fragment>
      <Headers />
      <AuthPage />
    </Fragment>
  );
}

export default App;
