import React from "react";
import { useConfiguration } from "../../context/ConfigurationContext";
import { useTranslation } from "react-i18next";
import { desktopImages } from "../../constants/images";
import Divider from "../../components/Desktop/Divider/Divider";
import BigSurSelect from "../../components/Desktop/BigSurSelect/BigSurSelect";

import colorful from "../../assets/images/light-colorful.jpeg";
import colorfulDark from "../../assets/images/dark-colorful.jpeg";
import landscape from "../../assets/images/light-landscape.jpeg";
import landscapeDark from "../../assets/images/dark-landscape.jpeg";

import i18n from "../../services/translation";
import "./Settings.scss";

const Settings = () => {
  const { setTheme, darkTheme, colorfulBackground, setBackground } =
    useConfiguration();
  const { t } = useTranslation(["app"]);

  const handleLightThemeClick = () => {
    setTheme("light");
  };

  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  const handleColorfulBackgroundClick = () => {
    setBackground("colorful");
  };

  const handleLandscapeBackgroundClick = () => {
    setBackground("landscape");
  };

  const changeLanguage = (e) => {
    if (i18n.language !== e.target.value) {
      i18n.changeLanguage(e.target.value);
    }
  };

  return (
    <div className="setting">
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

        <div className="setting__section-row">
          <div className="setting__section-row_label text__default">
            {t("app:settings-wallpaper")} :
          </div>
          <div className="setting__section-row_value">
            <div className="entry-card">
              <img
                src={darkTheme ? colorfulDark : colorful}
                alt="toggle colorful"
                onClick={handleColorfulBackgroundClick}
                className={`entry-card_image${
                  colorfulBackground ? " active" : ""
                }`}
              />
              <span className="text__default">
                {t("app:settings-colorful")}
              </span>
            </div>

            <div className="entry-card">
              <img
                src={darkTheme ? landscapeDark : landscape}
                alt="toggle landscape"
                onClick={handleLandscapeBackgroundClick}
                className={`entry-card_image${
                  !colorfulBackground ? " active" : ""
                }`}
              />
              <span className="text__default">
                {t("app:settings-landscape")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="setting__section">
        <div className="setting__section-row spaced">
          <div className="setting__section-row_label text__default">
            {t("app:settings-language")} :
          </div>
          <div className="setting__section-row_value">
            <BigSurSelect
              onChange={changeLanguage}
              defaultValue={i18n.language}
            >
              <option value="fr">{t("app:about-french")}</option>
              <option value="en">{t("app:about-english")}</option>
            </BigSurSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
