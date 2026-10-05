import { create } from "zustand";

interface ConfigurationState {
  darkTheme: boolean;
  colorfulBackground: boolean;
  brightness: number;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
  setBackground: (background: string) => void;
  setBrightness: (brightness: number) => void;
}

export const MIN_BRIGHTNESS = 0.3;

export const useConfigurationStore = create<ConfigurationState>((set) => ({
  darkTheme: true,
  colorfulBackground: true,
  brightness: 1,
  toggleTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
  setTheme: (theme) => {
    if (theme === "dark") set({ darkTheme: true });
    else if (theme === "light") set({ darkTheme: false });
  },
  setBackground: (background) => {
    if (background === "colorful") set({ colorfulBackground: true });
    else if (background === "landscape") set({ colorfulBackground: false });
  },
  setBrightness: (brightness) =>
    set({ brightness: Math.min(1, Math.max(MIN_BRIGHTNESS, brightness)) }),
}));
