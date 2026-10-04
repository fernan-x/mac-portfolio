import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useOnboardingStore } from "../../store/onboardingStore";
import { onboardingSteps } from "../../onboarding/steps";
import HelloIntro from "./HelloIntro";
import StepContent from "./StepContent";
import UsageDemo from "./UsageDemo";
import { useFocusTrap } from "./useFocusTrap";
import { useOnboardingKeys } from "./useOnboardingKeys";

const TITLE_ID = "onboarding-title";

/** macOS style: "Hello" intro, then a centered "What's New" window. */
const DesktopOnboarding = () => {
  const { t } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();
  const step = useOnboardingStore((state) => state.step);
  const next = useOnboardingStore((state) => state.next);
  const prev = useOnboardingStore((state) => state.prev);
  const close = useOnboardingStore((state) => state.close);
  const rootRef = useRef<HTMLDivElement>(null);

  useFocusTrap(rootRef);
  useOnboardingKeys({ onNext: next, onPrev: prev, onEscape: close });

  const content = step > 0 ? onboardingSteps[step - 1] : null;

  return (
    <motion.div
      ref={rootRef}
      className="onboarding onboarding--desktop"
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {content ? (
          <motion.section
            key={content.id}
            className="onboarding-window"
            aria-labelledby={TITLE_ID}
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <StepContent step={content} variant="desktop" titleId={TITLE_ID} />
            {content.demo && <UsageDemo />}
            <div className="onboarding-window__footer">
              {step > 1 && (
                <button
                  type="button"
                  className="onboarding-button onboarding-button--text"
                  onClick={prev}
                >
                  {t("back")}
                </button>
              )}
              <button
                type="button"
                className="onboarding-button onboarding-button--primary"
                onClick={next}
                autoFocus
              >
                {t("continue")}
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="hello"
            className="onboarding-stage"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HelloIntro onDone={next} />
            <button
              type="button"
              className="onboarding-button onboarding-button--ghost onboarding-skip"
              onClick={next}
            >
              {t("skip")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DesktopOnboarding;
