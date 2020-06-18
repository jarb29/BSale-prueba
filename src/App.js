import React from "react";
import injectContext from "./AppContext";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages



import EcommercePrueba from "views/examples/EcommercePrueba";

// others

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/e-commercee" render={props => <EcommercePrueba {...props} />} />
      <Redirect to="/e-commercee"  />
    </Switch>
  </BrowserRouter>
)};

export default injectContext(App);

