import React from "react";
import "./MenuBar.scss";
import images from "../../constants/images";

const MenuBar = () => {
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

        <div className="menu-time">Mon 31 May 05:30</div>
      </div>
    </div>
  );
};

export default MenuBar;
