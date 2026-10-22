import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against one of the example apps in `examples-dev/`.
 * Set `EXAMPLE` to the example's name (angular, react-vite, static-html) to have Playwright serve it.
 * Without it, the tests run against whatever is already listening on the base URL.
 */
const example = process.env.EXAMPLE;
const baseURL = 'http://localhost:4200';

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e-results/artifacts',
  // screenshots to compare builds with (see e2e/visual.spec.ts), recorded locally and not committed
  snapshotPathTemplate: 'e2e-visual-baseline/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['junit', { outputFile: 'e2e-results/output.xml' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  // The web components and the React components run in all three engines, so the tests do as well. Pass `--project` to
  // run one of them.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: example
    ? {
        command: `npm run serve:${example}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
