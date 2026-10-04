export const ONBOARDING_SEEN_KEY = "onboardingSeen";

/** True when the visitor already went through (or skipped) the onboarding. */
export const hasSeenOnboarding = (): boolean => {
  try {
    return window.localStorage.getItem(ONBOARDING_SEEN_KEY) === "true";
  } catch {
    // Storage can be blocked (private mode, disabled cookies...)
    return false;
  }
};

export const markOnboardingSeen = (): void => {
  try {
    window.localStorage.setItem(ONBOARDING_SEEN_KEY, "true");
  } catch {
    // Nothing to do: the onboarding will simply show again next visit
  }
};

/** `?onboarding=1` forces the onboarding open, handy to review it. */
export const isOnboardingForced = (
  search: string = window.location.search
): boolean => new URLSearchParams(search).get("onboarding") === "1";

export const shouldShowOnboarding = (): boolean =>
  isOnboardingForced() || !hasSeenOnboarding();
