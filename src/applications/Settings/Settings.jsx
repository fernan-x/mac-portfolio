import React from "react";
import { useConfiguration } from "../../context/ConfigurationContext";

import { desktopImages } from "../../constants/images";

import "./Settings.scss";
import { useTranslation } from "react-i18next";
import Divider from "../../components/Desktop/Divider/Divider";

const Settings = () => {
  const { setTheme, darkTheme } = useConfiguration();
  const { t } = useTranslation(["app"]);

  const handleLightThemeClick = () => {
    setTheme("light");
  };

  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  return (
    <div className="setting">
      {/* <button onClick={() => toggleTheme()}>Togle theme</button>
      <button onClick={() => toggleBackground()}>Togle backgroung</button> */}
      <div className="setting__section">
        <div className="setting__section-row">
          <div className="setting__section-row_label text__default">
            {t("app:settings-theme-mode")} :
          </div>
          <div className="setting__section-row_value">
            <div className="entry-card">
              <img
                src={desktopImages.lightToggle}
                alt="toggle light"
                onClick={handleLightThemeClick}
                className={`entry-card_image${!darkTheme ? " active" : ""}`}
              />
              <span className="text__default">{t("app:settings-light")}</span>
            </div>

            <div className="entry-card">
              <img
                src={desktopImages.darkToggle}
                alt="toggle dark"
                onClick={handleDarkThemeClick}
                className={`entry-card_image${darkTheme ? " active" : ""}`}
              />
              <span className="text__default">{t("app:settings-dark")}</span>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Settings;
