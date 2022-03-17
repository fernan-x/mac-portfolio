import React from "react";
import { StatusBar } from "./components/Smartphone";

const SmartphoneApp = () => {
  return (
    <div className="smartphone-app locked">
      <StatusBar />
      <div className="content"></div>
      <div className="footer">
        <div className="footer__slider"></div>
      </div>
    </div>
  );
};

export default SmartphoneApp;
