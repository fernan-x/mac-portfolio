import { describe, it, expect, beforeEach } from "vitest";
import { useConfigurationStore, MIN_BRIGHTNESS } from "./configurationStore";

describe("configurationStore", () => {
  beforeEach(() => {
    useConfigurationStore.setState({
      darkTheme: true,
      colorfulBackground: true,
      brightness: 1,
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

  it("clamps the brightness", () => {
    const { setBrightness } = useConfigurationStore.getState();
    setBrightness(0.6);
    expect(useConfigurationStore.getState().brightness).toBe(0.6);
    setBrightness(5);
    expect(useConfigurationStore.getState().brightness).toBe(1);
    setBrightness(0);
    expect(useConfigurationStore.getState().brightness).toBe(MIN_BRIGHTNESS);
  });
});
