import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useOnboardingStore } from "./onboardingStore";
import {
  ONBOARDING_SEEN_KEY,
  hasSeenOnboarding,
  isOnboardingForced,
  markOnboardingSeen,
  shouldShowOnboarding,
} from "../services/onboardingStorage";
import { TOTAL_STEPS } from "../onboarding/steps";

describe("onboardingStorage", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("is not seen by default and persists once marked", () => {
    expect(hasSeenOnboarding()).toBe(false);
    markOnboardingSeen();
    expect(window.localStorage.getItem(ONBOARDING_SEEN_KEY)).toBe("true");
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("does not throw when reading fails, and shows the onboarding", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(hasSeenOnboarding()).toBe(false);
    expect(shouldShowOnboarding()).toBe(true);
  });

  it("does not throw when writing fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(() => markOnboardingSeen()).not.toThrow();
  });

  it("detects ?onboarding=1", () => {
    expect(isOnboardingForced("?onboarding=1")).toBe(true);
    expect(isOnboardingForced("?onboarding=0")).toBe(false);
    expect(isOnboardingForced("")).toBe(false);
  });

  it("is forced open even when already seen", () => {
    markOnboardingSeen();
    expect(shouldShowOnboarding()).toBe(false);
    window.history.pushState({}, "", "/?onboarding=1");
    expect(shouldShowOnboarding()).toBe(true);
    window.history.pushState({}, "", "/");
  });
});

describe("onboardingStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useOnboardingStore.setState({ isOpen: true, step: 0 });
  });

  it("advances through the steps and completes after the last one", () => {
    const { next } = useOnboardingStore.getState();
    for (let i = 1; i < TOTAL_STEPS; i++) {
      next();
      expect(useOnboardingStore.getState().step).toBe(i);
      expect(useOnboardingStore.getState().isOpen).toBe(true);
    }
    next();
    expect(useOnboardingStore.getState().isOpen).toBe(false);
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("goes back but never to the intro", () => {
    useOnboardingStore.setState({ step: 2 });
    useOnboardingStore.getState().prev();
    expect(useOnboardingStore.getState().step).toBe(1);
    useOnboardingStore.getState().prev();
    expect(useOnboardingStore.getState().step).toBe(1);
  });

  it("close() dismisses and remembers it", () => {
    useOnboardingStore.getState().close();
    expect(useOnboardingStore.getState().isOpen).toBe(false);
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("open() restarts from the intro", () => {
    useOnboardingStore.setState({ isOpen: false, step: 2 });
    useOnboardingStore.getState().open();
    expect(useOnboardingStore.getState()).toMatchObject({
      isOpen: true,
      step: 0,
    });
  });

  it("still closes when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    useOnboardingStore.getState().complete();
    expect(useOnboardingStore.getState().isOpen).toBe(false);
    vi.restoreAllMocks();
  });
});
