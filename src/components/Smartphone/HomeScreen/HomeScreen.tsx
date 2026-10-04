import { useState } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import constants from "../../../constants/constants";
import "./HomeScreen.scss";

const DOCK_IDS = ["notion", "pokedex", "settings"];
const HIDDEN_IDS = ["launchpad", "about"];

interface HomeScreenProps {
  /** Phone is unlocked */
  active: boolean;
  /** An app is on top of the home screen */
  appOpen: boolean;
  onLaunch: (id: string, rect: DOMRect) => void;
}

const pageVariants: Variants = {
  locked: { opacity: 0, scale: 0.92 },
  home: { opacity: 1, scale: 1 },
  // iOS zooms the home screen towards the viewer while an app opens
  covered: { opacity: 0, scale: 1.12 },
};

const gridVariants: Variants = {
  locked: {},
  home: { transition: { staggerChildren: 0.035, delayChildren: 0.12 } },
  covered: {},
};

const iconVariants: Variants = {
  locked: { opacity: 0, y: 18, scale: 0.8 },
  home: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 26 },
  },
  covered: { opacity: 1, y: 0, scale: 1 },
};

const HomeScreen = ({ active, appOpen, onLaunch }: HomeScreenProps) => {
  const { t } = useTranslation(["smartphone"]);

  const apps = constants.applications.filter(
    (app) => app.img && !HIDDEN_IDS.includes(app.id)
  );
  const dockApps = DOCK_IDS.map((id) => apps.find((a) => a.id === id)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  // While searching, every app is a candidate, dock apps included
  const gridApps = needle
    ? apps.filter((a) => a.name.toLowerCase().includes(needle))
    : apps.filter((a) => !DOCK_IDS.includes(a.id));

  const state = !active ? "locked" : appOpen ? "covered" : "home";

  const renderIcon = (id: string, name: string, img: string, label = true) => (
    <motion.li key={id} className="home__cell" variants={iconVariants}>
      <button
        type="button"
        className="home__app"
        aria-label={name}
        tabIndex={state === "home" ? 0 : -1}
        onClick={(e) => {
          const icon = e.currentTarget.querySelector("img");
          onLaunch(id, (icon ?? e.currentTarget).getBoundingClientRect());
        }}
      >
        <motion.img
          src={img}
          alt=""
          draggable={false}
          whileTap={{ scale: 0.88 }}
        />
        {label && <span>{name}</span>}
      </button>
    </motion.li>
  );

  return (
    <motion.div
      className="home"
      variants={pageVariants}
      initial="locked"
      animate={state}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      style={{ pointerEvents: state === "home" ? "auto" : "none" }}
      aria-hidden={state !== "home"}
    >
      <motion.ul className="home__grid" variants={gridVariants}>
        {gridApps.map((app) => renderIcon(app.id, app.name, app.img))}
      </motion.ul>

      <div className="home__bottom">
        <input
          className="home__search"
          type="search"
          placeholder={t("smartphone:home-search")}
          aria-label={t("smartphone:home-search")}
          tabIndex={state === "home" ? 0 : -1}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <motion.ul className="home__dock" variants={gridVariants}>
          {dockApps.map((app) => renderIcon(app.id, app.name, app.img, false))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default HomeScreen;
