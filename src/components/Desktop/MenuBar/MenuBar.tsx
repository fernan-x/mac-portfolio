import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import ClickAwayListener from "react-click-away-listener";
import { useOnboardingStore } from "../../../store/onboardingStore";

import "./MenuBar.scss";

import images from "../../../constants/images";
import { formatMenuBarDate } from "../../../utils/date";
import MenuPanel from "../MenuPanel/MenuPanel";

interface MenuBarProps {
  openApplication: (id: string) => void;
}

const MenuBar = ({ openApplication }: MenuBarProps) => {
  const { t } = useTranslation(["desktop"]);
  const { t: tOnboarding } = useTranslation(["onboarding"]);
  const openOnboarding = useOnboardingStore((state) => state.open);
  const [panelOpen, setPanelOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(formatMenuBarDate());

    const interval = setInterval(() => {
      setDate(formatMenuBarDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenPanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="menu-bar">
      <div className="left">
        <div
          className={`menu-ico apple${panelOpen ? " active" : ""}`}
          onClick={handleOpenPanel}
        >
          <img src={images.apple} alt="Apple" />
        </div>
        <span className="menus active">{t("desktop:menubar-finder")}</span>
        <span className="menus">{t("desktop:menubar-file")}</span>
        <span className="menus">{t("desktop:menubar-edit")}</span>
        <span className="menus">{t("desktop:menubar-view")}</span>
        <span className="menus">{t("desktop:menubar-go")}</span>
        <span className="menus">{t("desktop:menubar-window")}</span>
        <ClickAwayListener onClickAway={() => setHelpOpen(false)}>
          <span className="menus-help">
            <button
              type="button"
              className={`menus menus-button${helpOpen ? " open" : ""}`}
              aria-haspopup="menu"
              aria-expanded={helpOpen}
              onClick={() => setHelpOpen(!helpOpen)}
            >
              {t("desktop:menubar-help")}
            </button>
            {helpOpen && (
              <div className="menu-panel menu-panel--help" role="menu">
                <ul className="menu-panel__entries">
                  <li role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className="menu-panel__entries-label menu-panel__entries-button"
                      onClick={() => {
                        setHelpOpen(false);
                        openOnboarding();
                      }}
                    >
                      {tOnboarding("menuEntry")}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </ClickAwayListener>
      </div>
      <MenuPanel
        isOpen={panelOpen}
        closePanel={() => setPanelOpen(false)}
        openApplication={openApplication}
      />

      <div className="right">
        <div className="menu-ico battery">
          <img src={images.battery} alt="Battery" />
        </div>
        <div className="menu-ico">
          <img src={images.controlcenter} alt="Control center" />
        </div>
        <div className="menu-ico">
          <img src={images.search} alt="Search" />
        </div>
        <div className="menu-ico">
          <img src={images.wifi} alt="Wifi" />
        </div>

        <div className="menu-time">{date}</div>
      </div>
    </div>
  );
};

export default MenuBar;
