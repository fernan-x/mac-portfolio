import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/styles.scss";
import "./services/translation.js";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
