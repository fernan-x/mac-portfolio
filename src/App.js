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
   * Search application index in function of its id
   *
   * @param {string} id       Id of the application
   * @returns                 Application index or -1 if not found
   */
  const searchOpenedApplicationIdxById = (id) => {
    let idx = -1;

    for (let i = 0; i < openedApp.length; i++) {
      if (openedApp[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  };

  /**
   * Open an application based on it's id
   *
   * @param {string} id       Id of the app to open
   */
  const openApplication = (id) => {
    let app = searchApplicationById(id);

    // TODO : handle already open application

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

  const closeApplication = (id) => {
    let appIdx = searchOpenedApplicationIdxById(id);

    if (appIdx >= 0) {
      let newOpenedApp = [...openedApp];
      newOpenedApp.splice(appIdx, 1);
      setOpenedApp(newOpenedApp);

      // Remove active point
      const dockEntry = document.querySelector("#li-" + id);
      if (dockEntry) {
        dockEntry.classList.remove("active");
      }
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
          closeApplication={closeApplication}
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
