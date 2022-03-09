import React from "react";
import "./Dock.scss";
import constants from "../../constants/constants.js";

const DockEntry = ({ index, name, img, classes, last }) => {
  const resize = (e, idx) => {
    let icons = document.querySelectorAll(".ico");
    const elem = e.target;
    let previous = idx - 1;
    let previous1 = idx - 2;
    let next = idx + 1;
    let next2 = idx + 2;

    if (previous === -1) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else if (next === icons.length) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
      icons[previous].style.transform = "scale(1.2) translateY(-6px)";
      if (icons[previous1]) {
        icons[previous1].style.transform = "scale(1.1)";
      }
      icons[next].style.transform = "scale(1.2) translateY(-6px)";
      if (icons[next2]) {
        icons[next2].style.transform = "scale(1.1)";
      }
    }
  };

  const reset = () => {
    let icons = document.querySelectorAll(".ico");
    icons.forEach((item) => {
      item.style.transform = "scale(1)  translateY(0px)";
    });
  };

  return (
    <li className={`li-${index} ${last ? "li-bin" : ""}`}>
      <div className="name">{name}</div>
      <img
        src={img}
        alt={name}
        onMouseOver={(e) => resize(e, index - 1)}
        onMouseLeave={reset}
        className={classes}
      />
    </li>
  );
};

const Dock = () => {
  return (
    <>
      <div className="menu-bar">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png"
            className="apple-logo"
            alt=""
          />
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
            <img
              src="https://freepngimg.com/download/united_states/76187-sound-information-united-business-states-address-email.png"
              alt=""
              className="vol"
            />
          </div>
          <div className="menu-ico">
            <i className="fab fa-bluetooth-b"></i>
          </div>
          <div className="menu-ico">
            <i className="fas fa-battery-half"></i>
          </div>
          <div className="menu-ico">
            <i className="fas fa-wifi"></i>
          </div>
          <div className="menu-ico">
            <i className="fas fa-search"></i>
          </div>
          <div className="menu-ico">
            <img
              src="https://eshop.macsales.com/blog/wp-content/uploads/2021/03/control-center-icon.png"
              alt=""
              className="control-center"
            />
          </div>
          <div className="menu-ico">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/8/8e/AppleSiriIcon2017.png"
              alt=""
              className="siri"
            />
          </div>

          <div className="menu-time">Mon 31 May 05:30</div>
        </div>
      </div>

      <div className="dock">
        <div className="dock-container">
          {constants.dockEntries.map((entry, idx) => (
            <DockEntry
              name={entry.name}
              img={entry.img}
              key={idx + 1}
              index={idx + 1}
              classes={entry.classes}
              last={entry.last}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dock;
