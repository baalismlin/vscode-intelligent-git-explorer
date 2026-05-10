import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      ".pnpm-store/**",
      ".vscode/**",
      ".idea/**",
      "*.vsix"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: ["packages/extension/src/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["packages/contracts/src/**/*.ts", "packages/contracts/scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["packages/webview/src/**/*.{ts,tsx}", "packages/webview/vite.config.mts"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ["packages/webview/src/**/*.{ts,tsx}"],
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-hooks/refs": "off"
    },
    plugins: {
      react,
      "react-hooks": reactHooks
    }
  },
  {
    files: ["*.config.{js,mjs,mts}", "eslint.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  prettier
);
