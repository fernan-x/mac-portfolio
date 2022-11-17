import About from "../applications/About/About";
import Construction from "../applications/Construction/Construction";
import Notion from "../applications/Notion/Notion";
import OnBoarding from "../applications/OnBoarding/OnBoarding";
import Pokedex from "../applications/Pokedex/Pokedex";
import Settings from "../applications/Settings/Settings";
import images from "./images";

const applications = [
  {
    id: "onboarding",
    name: "title-welcome",
    component: <OnBoarding />,
    img: images.finder,
    open: true,
    active: true,
    docked: false,
    enableFullscreen: true,
    enableResizing: false,
    height: 700,
    width: 700,
  },
  {
    id: "finder",
    name: "title-finder",
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
    name: "title-launchpad",
    component: <Construction />,
    img: images.launchpad,
    open: false,
    active: false,
    docked: true, // TODO : modify launchpad working
    enableFullscreen: false,
    enableResizing: false,
    height: 400,
    width: 600,
  },
  {
    id: "settings",
    name: "title-settings",
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
    name: "title-notes",
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
    name: "title-notion",
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
    name: "title-pokedex",
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
    name: "title-bin",
    component: <Construction />,
    img: "https://findicons.com/files/icons/569/longhorn_objects/128/trash.png", // TODO : put this icon to local
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
    name: "title-about",
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
