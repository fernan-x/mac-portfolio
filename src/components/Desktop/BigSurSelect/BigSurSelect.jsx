import React from "react";

import "./BigSurSelect.scss";

const AppleSelect = ({ children, ...props }) => {
  return (
    <div className="bs-select">
      <select {...props}>{children}</select>
    </div>
  );
};

export default AppleSelect;
