import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import constants from "../../../constants/constants";
import "./AppScreen.scss";

export interface LaunchOrigin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface AppScreenProps {
  id: string;
  origin: LaunchOrigin;
}

const ICON_RADIUS = 14;

const inset = ({ top, right, bottom, left }: LaunchOrigin, radius: number) =>
  `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;

const AppScreen = ({ id, origin }: AppScreenProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const app = constants.applications.find((a) => a.id === id);

  // Move focus into the app so keyboard and screen reader users follow the change
  useEffect(() => {
    contentRef.current?.focus({ preventScroll: true });
  }, []);

  if (!app) return null;

  const closed = inset(origin, ICON_RADIUS);
  const open = inset({ top: 0, right: 0, bottom: 0, left: 0 }, 0);

  return (
    <motion.div
      className="app-screen"
      role="dialog"
      aria-modal="true"
      aria-label={app.name}
      initial={{ clipPath: closed, opacity: 0.4 }}
      animate={{ clipPath: open, opacity: 1 }}
      exit={{ clipPath: closed, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="app-screen__content" ref={contentRef} tabIndex={-1}><Suspense fallback={null}>{app.component}</Suspense></div>
    </motion.div>
  );
};

export default AppScreen;
