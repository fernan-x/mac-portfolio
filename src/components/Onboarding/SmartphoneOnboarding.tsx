import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { useOnboardingStore } from "../../store/onboardingStore";
import { TOTAL_STEPS, onboardingSteps } from "../../onboarding/steps";
import HelloIntro from "./HelloIntro";
import StepContent from "./StepContent";
import { useFocusTrap } from "./useFocusTrap";
import { useOnboardingKeys } from "./useOnboardingKeys";

const TITLE_ID = "onboarding-title";
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const pageVariants = {
  enter: (direction: number) => ({ x: `${direction * 100}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${direction * -100}%`, opacity: 0 }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/** iOS style: "Hello" intro, then swipeable full-screen "What's New" pages. */
const SmartphoneOnboarding = () => {
  const { t } = useTranslation("onboarding");
  const reducedMotion = useReducedMotion();
  const step = useOnboardingStore((state) => state.step);
  const next = useOnboardingStore((state) => state.next);
  const prev = useOnboardingStore((state) => state.prev);
  const close = useOnboardingStore((state) => state.close);
  const [direction, setDirection] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    next();
  }, [next]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    prev();
  }, [prev]);

  useFocusTrap(rootRef);
  // Phones have no Escape key, but external keyboards do: keep both consistent
  useOnboardingKeys({ onNext: goNext, onPrev: goPrev, onEscape: close });

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const isSwipe =
      Math.abs(info.offset.x) > SWIPE_DISTANCE ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (!isSwipe) return;
    if (info.offset.x < 0 && step < TOTAL_STEPS - 1) goNext();
    else if (info.offset.x > 0) goPrev();
  };

  const content = step > 0 ? onboardingSteps[step - 1] : null;
  const isLast = step === TOTAL_STEPS - 1;
  const variants = reducedMotion ? fadeVariants : pageVariants;

  return (
    <motion.div
      ref={rootRef}
      className="onboarding onboarding--smartphone"
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {content ? (
          <motion.div
            key="pages"
            className="onboarding-pages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="onboarding-pages__top">
              {!isLast && (
                <button
                  type="button"
                  className="onboarding-button onboarding-button--text"
                  onClick={close}
                >
                  {t("skip")}
                </button>
              )}
            </div>
            <div className="onboarding-pages__viewport">
              <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <motion.section
                  key={content.id}
                  className="onboarding-page"
                  aria-labelledby={TITLE_ID}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reducedMotion ? 0.25 : 0.35, ease: "easeOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                >
                  <StepContent
                    step={content}
                    variant="smartphone"
                    titleId={TITLE_ID}
                  />
                </motion.section>
              </AnimatePresence>
            </div>
            <div className="onboarding-pages__bottom">
              <div
                className="onboarding-dots"
                role="img"
                aria-label={t("page", {
                  current: step,
                  total: onboardingSteps.length,
                })}
              >
                {onboardingSteps.map((item, index) => (
                  <span
                    key={item.id}
                    className={`onboarding-dots__dot${
                      index === step - 1 ? " active" : ""
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="onboarding-button onboarding-button--primary onboarding-button--block"
                onClick={goNext}
                autoFocus
              >
                {isLast ? t("getStarted") : t("continue")}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hello"
            className="onboarding-stage"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HelloIntro onDone={goNext} />
            <button
              type="button"
              className="onboarding-button onboarding-button--ghost onboarding-skip"
              onClick={goNext}
            >
              {t("skip")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SmartphoneOnboarding;
