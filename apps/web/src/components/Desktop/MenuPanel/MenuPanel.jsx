import React from "react";
import ClickAwayListener from "react-click-away-listener";
import { useTranslation } from "react-i18next";

import "./MenuPanel.scss";

const MenuPanel = ({ isOpen, closePanel, openApplication }) => {
  const { t } = useTranslation(["desktop"]);
  return (
    isOpen && (
      <div className="menu-panel">
        <ClickAwayListener onClickAway={closePanel}>
          <div style={{ width: "100%" }}>
            <ul className="menu-panel__entries">
              <li
                className="menu-panel__entries-label"
                onClick={() => {
                  closePanel();
                  openApplication("about");
                }}
              >
                {t("desktop:menu-about")}
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li
                className="menu-panel__entries-label"
                onClick={() => {
                  closePanel();
                  openApplication("settings");
                }}
              >
                {t("desktop:menu-settings")}
              </li>
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-appstore")}
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-recent")}
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-quit")}
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-sleep")}
              </li>
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-restart")}
              </li>
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-shutdown")}
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-lock")}
              </li>
              <li className="menu-panel__entries-label disabled">
                {t("desktop:menu-logout")}
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      </div>
    )
  );
};

export default MenuPanel;
