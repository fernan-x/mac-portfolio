import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./Window.scss";

const Window = ({
  name,
  width,
  height,
  open,
  footer,
  z,
  maxZ,
  setActive,
  children,
  id,
}) => {
  const centerPos = {
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 3 - height / 2,
  };

  const [isOpen, setOpen] = useState(open && open !== null);
  const [isFullscreen, setFullscreen] = useState(false);

  const closeWindow = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (maxZ !== z) {
      setActive(id);
    }
  };

  const handleDragStart = () => {
    handleClick();

    if (isFullscreen) {
      setFullscreen(false);
    }
  };

  const handleResize = () => {
    if (isFullscreen) {
      setFullscreen(false);
    }
  };

  const handleFullscreen = () => {
    setFullscreen(!isFullscreen);
  };

  return (
    <Rnd
      default={{
        x: centerPos.x,
        y: centerPos.y,
        width,
        height,
      }}
      dragHandleClassName="window__header"
      resizeHandleClasses="window"
      bounds="parent"
      className={`${isFullscreen ? "draggable-fullscreen" : ""}${
        !isOpen ? " draggable-closed" : ""
      }`}
      style={{ zIndex: z }}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onResize={handleResize}
    >
      <div className={`window${!isOpen ? " closed" : ""}`}>
        <div className="window__header">
          <div className="window__header-buttons">
            <button className="close" onClick={closeWindow}></button>
            <button></button>
            <button className="fullscreen" onClick={handleFullscreen}></button>
          </div>
          <div className="window__header-title">{name}</div>
        </div>
        <div className="window__content">{children}</div>
        <div className="window__footer">{footer}</div>
      </div>
    </Rnd>
  );
};

export default Window;
