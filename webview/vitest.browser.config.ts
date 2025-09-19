import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser/providers/playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: "chromium", headless: true }],
    },
  },
});
