import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bankapp from "./bankApp"
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<Search />, document.getElementById("search"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


ReactDOM.render(<Bankapp/>, document.getElementById("bankapp"));
