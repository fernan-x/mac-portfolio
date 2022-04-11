import About from "../applications/About/About";
import Construction from "../applications/Construction/Construction";
import Notion from "../applications/Notion/Notion";
import Settings from "../applications/Settings/Settings";
import images from "./images";

const applications = [
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
    docked: true, // TODO : modify launchpad working
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
    height: 500,
    width: 800,
  },
  {
    id: "bin",
    name: "Bin",
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
