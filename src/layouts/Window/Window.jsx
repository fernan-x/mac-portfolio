import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import "./Window.scss";

const Window = ({
  name,
  width,
  height,
  footer,
  enableFullscreen,
  enableResizing,
  z,
  maxZ,
  setActive,
  children,
  id,
  closeApplication,
}) => {
  const centerPos = {
    x: Math.round(window.innerWidth / 2 - width / 2),
    y:
      Math.round(window.innerHeight / 3 - height / 2) > 30
        ? Math.round(window.innerHeight / 3 - height / 2)
        : 30,
  };
  const [isFullscreen, setFullscreen] = useState(false);

  const ref = useRef(null);

  const closeWindow = () => {
    // Delay closing the window to allow the animation to finish
    let animationTimeout = setTimeout(() => {
      closeApplication();
      clearTimeout(animationTimeout);
    }, 500);

    // Add class to animate closing
    ref.current.className = "window draggable-closing";
  };

  const handleClick = () => {
    if (maxZ !== z) {
      setActive(id);
    }
  };

  const handleDrag = () => {
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
      enableResizing={enableResizing}
      default={{
        x: centerPos.x,
        y: centerPos.y,
        width,
        height,
      }}
      dragHandleClassName="window__header"
      resizeHandleClasses="window"
      bounds="parent"
      className={`${isFullscreen ? "draggable-fullscreen" : ""}`}
      style={{ zIndex: z }}
      onClick={handleClick}
      onDrag={handleDrag}
      onResize={handleResize}
    >
      <div className="window" ref={ref}>
        <div className="window__header">
          <div className="window__header-buttons">
            <button className="close" onClick={closeWindow}></button>
            <button></button>
            {enableFullscreen ? (
              <button
                className="fullscreen"
                onClick={handleFullscreen}
              ></button>
            ) : (
              <button></button>
            )}
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
