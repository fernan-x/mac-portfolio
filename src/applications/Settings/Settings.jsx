import React from "react";
import { useConfiguration } from "../../context/ConfigurationContext";

import "./Settings.scss";

const Settings = () => {
  const { toggleBackground, toggleTheme } = useConfiguration();
  return (
    <div className="setting">
      <button onClick={() => toggleTheme()}>Togle theme</button>
      <button onClick={() => toggleBackground()}>Togle backgroung</button>
    </div>
  );
};

export default Settings;
