import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/styles.scss";
import "./services/translation.js";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
