import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/styles.scss";
import "./services/translation.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigurationProvider } from "./context/ConfigurationContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigurationProvider>
        <App />
      </ConfigurationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
