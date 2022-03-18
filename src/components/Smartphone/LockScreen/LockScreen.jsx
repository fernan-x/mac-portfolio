import React from "react";
import { smartphoneImages } from "../../../constants/images";
import "./LockScreen.scss";

const LockScreen = ({ hour, date }) => {
  return (
    <div className="lockscreen">
      <div className="lockscreen__header">
        <img
          src={smartphoneImages.lock}
          className="lockscreen__header-lock"
          alt="lock"
        />
        <span className="lockscreen__header-hour">{hour}</span>
        <span className="lockscreen__header-date">{date}</span>
      </div>
      <div className="lockscreen__content"></div>
      <div className="lockscreen__footer">
        <div className="lockscreen__footer-flashlight">
          <span className="custom__button">
            <img
              src={smartphoneImages.flashlight}
              alt="flashlight"
              className="flashlight"
            />
          </span>
        </div>
        <div className="lockscreen__footer-swipe">
          <span>swipe up to open</span>
        </div>
        <div className="lockscreen__footer-camera">
          <span className="custom__button">
            <img
              src={smartphoneImages.camera}
              alt="camera"
              className="camera"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
