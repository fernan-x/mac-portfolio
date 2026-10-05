import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { appImages } from "../../constants/images";

const DURATION = 6;
const apps = [
  { src: appImages.pokedex, x: -110 },
  { src: appImages.notion, x: 0 },
  { src: appImages.pokedex, x: 110 },
];

/**
 * Looping illustration for the "What you will find" step: app icons pop in one
 * after the other, each opening a small window. Static when reduced motion is
 * requested.
 */
const PortfolioDemo = () => {
  const { t } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="onboarding-demo"
      role="img"
      aria-label={t("portfolioDemoLabel")}
    >
      {apps.map((app, i) => {
        // Each app owns a third of the loop: pop in, hold, fade out together
        const start = i * 0.18;
        const times = [0, start, start + 0.1, 0.85, 1];
        return (
          <motion.div
            key={i}
            className="onboarding-demo__app"
            style={{ x: app.x }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.4, y: 20 }}
            animate={
              reducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : {
                    opacity: [0, 0, 1, 1, 0],
                    scale: [0.4, 0.4, 1, 1, 0.9],
                    y: [20, 20, 0, 0, 0],
                  }
            }
            transition={{
              duration: DURATION,
              repeat: Infinity,
              ease: "easeOut",
              times,
            }}
          >
            <div className="onboarding-demo__titlebar">
              <i /> <i /> <i />
            </div>
            <img src={app.src} alt="" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PortfolioDemo;
