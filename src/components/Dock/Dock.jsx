import React from "react";
import "./Dock.scss";
import constants from "../../constants/constants.js";

const DockEntry = ({ id, index, name, img, classes, last }) => {
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

  const setActive = (e) => {
    let elem = e.target;
    if (elem.nodeName === "IMG") {
      elem = elem.parentNode;
    }
    elem.classList.add("active");

    // TODO : launch App
    if (id) {
      console.log("Launch " + id + " app");
    }
  };

  return (
    <li className={`li-${index} ${last ? "li-bin" : ""}`} onClick={setActive}>
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
    <div className="dock">
      <div className="dock-container">
        {constants.dockEntries.map((entry, idx) => (
          <DockEntry
            id={entry.id}
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
  );
};

export default Dock;
