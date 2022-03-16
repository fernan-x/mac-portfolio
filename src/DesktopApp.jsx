import React from "react";

import Dock from "./components/Dock/Dock";
import MenuBar from "./components/MenuBar/MenuBar";
import Window from "./layouts/Window/Window";

const DesktopApp = ({ openApplication, openedApp }) => {
  return (
    <div className="desktop-app">
      <MenuBar />
      <div style={{ width: "100%", flexGrow: "1" }}>
        {openedApp &&
          openedApp.map((item) => (
            <Window
              name={item.name}
              width={item.width}
              height={item.height}
              open
              key={item.id}
            ></Window>
          ))}
      </div>
      <Dock openApplication={openApplication} />
    </div>
  );
};

export default DesktopApp;
