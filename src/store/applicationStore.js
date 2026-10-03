import { create } from "zustand";

export const useApplicationStore = create((set) => ({
  appZ: 2,
  openedApp: [],
  openApplication: (application) =>
    set((state) => {
      const appZ = state.appZ + 1;
      return {
        appZ,
        openedApp: [...state.openedApp, { ...application, z: appZ }],
      };
    }),
  closeApplication: (application) =>
    set((state) => ({
      openedApp: state.openedApp.filter((app) => app.id !== application.id),
    })),
  setApplicationActive: (application) =>
    set((state) => {
      let appZ = state.appZ;
      const openedApp = state.openedApp.map((app) => {
        if (app.id !== application.id) return app;
        appZ += 1;
        return { ...app, z: appZ };
      });
      return { appZ, openedApp };
    }),
}));
