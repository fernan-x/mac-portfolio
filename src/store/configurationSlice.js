import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: true,
  colorfulBackground: true,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    setTheme: (state, action) => {
      if (action.payload === "dark") {
        state.darkTheme = true;
      } else if (action.payload === "light") {
        state.darkTheme = false;
      }
    },
    setBackground: (state, action) => {
      if (action.payload === "colorful") {
        state.colorfulBackground = true;
      } else if (action.payload === "landscape") {
        state.colorfulBackground = false;
      }
    },
  },
});

export const { toggleTheme, setTheme, setBackground } =
  configurationSlice.actions;

export default configurationSlice.reducer;
