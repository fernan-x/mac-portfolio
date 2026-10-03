import React from "react";
import { useTranslation } from "react-i18next";
import { desktopImages } from "../../constants/images";
import { useConfigurationStore } from "../../store/configurationStore";
import Divider from "../../components/Desktop/Divider/Divider";
import BigSurSelect from "../../components/Desktop/BigSurSelect/BigSurSelect";

import colorful from "../../assets/images/light-colorful.jpeg";
import colorfulDark from "../../assets/images/dark-colorful.jpeg";
import landscape from "../../assets/images/light-landscape.jpeg";
import landscapeDark from "../../assets/images/dark-landscape.jpeg";

import i18n from "../../services/translation";
import "./Settings.scss";

const Settings = () => {
  const { t } = useTranslation(["app"]);
  const setTheme = useConfigurationStore((state) => state.setTheme);
  const setBackground = useConfigurationStore((state) => state.setBackground);
  const darkTheme = useConfigurationStore((state) => state.darkTheme);
  const colorfulBackground = useConfigurationStore(
    (state) => state.colorfulBackground
  );

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                onClick={() => {
                  setTheme("light");
                }}
                className={`entry-card_image${!darkTheme ? " active" : ""}`}
              />
              <span className="text__default">{t("app:settings-light")}</span>
            </div>

            <div className="entry-card">
              <img
                src={desktopImages.darkToggle}
                alt="toggle dark"
                onClick={() => {
                  setTheme("dark");
                }}
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
                onClick={() => {
                  setBackground("colorful");
                }}
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
                onClick={() => {
                  setBackground("landscape");
                }}
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
