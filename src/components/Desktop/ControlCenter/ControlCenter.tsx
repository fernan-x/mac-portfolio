import React, { useState } from "react";
import { FiGlobe, FiMoon, FiPlay, FiSun } from "react-icons/fi";
import ClickAwayListener from "react-click-away-listener";
import { useTranslation } from "react-i18next";

import images from "../../../constants/images";
import { useOnboardingStore } from "../../../store/onboardingStore";
import {
  MIN_BRIGHTNESS,
  useConfigurationStore,
} from "../../../store/configurationStore";

import "./ControlCenter.scss";

const ControlCenter = () => {
  const { t, i18n } = useTranslation(["desktop"]);
  const { t: tOnboarding } = useTranslation(["onboarding"]);
  const openOnboarding = useOnboardingStore((state) => state.open);
  const [open, setOpen] = useState(false);
  const darkTheme = useConfigurationStore((state) => state.darkTheme);
  const toggleTheme = useConfigurationStore((state) => state.toggleTheme);
  const brightness = useConfigurationStore((state) => state.brightness);
  const setBrightness = useConfigurationStore((state) => state.setBrightness);

  const sliderFill = ((brightness - MIN_BRIGHTNESS) / (1 - MIN_BRIGHTNESS)) * 100;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="control-center">
        <button
          type="button"
          className={`menu-ico control-center__trigger${open ? " active" : ""}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={t("desktop:controlcenter-title")}
          onClick={() => setOpen(!open)}
        >
          <img src={images.controlcenter} alt="" />
        </button>
        {open && (
          <div
            className="control-center__panel"
            role="dialog"
            aria-label={t("desktop:controlcenter-title")}
          >
            <button
              type="button"
              role="switch"
              aria-checked={darkTheme}
              className={`control-center__tile${darkTheme ? " on" : ""}`}
              onClick={toggleTheme}
            >
              <span className="control-center__icon">
                {darkTheme ? <FiMoon /> : <FiSun />}
              </span>
              <span className="control-center__text">
                <span className="control-center__title">
                  {t("desktop:controlcenter-dark")}
                </span>
                <span className="control-center__subtitle">
                  {darkTheme
                    ? t("desktop:controlcenter-on")
                    : t("desktop:controlcenter-off")}
                </span>
              </span>
            </button>

            <label className="control-center__tile control-center__tile--select">
              <span className="control-center__icon">
                <FiGlobe />
              </span>
              <span className="control-center__text">
                <span className="control-center__title">
                  {t("desktop:controlcenter-language")}
                </span>
                <span className="control-center__subtitle">
                  {t(
                    i18n.resolvedLanguage === "fr"
                      ? "desktop:controlcenter-french"
                      : "desktop:controlcenter-english"
                  )}
                </span>
              </span>
              <select
                className="control-center__select"
                aria-label={t("desktop:controlcenter-language")}
                value={i18n.resolvedLanguage}
                onChange={changeLanguage}
              >
                <option value="en">{t("desktop:controlcenter-english")}</option>
                <option value="fr">{t("desktop:controlcenter-french")}</option>
              </select>
            </label>

            <div className="control-center__tile control-center__tile--slider">
              <label
                className="control-center__title"
                htmlFor="control-center-brightness"
              >
                {t("desktop:controlcenter-display")}
              </label>
              <div className="control-center__slider-row">
                <FiSun size={13} />
                <input
                  id="control-center-brightness"
                  className="control-center__slider"
                  type="range"
                  min={MIN_BRIGHTNESS}
                  max={1}
                  step={0.01}
                  value={brightness}
                  style={{ "--fill": `${sliderFill}%` } as React.CSSProperties}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
                <FiSun size={18} />
              </div>
            </div>

            <button
              type="button"
              className="control-center__tile control-center__tile--wide"
              onClick={() => {
                setOpen(false);
                openOnboarding();
              }}
            >
              <span className="control-center__icon">
                <FiPlay />
              </span>
              <span className="control-center__text">
                <span className="control-center__title">
                  {tOnboarding("onboarding:menuEntry")}
                </span>
                <span className="control-center__subtitle">
                  {tOnboarding("onboarding:settingsButton")}
                </span>
              </span>
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ControlCenter;
