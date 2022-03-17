import React, { useState, useEffect } from "react";
import moment from "moment";
import { smartphoneImages } from "../../../constants/images";

import "./StatusBar.scss";

const StatusBar = () => {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const dateFormat = "dddd, MMMM D";
  const hourFormat = "h:mm";

  useEffect(() => {
    setDate(moment().format(dateFormat));
    setHour(moment().format(hourFormat));

    const interval = setInterval(() => {
      setDate(moment().format(dateFormat));
      setHour(moment().format(hourFormat));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
