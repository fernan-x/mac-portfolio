import { useState, useEffect, useRef } from "react";
import { formatHour, formatLongDate } from "./utils/date";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { StatusBar } from "./components/Smartphone";
import Footer from "./components/Smartphone/Footer/Footer";
import LockScreen from "./components/Smartphone/LockScreen/LockScreen";
import HomeScreen from "./components/Smartphone/HomeScreen/HomeScreen";
import AppScreen from "./components/Smartphone/AppScreen/AppScreen";
import type { LaunchOrigin } from "./components/Smartphone/AppScreen/AppScreen";

import "./SmartphoneApp.scss";

interface LaunchedApp {
  id: string;
  origin: LaunchOrigin;
}

const SmartphoneApp = () => {
  const [date, setDate] = useState("Monday, March 18");
  const [hour, setHour] = useState("6:34");
  const [locked, setLocked] = useState(true);
  const [launched, setLaunched] = useState<LaunchedApp | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const tick = () => {
      setDate(formatLongDate());
      setHour(formatHour());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Escape closes the open app and hands focus back to the icon that opened it
  const closeApp = () => {
    setLaunched(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!launched) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApp();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [launched]);

  /** Open an app, zooming out from the tapped icon (rect is viewport-relative) */
  const launchApp = (id: string, rect: DOMRect) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    const root = rootRef.current?.getBoundingClientRect();
    if (!root) return;
    setLaunched({
      id,
      origin: {
        top: rect.top - root.top,
        left: rect.left - root.left,
        right: root.right - rect.right,
        bottom: root.bottom - rect.bottom,
      },
    });
  };

  // The home indicator closes the app first, then goes home
  const handleSwipeUp = () => {
    if (locked) setLocked(false);
    else if (launched) closeApp();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="smartphone-app" ref={rootRef}>
        <HomeScreen
          active={!locked}
          appOpen={launched !== null}
          onLaunch={launchApp}
        />
        <AnimatePresence>
          {launched && (
            <AppScreen
              key={launched.id}
              id={launched.id}
              origin={launched.origin}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {locked && (
            <LockScreen
              key="lock"
              hour={hour}
              date={date}
              onUnlock={() => setLocked(false)}
            />
          )}
        </AnimatePresence>
        <StatusBar hour={hour} />
        <Footer
          onSwipeUp={handleSwipeUp}
          floating={locked}
          disabled={!locked && !launched}
        />
      </div>
    </MotionConfig>
  );
};

export default SmartphoneApp;
