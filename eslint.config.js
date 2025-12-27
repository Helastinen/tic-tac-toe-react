import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin-js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // Global ignores
  {
    ignores: ["dist", "node_modules"],
  },

  // Base JS + React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@stylistic/js": stylistic,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": ["error", "always"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Vitest
  {
    files: ["**/*.test.{ts,tsx}"],
    languageOptions: {
      globals: globals.vitest,
    },
  },
]);
