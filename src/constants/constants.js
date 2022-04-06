import About from "../applications/About/About";
import Construction from "../applications/Construction/Construction";
import images from "./images";

const dockEntries = [
  {
    id: "finder",
    name: "Finder",
    img: images.finder,
    classes: "ico",
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    img: images.launchpad,
    classes: "ico",
  },
  {
    id: "settings",
    name: "Settings",
    img: images.settings,
    classes: "ico",
  },
  {
    name: "Siri",
    img: images.siri,
    classes: "ico",
  },
  {
    name: "Contacts",
    img: images.contacts,
    classes: "ico",
  },
  {
    name: "Notes",
    img: images.notes,
    classes: "ico",
  },
  {
    name: "Reminders",
    img: images.reminders,
    classes: "ico",
  },
  {
    name: "Photos",
    img: images.photos,
    classes: "ico",
  },
  {
    name: "Messages",
    img: images.messages,
    classes: "ico",
  },
  {
    name: "FaceTime",
    img: images.facetime,
    classes: "ico",
  },
  {
    name: "Music",
    img: images.music,
    classes: "ico",
  },
  {
    name: "Podcasts",
    img: images.podcasts,
    classes: "ico",
  },
  {
    name: "TV",
    img: images.tv,
    classes: "ico",
  },
  {
    name: "App Store",
    img: images.appstore,
    classes: "ico",
  },
  {
    name: "Safari",
    img: images.safari,
    classes: "ico",
  },
  {
    name: "Bin",
    img: "https://findicons.com/files/icons/569/longhorn_objects/128/trash.png",
    classes: "ico ico-bin",
    last: true,
  },
];

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
    component: <Construction />,
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
    height: 500, // TODO : How to manage full screen
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
  dockEntries,
  applications,
};

export default exportedConstants;
