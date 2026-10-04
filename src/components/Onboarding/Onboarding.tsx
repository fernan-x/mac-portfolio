import { AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "../../store/onboardingStore";
import DesktopOnboarding from "./DesktopOnboarding";
import SmartphoneOnboarding from "./SmartphoneOnboarding";
import "./Onboarding.scss";

interface OnboardingProps {
  variant: "desktop" | "smartphone";
}

/**
 * Entry point, lazy-loaded from App so none of this (nor framer-motion) is in
 * the main chunk until the onboarding is actually shown.
 */
const Onboarding = ({ variant }: OnboardingProps) => {
  const isOpen = useOnboardingStore((state) => state.isOpen);

  return (
    <AnimatePresence>
      {isOpen &&
        (variant === "desktop" ? (
          <DesktopOnboarding key="desktop" />
        ) : (
          <SmartphoneOnboarding key="smartphone" />
        ))}
    </AnimatePresence>
  );
};

export default Onboarding;
