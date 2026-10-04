import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useTranslation } from "react-i18next";

import "./Footer.scss";

interface FooterProps {
  onSwipeUp: () => void;
  /** Gentle bobbing hint, used on the lock screen */
  floating?: boolean;
  /** Nothing to swipe away from (home screen) */
  disabled?: boolean;
}

const SWIPE_DISTANCE = 40;
const SWIPE_VELOCITY = 500;

const Footer = ({ onSwipeUp, floating = false, disabled = false }: FooterProps) => {
  const { t } = useTranslation(["smartphone"]);

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.y < -SWIPE_DISTANCE || info.velocity.y < -SWIPE_VELOCITY) {
      onSwipeUp();
    }
  };

  return (
    <motion.div
      className={`footer${disabled ? " footer--disabled" : ""}`}
      onPanEnd={handlePanEnd}
      onTap={onSwipeUp}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={t("smartphone:home-indicator")}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSwipeUp();
        }
      }}
    >
      <div
        className={`footer__slider${floating ? " footer__slider--float" : ""}`}
      />
    </motion.div>
  );
};

export default Footer;
