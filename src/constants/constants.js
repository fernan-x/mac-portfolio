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
    img: images.finder,
    open: false,
    active: false,
    docked: true,
    height: 400,
    width: 600,
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    img: images.launchpad,
    open: false,
    active: false,
    docked: true, // TODO : modify launchpad working
    height: 400,
    width: 600,
  },
  {
    id: "settings",
    name: "Settings",
    img: images.settings,
    open: false,
    active: false,
    docked: true,
    height: 500,
    width: 500,
  },
  {
    id: "notes",
    name: "Notes",
    img: images.notes,
    open: true,
    active: true,
    docked: true,
    height: 500, // TODO : How to manage full screen
    width: 800,
  },
  {
    id: "bin",
    name: "Bin",
    img: "https://findicons.com/files/icons/569/longhorn_objects/128/trash.png", // TODO : put this icon to local
    open: false,
    active: false,
    docked: true,
    height: 400,
    width: 600,
    last: true,
  },
];

const exportedConstants = {
  dockEntries,
  applications,
};

export default exportedConstants;
