import { useEffect, useState } from "react";
import Dock from "./components/Dock/Dock";
import MenuBar from "./components/MenuBar/MenuBar";
import Window from "./layouts/Window/Window";

import constants from "./constants/constants";

function App() {
  const [openedApp, setOpenedApp] = useState(null);

  useEffect(() => {
    let newApp = [];

    constants.applications.forEach((item) => {
      if (item.open) {
        newApp.push(item);
      }
    });

    setOpenedApp(newApp);
  }, []);

  /**
   * Search an application by id
   *
   * @param {string} id       Id of the application
   * @returns                 Application object or null if not found
   */
  const searchApplicationById = (id) => {
    let app = null;

    for (let i = 0; i < constants.applications.length; i++) {
      if (constants.applications[i].id === id) {
        app = constants.applications[i];
        break;
      }
    }

    return app;
  };

  /**
   * Open an application based on it's id
   *
   * @param {string} id       Id of the app to open
   */
  const openApplication = (id) => {
    let app = searchApplicationById(id);

    if (app) {
      app.open = true;
      setOpenedApp((openedApp) => [...openedApp, app]);
    } else {
      console.log("App not defined");
    }
  };

  return (
    <div className="App">
      <MenuBar />
      {openedApp &&
        openedApp.map((item) => (
          <Window width={item.width} height={item.height} open key={item.id} />
        ))}
      <Dock openApplication={openApplication} />
    </div>
  );
}

export default App;
