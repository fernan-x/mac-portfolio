import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { desktopImages } from "../../constants/images";

const loop = { duration: 4, repeat: Infinity, ease: "easeInOut" } as const;

/**
 * Tiny looping illustration for the "How to use it" step: a window is dragged
 * around while a Dock icon bounces. Pure CSS/Framer Motion, no assets besides
 * the existing Dock icons. Static when reduced motion is requested.
 */
const UsageDemo = () => {
  const { t } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();

  return (
    <div className="onboarding-demo" role="img" aria-label={t("demoLabel")}>
      <motion.div
        className="onboarding-demo__window"
        animate={
          reducedMotion
            ? undefined
            : { x: [0, 70, 70, -50, 0], y: [0, -6, 14, 8, 0], rotate: [0, 2, 0, -2, 0] }
        }
        transition={loop}
      >
        <div className="onboarding-demo__titlebar">
          <i /> <i /> <i />
        </div>
        <div className="onboarding-demo__lines">
          <b /> <b /> <b />
        </div>
        <motion.span
          className="onboarding-demo__cursor"
          animate={reducedMotion ? undefined : { scale: [1, 0.8, 1, 1, 1] }}
          transition={loop}
        />
      </motion.div>
      <div className="onboarding-demo__dock">
        {[desktopImages.finder, desktopImages.safari, desktopImages.settings].map(
          (src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              animate={
                reducedMotion || i !== 1 ? undefined : { y: [0, -14, 0, -7, 0, 0] }
              }
              transition={{ ...loop, times: [0, 0.12, 0.24, 0.34, 0.44, 1] }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default UsageDemo;
