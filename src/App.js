import { useEffect, useState } from "react";

import constants from "./constants/constants";
import SmartphoneApp from "./SmartphoneApp";
import DesktopApp from "./DesktopApp";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [openedApp, setOpenedApp] = useState(null);
  const isMobile = width <= 768;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
      {isMobile ? (
        <SmartphoneApp />
      ) : (
        <DesktopApp openApplication={openApplication} openedApp={openedApp} />
      )}
    </div>
  );
}

export default App;
