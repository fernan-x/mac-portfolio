import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useConfigurationStore } from "./store/configurationStore";

import Dock from "./components/Dock/Dock";
import Launchpad from "./components/Launchpad/Launchpad";
import { useLaunchpadStore } from "./store/launchpadStore";
import MenuBar from "./components/Desktop/MenuBar/MenuBar";
import Window from "./layouts/Window/Window";
import type { Application } from "./types/application";

interface DesktopAppProps {
  openApplication: (id: string) => void;
  closeApplication: (id: string) => void;
  openedApp: Application[] | null;
  zPosition: Record<string, number>;
  maxZ: number;
  setApplicationActive: (id: string) => void;
}

const DesktopApp = ({
  openApplication,
  closeApplication,
  openedApp,
  zPosition,
  maxZ,
  setApplicationActive,
}: DesktopAppProps) => {
  const { t } = useTranslation(["desktop"]);
  const colorfulBackground = useConfigurationStore(
    (state) => state.colorfulBackground
  );

  const brightness = useConfigurationStore((state) => state.brightness);

  const toggleLaunchpad = useLaunchpadStore((state) => state.toggle);
  const closeLaunchpad = useLaunchpadStore((state) => state.close);

  useHotkey("Mod+K", toggleLaunchpad);

  const openFromDock = (id: string) => {
    if (id === "launchpad") {
      toggleLaunchpad();
      return;
    }
    closeLaunchpad();
    openApplication(id);
  };

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
              <Suspense fallback={null}>{item.component}</Suspense>
            </Window>
          ))}
      </div>
      <Launchpad openApplication={openApplication} />
      <Dock openApplication={openFromDock} />
      <div
        className="brightness-overlay"
        style={{ opacity: 1 - brightness }}
        aria-hidden="true"
      />
    </div>
  );
};

export default DesktopApp;
