import { expect, test as base } from '@playwright/test';

/**
 * Network failures show up in the console too, and several tests cause them on purpose
 * (for example, a TryIt request to an API that isn't reachable from the test). Each engine words them differently:
 * Chromium reports "blocked by CORS policy", Firefox "Cross-Origin Request Blocked", and WebKit "Access-Control-Allow-Origin"
 * (and "due to access control checks", which it also reports as an uncaught error).
 */
const networkFailure =
  /Failed to load resource|net::ERR_|blocked by CORS policy|Cross-Origin Request Blocked|Access-Control-Allow-Origin|due to access control checks/;

/**
 * `test` with one addition: a test fails when the page throws an uncaught error or logs a `console.error`.
 * Without this, a runtime error that blanks out a component can go unnoticed when the assertions only look at
 * the parts of the page that still render.
 */
export const test = base.extend<{ failOnBrowserErrors: void }>({
  failOnBrowserErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('pageerror', error => {
        if (!networkFailure.test(error.message)) errors.push(`uncaught: ${error.message}`);
      });
      page.on('console', message => {
        if (message.type() === 'error' && !networkFailure.test(message.text())) {
          errors.push(`console.error: ${message.text()}`);
        }
      });

      await use();

      expect(errors, 'the page reported errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
