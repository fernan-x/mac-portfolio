import React, { useEffect, useState } from "react";
import "./MenuBar.scss";
import images from "../../constants/images";
import moment from "moment";

const MenuBar = () => {
  const [date, setDate] = useState(null);
  const dateFormat = "ddd D MMMM h:mm a";

  useEffect(() => {
    setDate(moment().format(dateFormat));

    const interval = setInterval(() => {
      setDate(moment().format(dateFormat));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menu-bar">
      <div className="left">
        <div className="menu-ico">
          <img src={images.apple} alt="Apple" />
        </div>
        <span className="menus active">Finder</span>
        <span className="menus">File</span>
        <span className="menus">Edit</span>
        <span className="menus">View</span>
        <span className="menus">Go</span>
        <span className="menus">Window</span>
        <span className="menus">Help</span>
      </div>
      <div className="right">
        <div className="menu-ico">
          <img src={images.battery} alt="Battery" />
        </div>
        <div className="menu-ico">
          <img src={images.controlcenter} alt="Control center" />
        </div>
        <div className="menu-ico">
          <img src={images.search} alt="Search" />
        </div>
        <div className="menu-ico">
          <img src={images.wifi} alt="Wifi" />
        </div>

        <div className="menu-time">{date}</div>
      </div>
    </div>
  );
};

export default MenuBar;
