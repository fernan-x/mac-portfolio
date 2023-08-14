import React from "react";

import "./NotificationCard.scss";

const NotificationCard = ({ img, name, title, desc, date }) => {
  return (
    <div className="notification">
      <div className="notification__header">
        <div className="notification__header-left">
          <div className="notification__header-left_image">
            <img src={img} alt="notification" />
          </div>
          <span className="notification__header-left_title">{name}</span>
        </div>
        <div className="notification__header-right">{date}</div>
      </div>
      <div className="notification__content">
        <div className="notification__content-title">{title}</div>
        <div className="notification__content-desc">{desc}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
