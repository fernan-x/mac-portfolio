import { lazy } from "react";
import type { Application } from "../types/application";
import images from "./images";

// Apps are code-split: each chunk (and its assets) loads when the app first opens
const About = lazy(() => import("../applications/About/About"));
const Construction = lazy(() => import("../applications/Construction/Construction"));
const Notion = lazy(() => import("../applications/Notion/Notion"));
const Pokedex = lazy(() => import("../applications/Pokedex/Pokedex"));
const Settings = lazy(() => import("../applications/Settings/Settings"));

const applications: Application[] = [
  {
    id: "finder",
    name: "Finder",
    component: <Construction />,
    img: images.finder,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 400,
    width: 600,
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    component: <Construction />,
    img: images.launchpad,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: false,
    enableResizing: false,
    height: 400,
    width: 600,
  },
  {
    id: "settings",
    name: "Settings",
    component: <Settings />,
    img: images.settings,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 500,
    width: 500,
  },
  {
    id: "notes",
    name: "Notes",
    component: <Construction />,
    img: images.notes,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 500,
    width: 800,
  },
  {
    id: "notion",
    name: "Notion",
    component: <Notion />,
    img: images.notion,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 600,
    width: 800,
  },
  {
    id: "pokedex",
    name: "Pokedex",
    component: <Pokedex />,
    img: images.pokedex,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 600,
    width: 400,
  },
  {
    id: "bin",
    name: "Bin",
    component: <Construction />,
    img: images.trash,
    open: false,
    active: false,
    docked: true,
    enableFullscreen: true,
    enableResizing: true,
    height: 400,
    width: 600,
    last: true,
  },
  {
    id: "about",
    name: "About",
    component: <About />,
    img: "",
    open: false,
    active: false,
    docked: false,
    enableFullscreen: false,
    enableResizing: false,
    height: 350,
    width: 600,
  },
];

const exportedConstants = {
  applications,
};

export default exportedConstants;
