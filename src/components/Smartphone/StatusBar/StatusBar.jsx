import React from "react";
import { smartphoneImages } from "../../../constants/images";

import "./StatusBar.scss";

const StatusBar = ({ hour }) => {
  return (
    <div className="statusbar">
      <div className="statusbar__left">
        <span className="statusbar__left-hour">{hour}</span>
      </div>
      <div className="statusbar__right">
        <img
          className="statusbar__right-ico signal"
          src={smartphoneImages.signal}
          alt="signal"
        />
        <img
          className="statusbar__right-ico wifi"
          src={smartphoneImages.wifi}
          alt="wifi"
        />
        <img
          className="statusbar__right-ico battery"
          src={smartphoneImages.battery}
          alt="battery"
        />
      </div>
    </div>
  );
};

export default StatusBar;
