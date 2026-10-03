import { describe, it, expect, beforeEach } from "vitest";
import { useApplicationStore } from "./applicationStore";
import type { Application } from "../types/application";

// Only the id matters to the store logic; cast a minimal fixture to Application
const app = (id: string) => ({ id }) as Application;

describe("applicationStore", () => {
  beforeEach(() => {
    useApplicationStore.setState({ appZ: 2, openedApp: [] });
  });

  it("opens an application with an increasing z-index", () => {
    useApplicationStore.getState().openApplication(app("a"));
    const state = useApplicationStore.getState();
    expect(state.appZ).toBe(3);
    expect(state.openedApp).toEqual([{ id: "a", z: 3 }]);
  });

  it("brings an application to front when set active", () => {
    const { openApplication, setApplicationActive } =
      useApplicationStore.getState();
    openApplication(app("a"));
    openApplication(app("b"));
    setApplicationActive({ id: "a" });
    const { openedApp } = useApplicationStore.getState();
    const a = openedApp.find((o) => o.id === "a");
    const b = openedApp.find((o) => o.id === "b");
    expect(a?.z).toBeGreaterThan(b?.z as number);
  });

  it("closes an application", () => {
    const { openApplication, closeApplication } =
      useApplicationStore.getState();
    openApplication(app("a"));
    closeApplication({ id: "a" });
    expect(useApplicationStore.getState().openedApp).toEqual([]);
  });
});
