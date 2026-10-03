import { defineConfig, type UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";
import react from "@vitejs/plugin-react";

// vitest ships its own copy of vite, so its `defineConfig` types clash with the
// root vite (used by the app and the react plugin). Use vite's defineConfig and
// type the `test` block explicitly instead.
const config: UserConfig & { test: InlineConfig } = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(config);
