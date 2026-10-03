import { describe, it, expect, beforeEach } from "vitest";
import { useApplicationStore } from "./applicationStore";

describe("applicationStore", () => {
  beforeEach(() => {
    useApplicationStore.setState({ appZ: 2, openedApp: [] });
  });

  it("opens an application with an increasing z-index", () => {
    useApplicationStore.getState().openApplication({ id: "a" });
    const state = useApplicationStore.getState();
    expect(state.appZ).toBe(3);
    expect(state.openedApp).toEqual([{ id: "a", z: 3 }]);
  });

  it("brings an application to front when set active", () => {
    const { openApplication, setApplicationActive } =
      useApplicationStore.getState();
    openApplication({ id: "a" });
    openApplication({ id: "b" });
    setApplicationActive({ id: "a" });
    const { openedApp } = useApplicationStore.getState();
    const a = openedApp.find((app) => app.id === "a");
    const b = openedApp.find((app) => app.id === "b");
    expect(a.z).toBeGreaterThan(b.z);
  });

  it("closes an application", () => {
    const { openApplication, closeApplication } =
      useApplicationStore.getState();
    openApplication({ id: "a" });
    closeApplication({ id: "a" });
    expect(useApplicationStore.getState().openedApp).toEqual([]);
  });
});
