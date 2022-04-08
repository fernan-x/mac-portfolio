import appstore from "../assets/images/appstore.png";
import contacts from "../assets/images/contacts.png";
import facetime from "../assets/images/facetime.png";
import finder from "../assets/images/finder.png";
import launchpad from "../assets/images/launchpad.png";
import messages from "../assets/images/messages.png";
import music from "../assets/images/music.png";
import notes from "../assets/images/notes.png";
import photos from "../assets/images/photos.png";
import podcasts from "../assets/images/podcasts.png";
import reminders from "../assets/images/reminders.png";
import safari from "../assets/images/safari.png";
import siri from "../assets/images/siri.png";
import trash from "../assets/images/trash.png";
import tv from "../assets/images/tv.png";
import settings from "../assets/images/settings.png";
import apple from "../assets/images/apple.png";
import wifi from "../assets/images/wifi.png";
import search from "../assets/images/search.png";
import controlcenter from "../assets/images/control-center.png";
import battery from "../assets/images/battery.png";
import lightToggle from "../assets/images/desktop/toggle-theme-light.png";
import darkToggle from "../assets/images/desktop/toggle-theme-dark.png";

import discord from "../assets/images/applications/discord.png";

import sWallpaper from "../assets/images/smartphone/wallpaper.png";
import sLock from "../assets/images/smartphone/lock.png";
import sBattery from "../assets/images/smartphone/battery.png";
import sCamera from "../assets/images/smartphone/camera.png";
import sFlashlight from "../assets/images/smartphone/flashlight.png";
import sWifi from "../assets/images/smartphone/wifi.png";
import sSignal from "../assets/images/smartphone/signal.png";

export const smartphoneImages = {
  wallpaper: sWallpaper,
  lock: sLock,
  battery: sBattery,
  camera: sCamera,
  flashlight: sFlashlight,
  wifi: sWifi,
  signal: sSignal,
};

export const appImages = {
  discord,
};

export const desktopImages = {
  settings,
  appstore,
  contacts,
  facetime,
  finder,
  launchpad,
  messages,
  music,
  notes,
  photos,
  podcasts,
  reminders,
  safari,
  siri,
  trash,
  tv,
  apple,
  wifi,
  search,
  controlcenter,
  battery,
  lightToggle,
  darkToggle,
};

const exportedImages = { ...smartphoneImages, ...desktopImages, ...appImages };

export default exportedImages;
