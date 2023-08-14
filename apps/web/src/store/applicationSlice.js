import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appZ: 2,
  openedApp: [],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    openApplication: (state, action) => {
      state.appZ += 1;
      let app = action.payload;
      app.z = state.appZ;
      state.openedApp.push(app);
    },
    closeApplication: (state, action) => {
      state.openedApp = state.openedApp.filter((app) => app !== action.payload);
    },
    setApplicationActive: (state, action) => {
      state.openedApp.forEach((app) => {
        if (app.id === action.payload.id) {
          state.appZ += 1;
          app.z = state.appZ;
        }
      });
    },
  },
});

export const { openApplication, closeApplication, setApplicationActive } =
  applicationSlice.actions;

export default applicationSlice.reducer;
