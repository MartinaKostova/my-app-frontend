import React from "react";
import ReactDOM from "react-dom";
import Header from "./header/Header";
import Create from "./create/Create"
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/create" component={Create} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
