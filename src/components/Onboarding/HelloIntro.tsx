import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  GREETING_DURATION,
  WELCOME_DURATION,
  greetings,
} from "../../onboarding/steps";

interface HelloIntroProps {
  /** Called once the intro has settled on "Welcome" for a moment */
  onDone: () => void;
}

/**
 * The "Hello" intro: cycles through greetings, then settles on "Welcome".
 * With reduced motion it only fades in "Welcome".
 */
const HelloIntro = ({ onDone }: HelloIntroProps) => {
  const { t, i18n } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const isWelcome = reducedMotion || index >= greetings.length;

  useEffect(() => {
    const timer = setTimeout(
      isWelcome ? onDone : () => setIndex((current) => current + 1),
      isWelcome ? WELCOME_DURATION : GREETING_DURATION
    );
    return () => clearTimeout(timer);
  }, [index, isWelcome, onDone]);

  const welcome = t("welcome");
  const word = isWelcome
    ? { text: welcome, lang: i18n.resolvedLanguage ?? "en" }
    : greetings[index];

  return (
    <div className="onboarding-hello">
      {/* Screen readers get the final message, not the whole carousel */}
      <h1 className="onboarding-sr-only">{welcome}</h1>
      <div className="onboarding-hello__stage" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={word.text}
            lang={word.lang}
            className="onboarding-hello__word"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, filter: "blur(14px)" }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.08, filter: "blur(14px)" }
            }
            transition={{ duration: reducedMotion ? 0.4 : 0.35, ease: "easeOut" }}
          >
            {word.text}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HelloIntro;
