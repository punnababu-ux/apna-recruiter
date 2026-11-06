import { defineConfig, devices } from "@playwright/test"

// Browser tests (e2e/). Two kinds:
//   layout + a11y  run everywhere, CI included: they measure (overflow, level
//                  rows, axe) so they don't depend on how a machine renders fonts.
//   @visual        screenshot comparisons. Baselines are rendered on macOS, so
//                  CI skips them; run them locally before showing a layout change.
const PORT = 3100
const CI = !!process.env.CI

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  grepInvert: CI ? /@visual/ : undefined,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled", caret: "hide" } },
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Locally, drive the installed Chrome; CI installs Playwright's Chromium.
    channel: CI ? undefined : "chrome",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "phone",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium", viewport: { width: 375, height: 812 } },
    },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: CI ? `npx next start -p ${PORT}` : `npx next dev -p ${PORT}`,
    url: `http://localhost:${PORT}/apnahire/credits`,
    reuseExistingServer: !CI,
    timeout: 180_000,
  },
})
