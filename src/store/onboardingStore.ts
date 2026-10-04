import { create } from "zustand";
import {
  markOnboardingSeen,
  shouldShowOnboarding,
} from "../services/onboardingStorage";
import { TOTAL_STEPS } from "../onboarding/steps";

interface OnboardingState {
  /** Whether the onboarding is currently displayed */
  isOpen: boolean;
  /** 0 is the "Hello" intro, 1..n are the content pages */
  step: number;
  open: () => void;
  /** Dismiss (skip / Escape). Counts as seen. */
  close: () => void;
  /** Finish the tour. Counts as seen. */
  complete: () => void;
  /** Go to the next step, completing the tour after the last one */
  next: () => void;
  /** Go back one content page (the intro is never revisited) */
  prev: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  isOpen: shouldShowOnboarding(),
  step: 0,
  open: () => set({ isOpen: true, step: 0 }),
  close: () => {
    markOnboardingSeen();
    set({ isOpen: false });
  },
  complete: () => {
    markOnboardingSeen();
    set({ isOpen: false });
  },
  next: () => {
    const { step, complete } = get();
    if (step >= TOTAL_STEPS - 1) complete();
    else set({ step: step + 1 });
  },
  prev: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}));
