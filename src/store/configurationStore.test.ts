import { describe, it, expect, beforeEach } from "vitest";
import { useConfigurationStore } from "./configurationStore";

describe("configurationStore", () => {
  beforeEach(() => {
    useConfigurationStore.setState({
      darkTheme: true,
      colorfulBackground: true,
    });
  });

  it("toggles the theme", () => {
    useConfigurationStore.getState().toggleTheme();
    expect(useConfigurationStore.getState().darkTheme).toBe(false);
  });

  it("sets theme from a string and ignores unknown values", () => {
    const { setTheme } = useConfigurationStore.getState();
    setTheme("light");
    expect(useConfigurationStore.getState().darkTheme).toBe(false);
    setTheme("dark");
    expect(useConfigurationStore.getState().darkTheme).toBe(true);
    setTheme("nope");
    expect(useConfigurationStore.getState().darkTheme).toBe(true);
  });

  it("sets the background", () => {
    const { setBackground } = useConfigurationStore.getState();
    setBackground("landscape");
    expect(useConfigurationStore.getState().colorfulBackground).toBe(false);
    setBackground("colorful");
    expect(useConfigurationStore.getState().colorfulBackground).toBe(true);
  });
});
