import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../../services/translation";
import Onboarding from "./Onboarding";
import { useOnboardingStore } from "../../store/onboardingStore";
import { hasSeenOnboarding } from "../../services/onboardingStorage";
import { TOTAL_STEPS } from "../../onboarding/steps";

// Keep the intro short so tests do not wait for the whole greeting cycle
vi.mock("../../onboarding/steps", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../onboarding/steps")>()),
  GREETING_DURATION: 10,
  WELCOME_DURATION: 10,
}));

afterEach(cleanup);

const startAt =(step: number) =>
  useOnboardingStore.setState({ isOpen: true, step });

describe("Onboarding (desktop)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    startAt(1);
  });

  it("renders an aria-modal dialog with the first step", async () => {
    render(<Onboarding variant="desktop" />);
    const dialog = await screen.findByRole("dialog", { name: "Welcome tour" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      await screen.findByRole("heading", { name: "Welcome to my Mac" })
    ).toBeInTheDocument();
  });

  it("moves between steps with Continue, Back and the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Onboarding variant="desktop" />);
    await screen.findByRole("heading", { name: "Welcome to my Mac" });

    await user.click(screen.getByRole("button", { name: "Continue" }));
    await screen.findByRole("heading", { name: "What you will find" });
    expect(useOnboardingStore.getState().step).toBe(2);

    await user.keyboard("{ArrowRight}");
    await screen.findByRole("heading", { name: "How to use it" });

    await user.keyboard("{ArrowLeft}");
    await screen.findByRole("heading", { name: "What you will find" });
    await user.click(screen.getByRole("button", { name: "Back" }));
    await screen.findByRole("heading", { name: "Welcome to my Mac" });
  });

  it("closes on Escape and remembers it", async () => {
    const user = userEvent.setup();
    render(<Onboarding variant="desktop" />);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(useOnboardingStore.getState().isOpen).toBe(false);
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("completes after the last step", async () => {
    startAt(TOTAL_STEPS - 1);
    const user = userEvent.setup();
    render(<Onboarding variant="desktop" />);
    await user.click(await screen.findByRole("button", { name: "Continue" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("keeps focus inside the dialog when tabbing", async () => {
    const user = userEvent.setup();
    render(<Onboarding variant="desktop" />);
    const dialog = await screen.findByRole("dialog");
    await screen.findByRole("button", { name: "Continue" });
    for (let i = 0; i < 4; i++) await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("cycles greetings with a lang attribute, then settles on Welcome", async () => {
    startAt(0);
    render(<Onboarding variant="desktop" />);
    const word = await waitFor(() => {
      const el = document.querySelector<HTMLElement>(".onboarding-hello__word");
      expect(el).not.toBeNull();
      return el as HTMLElement;
    });
    expect(word).toHaveAttribute("lang");
    // The intro auto-advances to the first content step
    expect(
      await screen.findByRole("heading", { name: "Welcome to my Mac" }, { timeout: 4000 })
    ).toBeInTheDocument();
  });
});

describe("Onboarding (smartphone)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    startAt(1);
  });

  it("offers Skip, and Get started on the last page", async () => {
    const user = userEvent.setup();
    render(<Onboarding variant="smartphone" />);
    await screen.findByRole("heading", { name: "Welcome to my Mac" });
    expect(screen.getByRole("button", { name: "Skip" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await screen.findByRole("heading", { name: "Make it yours" });
    expect(screen.queryByRole("button", { name: "Skip" })).toBeNull();

    await user.click(screen.getByRole("button", { name: "Get started" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(hasSeenOnboarding()).toBe(true);
  });

  it("Skip dismisses the tour", async () => {
    const user = userEvent.setup();
    render(<Onboarding variant="smartphone" />);
    await user.click(await screen.findByRole("button", { name: "Skip" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(hasSeenOnboarding()).toBe(true);
  });
});
