import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "../../services/translation";
import Onboarding from "./Onboarding";
import { useOnboardingStore } from "../../store/onboardingStore";

vi.mock("../../onboarding/steps", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../onboarding/steps")>()),
  GREETING_DURATION: 10,
  WELCOME_DURATION: 150,
}));

describe("Onboarding with prefers-reduced-motion", () => {
  beforeAll(() => {
    window.matchMedia = (query: string) =>
      ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  it("skips the greeting cycle: only Welcome is ever shown", async () => {
    useOnboardingStore.setState({ isOpen: true, step: 0 });
    const seen = new Set<string>();
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll(".onboarding-hello__word")
        .forEach((el) => seen.add(el.textContent ?? ""));
    });
    render(<Onboarding variant="desktop" />);
    observer.observe(document.body, { subtree: true, childList: true });
    document
      .querySelectorAll(".onboarding-hello__word")
      .forEach((el) => seen.add(el.textContent ?? ""));

    // Auto-advances after Welcome
    await screen.findByRole("heading", { name: "Welcome to my Mac" });
    observer.disconnect();
    expect([...seen]).toEqual(["Welcome"]);
  });
});
