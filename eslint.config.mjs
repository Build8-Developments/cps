import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference-only codebase (its own project/deps); not part of this app.
    "CyberStage_Landing_Page/**",
    // pm2 process file; CommonJS on purpose (pm2 loads it with require()).
    "ecosystem.config.cjs",
  ]),
]);

export default eslintConfig;
