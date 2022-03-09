import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Window.scss";

const Window = ({ width, height, open }) => {
  const centerPos = {
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 3 - height / 2,
  };

  const [isOpen, setOpen] = useState(open && open !== null);

  const closeWindow = () => {
    setOpen(false);
  };

  return (
    <Draggable defaultPosition={centerPos} handle=".window__header">
      <div
        className={`window ${!isOpen ? "closed" : ""}`}
        style={{ width: width, height: height }}
      >
        <div className="window__header">
          <div className="window__header-buttons">
            <button className="close" onClick={closeWindow}></button>
            <button></button>
            <button></button>
          </div>
          <div className="window__header-title"></div>
        </div>
        <div className="window__content"></div>
        <div className="window__footer"></div>
      </div>
    </Draggable>
  );
};

export default Window;
