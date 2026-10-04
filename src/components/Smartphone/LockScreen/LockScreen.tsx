import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { smartphoneImages, appImages } from "../../../constants/images";
import NotificationCard from "../NotificationCard/NotificationCard";
import { useOnboardingStore } from "../../../store/onboardingStore";
import "./LockScreen.scss";
import { useTranslation } from "react-i18next";

interface LockScreenProps {
  hour: string;
  date: string;
  onUnlock: () => void;
}

const UNLOCK_DISTANCE = 120;
const UNLOCK_VELOCITY = 600;

const LockScreen = ({ hour, date, onUnlock }: LockScreenProps) => {
  const { t } = useTranslation(["smartphone"]);
  const { t: tOnboarding } = useTranslation(["onboarding"]);
  const openOnboarding = useOnboardingStore((state) => state.open);

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.y < -UNLOCK_DISTANCE || info.velocity.y < -UNLOCK_VELOCITY) {
      onUnlock();
    }
  };

  return (
    <motion.div
      className="lockscreen"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      onDragEnd={handleDragEnd}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div className="lockscreen__header">
        <img
          src={smartphoneImages.lock}
          className="lockscreen__header-lock"
          alt="lock"
        />
        <span className="lockscreen__header-hour">{hour}</span>
        <span className="lockscreen__header-date">{date}</span>
      </div>
      <div className="lockscreen__content">
        <div className="lockscreen__content-notifications">
          <NotificationCard
            img={appImages.discord}
            name="Discord"
            title={t("smartphone:notification-discord-title")}
            desc={t("smartphone:notification-discord-message")}
            date="now"
          />
          <button
            type="button"
            className="lockscreen__content-tour"
            onClick={openOnboarding}
          >
            {tOnboarding("onboarding:menuEntry")}
          </button>
        </div>
      </div>
      <div className="lockscreen__footer">
        <div className="lockscreen__footer-flashlight">
          <span className="custom__button">
            <img
              src={smartphoneImages.flashlight}
              alt="flashlight"
              className="flashlight"
            />
          </span>
        </div>
        <div className="lockscreen__footer-swipe">
          <button type="button" onClick={onUnlock}>
            {t("smartphone:swipe-to-open")}
          </button>
        </div>
        <div className="lockscreen__footer-camera">
          <span className="custom__button">
            <img
              src={smartphoneImages.camera}
              alt="camera"
              className="camera"
            />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LockScreen;
