import { Suspense, lazy, useEffect, useState } from "react";
import type { Application } from "./types/application";
import { useConfigurationStore } from "./store/configurationStore";
import { useOnboardingStore } from "./store/onboardingStore";

import constants from "./constants/constants";
import SmartphoneApp from "./SmartphoneApp";
import DesktopApp from "./DesktopApp";

// Loaded on demand: not part of the main chunk until the onboarding is shown
const Onboarding = lazy(() => import("./components/Onboarding/Onboarding"));

function App() {
  const defaultZ = 2;
  const onboardingOpen = useOnboardingStore((state) => state.isOpen);
  // Stay mounted once opened so the exit animation can play
  const [onboardingMounted, setOnboardingMounted] = useState(onboardingOpen);
  if (onboardingOpen && !onboardingMounted) setOnboardingMounted(true);

  const [width, setWidth] = useState(window.innerWidth);
  const [openedApp, setOpenedApp] = useState<Application[] | null>(null);
  const [zPosition, setZPosition] = useState<Record<string, number>>({});
  const [maxZ, setMaxZ] = useState(defaultZ);
  const darkTheme = useConfigurationStore((state) => state.darkTheme);

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
    const newApp: Application[] = [];
    const appZ: Record<string, number> = {};

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
  const searchApplicationById = (id: string) => {
    let app: Application | null = null;

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
  const searchOpenedApplicationIdxById = (id: string) => {
    let idx = -1;

    for (let i = 0; i < (openedApp?.length ?? 0); i++) {
      if (openedApp?.[i].id === id) {
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
  const openApplication = (id: string) => {
    const app = searchApplicationById(id);
    if (app) {
      const appIdx = searchOpenedApplicationIdxById(id); // Check if app only is not already open

      if (appIdx < 0) {
        // Open the application
        app.open = true;
        setOpenedApp((openedApp) => [...(openedApp ?? []), app]);

        // Update z positions
        const nextZ = maxZ + 1;
        const appZ: Record<string, number> = {};
        appZ[id] = nextZ;
        setMaxZ(nextZ);
        setZPosition((zPosition) => ({ ...appZ, ...zPosition }));

        // Add active class
        const dockEntry = document.querySelector("#li-" + id);
        if (dockEntry && !dockEntry.classList.contains("active")) {
          dockEntry.classList.add("active");
        }
      } else {
        // Set the application in foregroung
        setApplicationActive(id);
      }
    } else {
      console.log("App not defined");
    }
  };

  const closeApplication = (id: string) => {
    const appIdx = searchOpenedApplicationIdxById(id);

    if (appIdx >= 0) {
      const newOpenedApp = [...(openedApp ?? [])];
      newOpenedApp.splice(appIdx, 1);
      setOpenedApp(newOpenedApp);

      // Remove active point
      const dockEntry = document.querySelector("#li-" + id);
      if (dockEntry) {
        dockEntry.classList.remove("active");
      }
    }
  };

  const setApplicationActive = (id: string) => {
    const app = searchApplicationById(id);

    if (app) {
      // Update z positions
      const nextZ = maxZ + 1;
      const appZ: Record<string, number> = {};
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
      {onboardingMounted && (
        <Suspense fallback={null}>
          <Onboarding variant={isMobile ? "smartphone" : "desktop"} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
