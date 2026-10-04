import { describe, it, expect, beforeEach } from "vitest";
import { useLaunchpadStore } from "./launchpadStore";

describe("launchpadStore", () => {
  beforeEach(() => useLaunchpadStore.setState({ isOpen: false }));

  it("opens, closes and toggles", () => {
    const { open, close, toggle } = useLaunchpadStore.getState();
    open();
    expect(useLaunchpadStore.getState().isOpen).toBe(true);
    close();
    expect(useLaunchpadStore.getState().isOpen).toBe(false);
    toggle();
    expect(useLaunchpadStore.getState().isOpen).toBe(true);
    toggle();
    expect(useLaunchpadStore.getState().isOpen).toBe(false);
  });
});
