import { useEffect, useState } from "react";

import constants from "./constants/constants";
import SmartphoneApp from "./SmartphoneApp";
import DesktopApp from "./DesktopApp";
import { useConfiguration } from "./context/ConfigurationContext";

function App() {
  const defaultZ = 2;

  const [width, setWidth] = useState(window.innerWidth);
  const [openedApp, setOpenedApp] = useState(null);
  const [zPosition, setZPosition] = useState({});
  const [maxZ, setMaxZ] = useState(defaultZ);
  const { darkTheme } = useConfiguration();

  const isMobile = width <= 768;

  useState(() => {}, []);

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
    let appZ = {};

    constants.applications.forEach((item) => {
      if (item.open) {
        newApp.push(item);
        appZ[item.id] = defaultZ;
      }
    });

    setOpenedApp(newApp);
    setZPosition(appZ);
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
      // Open the application
      app.open = true;
      setOpenedApp((openedApp) => [...openedApp, app]);

      // Update z positions
      const nextZ = maxZ + 1;
      let appZ = {};
      appZ[id] = nextZ;
      setMaxZ(nextZ);
      setZPosition((zPosition) => ({ ...appZ, ...zPosition }));
    } else {
      console.log("App not defined");
    }
  };

  const setApplicationActive = (id) => {
    let app = searchApplicationById(id);

    if (app) {
      // Update z positions
      const nextZ = maxZ + 1;
      let appZ = {};
      appZ[id] = nextZ;
      setMaxZ(nextZ);
      setZPosition((zPosition) => ({ ...zPosition, ...appZ }));
    }
  };

  return (
    <div className={`App${darkTheme ? " dark" : ""}`}>
      {isMobile ? (
        <SmartphoneApp />
      ) : (
        <DesktopApp
          openApplication={openApplication}
          openedApp={openedApp}
          zPosition={zPosition}
          maxZ={maxZ}
          setApplicationActive={setApplicationActive}
        />
      )}
    </div>
  );
}

export default App;
