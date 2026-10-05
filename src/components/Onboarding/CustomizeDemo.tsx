import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { useTranslation } from "react-i18next";

const loop = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut" as const,
  times: [0, 0.3, 0.45, 0.85, 1],
};

/**
 * Looping illustration for the "Make it yours" step: a Settings window opens,
 * the theme toggle flips, the desktop goes dark and the language switches from EN to FR.
 * Static when reduced motion is requested.
 */
const CustomizeDemo = () => {
  const { t } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();
  const still = (value: TargetAndTransition) =>
    reducedMotion ? undefined : value;

  return (
    <div
      className="onboarding-demo onboarding-demo--customize"
      role="img"
      aria-label={t("customizeDemoLabel")}
    >
      <motion.div
        className="onboarding-demo__night"
        animate={still({ opacity: [0, 0, 1, 1, 0] })}
        transition={loop}
      />
      <motion.div
        className="onboarding-demo__settings"
        animate={still({
          opacity: [0, 1, 1, 1, 0],
          scale: [0.8, 1, 1, 1, 0.92],
        })}
        transition={{ ...loop, times: [0, 0.12, 0.5, 0.9, 1] }}
      >
        <div className="onboarding-demo__titlebar">
          <i /> <i /> <i />
        </div>
        <div className="onboarding-demo__row">
          <b />
          <motion.span
            className="onboarding-demo__toggle"
            animate={still({
              backgroundColor: ["#8e8e93", "#8e8e93", "#34c759", "#34c759", "#8e8e93"],
            })}
            transition={loop}
          >
            <motion.i
              animate={still({ x: [0, 0, 14, 14, 0] })}
              transition={loop}
            />
          </motion.span>
        </div>
        <div className="onboarding-demo__swatches">
          <span>EN</span>
          <motion.span
            animate={still({ boxShadow: [
              "0 0 0 0 #007aff",
              "0 0 0 0 #007aff",
              "0 0 0 0 #007aff",
              "0 0 0 2px #007aff",
              "0 0 0 0 #007aff",
            ] })}
            transition={{ ...loop, times: [0, 0.5, 0.6, 0.85, 1] }}
          >
            FR
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomizeDemo;
