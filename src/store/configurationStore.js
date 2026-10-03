import { create } from "zustand";

export const useConfigurationStore = create((set) => ({
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
