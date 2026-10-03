import { describe, it, expect } from "vitest";
import reducer, {
  toggleTheme,
  setTheme,
  setBackground,
} from "./configurationSlice";

const initial = { darkTheme: true, colorfulBackground: true };

describe("configurationSlice", () => {
  it("toggles the theme", () => {
    expect(reducer(initial, toggleTheme()).darkTheme).toBe(false);
  });

  it("sets theme from a string and ignores unknown values", () => {
    expect(reducer(initial, setTheme("light")).darkTheme).toBe(false);
    expect(reducer(initial, setTheme("dark")).darkTheme).toBe(true);
    expect(reducer(initial, setTheme("nope"))).toEqual(initial);
  });

  it("sets the background", () => {
    expect(reducer(initial, setBackground("landscape")).colorfulBackground).toBe(
      false
    );
    expect(reducer(initial, setBackground("colorful")).colorfulBackground).toBe(
      true
    );
  });
});
