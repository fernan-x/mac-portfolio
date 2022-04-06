import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import "./MenuBar.scss";

import images from "../../../constants/images";
import moment from "moment";
import MenuPanel from "../MenuPanel/MenuPanel";

const MenuBar = ({ openApplication }) => {
  const { t } = useTranslation(["desktop"]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [date, setDate] = useState(null);
  const dateFormat = "ddd D MMMM h:mm a";

  useEffect(() => {
    setDate(moment().format(dateFormat));

    const interval = setInterval(() => {
      setDate(moment().format(dateFormat));
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
        <span className="menus">{t("desktop:menubar-help")}</span>
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
