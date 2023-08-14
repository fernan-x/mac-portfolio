import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";
import configurationSlice from "./configurationSlice";
import pokedexSlice from "./pokedexSlice";

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    configuration: configurationSlice,
    pokedex: pokedexSlice,
  },
});
