import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";
import configurationSlice from "./configurationSlice";

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    configuration: configurationSlice,
  },
});
