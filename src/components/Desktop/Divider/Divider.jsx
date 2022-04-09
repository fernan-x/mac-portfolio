import React from "react";

import "./Divider.scss";

const Divider = ({ variant }) => {
  const size = variant ? variant : 90;

  return (
    <div className="divider">
      <span className="divider__line" style={{ width: `${size}%` }}></span>
    </div>
  );
};

export default Divider;
