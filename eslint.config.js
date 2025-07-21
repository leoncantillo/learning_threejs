import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["js/recommended", pluginReact.configs.flat.recommended],
    rules: {
      "react/react-in-jsx-scope": "off",
      "semi": ["error", "always"],
    },
  },
]);
