import { expect, test as base } from '@playwright/test';

/**
 * Network failures show up in the console too, and several tests cause them on purpose
 * (for example, a TryIt request to an API that isn't reachable from the test).
 */
const networkFailure = /Failed to load resource|net::ERR_|blocked by CORS policy/;

/**
 * `test` with one addition: a test fails when the page throws an uncaught error or logs a `console.error`.
 * Without this, a runtime error that blanks out a component can go unnoticed when the assertions only look at
 * the parts of the page that still render.
 */
export const test = base.extend<{ failOnBrowserErrors: void }>({
  failOnBrowserErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(`uncaught: ${error.message}`));
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
