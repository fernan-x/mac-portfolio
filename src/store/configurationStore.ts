import { create } from "zustand";

interface ConfigurationState {
  darkTheme: boolean;
  colorfulBackground: boolean;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
  setBackground: (background: string) => void;
}

export const useConfigurationStore = create<ConfigurationState>((set) => ({
  darkTheme: true,
  colorfulBackground: true,
  toggleTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
  setTheme: (theme) => {
    if (theme === "dark") set({ darkTheme: true });
    else if (theme === "light") set({ darkTheme: false });
  },
  setBackground: (background) => {
    if (background === "colorful") set({ colorfulBackground: true });
    else if (background === "landscape") set({ colorfulBackground: false });
  },
}));
