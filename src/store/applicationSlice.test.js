import { describe, it, expect } from "vitest";
import reducer, {
  openApplication,
  setApplicationActive,
} from "./applicationSlice";

const initial = { appZ: 2, openedApp: [] };

describe("applicationSlice", () => {
  it("opens an application with an increasing z-index", () => {
    const state = reducer(initial, openApplication({ id: "a" }));
    expect(state.appZ).toBe(3);
    expect(state.openedApp).toEqual([{ id: "a", z: 3 }]);
  });

  it("brings an application to front when set active", () => {
    let state = reducer(initial, openApplication({ id: "a" }));
    state = reducer(state, openApplication({ id: "b" }));
    state = reducer(state, setApplicationActive({ id: "a" }));
    const a = state.openedApp.find((app) => app.id === "a");
    const b = state.openedApp.find((app) => app.id === "b");
    expect(a.z).toBeGreaterThan(b.z);
  });
});
