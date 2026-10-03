import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "17.0" } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      // Automatic JSX runtime: "import React" is harmless, not an error
      "no-unused-vars": ["error", { varsIgnorePattern: "^React$" }],
      // React-Compiler oriented rule; initialising state in effects is used on purpose here
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["**/*.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
];
