import React from "react";
import "./Dock.scss";
import constants from "../../constants/constants.jsx";
import { useTranslation } from "react-i18next";

// TODO : how to handle remove active
const DockEntry = ({ id, index, name, img, last, active, openApplication }) => {
  const {t} = useTranslation(['app']);
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
      if (icons[previous]) {
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
      }
      if (icons[previous1]) {
        icons[previous1].style.transform = "scale(1.1)";
      }
      if (icons[next]) {
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
      }
      if (icons[next2]) {
        icons[next2].style.transform = "scale(1.1)";
      }
    }
  };

  const reset = () => {
    let icons = document.querySelectorAll(".ico");
    icons.forEach((item) => {
      item.style.transform = "scale(1) translateY(0px)";
    });
  };

  const setActive = (e) => {
    // Launch app
    if (id) {
      openApplication(id);
    }
  };

  return (
    <li
      id={`li-${id}`}
      className={`li-${index} ${last ? "li-bin" : ""} ${
        active ? "active" : ""
      }`}
      onClick={setActive}
    >
      <div className="name">{t(`app:${name}`)}</div>
      <img
        src={img}
        alt={name}
        onMouseOver={(e) => resize(e, index - 1)}
        onMouseLeave={reset}
        className="ico"
      />
    </li>
  );
};

const Dock = ({ openApplication }) => {
  return (
    <div className="dock">
      <div className="dock-container">
        {constants.applications.map(
          (entry, idx) =>
            entry.docked && (
              <DockEntry
                id={entry.id}
                name={entry.name}
                img={entry.img}
                key={idx + 1}
                index={idx + 1}
                last={entry.last}
                active={entry.active}
                openApplication={openApplication}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Dock;
