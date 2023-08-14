import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Dock from "./components/Dock/Dock";
import MenuBar from "./components/Desktop/MenuBar/MenuBar";
import Window from "./layouts/Window/Window";

const DesktopApp = ({
  openApplication,
  closeApplication,
  openedApp,
  zPosition,
  maxZ,
  setApplicationActive,
}) => {
  const { t } = useTranslation(["desktop"]);
  const colorfulBackground = useSelector(
    (state) => state.configuration.colorfulBackground
  );

  return (
    <div
      className={`desktop-app ${
        colorfulBackground ? "bg-colorful" : "bg-landscape"
      }`}
    >
      <div className="warning-msg">
        <div className="warning-msg__content">
          {t("desktop:warning-smartphoneMsg")}
        </div>
      </div>
      <MenuBar openApplication={openApplication} />
      <div style={{ width: "100%", height: "calc(100% - 30px)" }}>
        {openedApp &&
          openedApp.map((item) => (
            <Window
              name={item.name}
              width={item.width}
              height={item.height}
              key={item.id}
              id={item.id}
              enableFullscreen={item.enableFullscreen}
              enableResizing={item.enableResizing}
              z={zPosition[item.id]}
              maxZ={maxZ}
              setActive={setApplicationActive}
              closeApplication={() => closeApplication(item.id)}
            >
              {item.component}
            </Window>
          ))}
      </div>
      <Dock openApplication={openApplication} />
    </div>
  );
};

export default DesktopApp;
