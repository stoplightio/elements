import type { Page } from '@playwright/test';

import { expect, test } from './support/fixtures';
import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';
import { mockZoomApi, mockZoomApiDescription } from './support/zoom';

// These tests compare how pages look with screenshots that were recorded from another build of Elements, to check
// that two builds look the same. They only run when `VISUAL` is set, because there are no recorded screenshots to
// compare with otherwise. See scripts/visual-compat.sh.
test.skip(!process.env.VISUAL, 'compares with screenshots of another build, see scripts/visual-compat.sh');
// the engines render text and borders differently, so a build is only compared with the same engine's screenshots
test.skip(({ browserName }) => browserName !== 'chromium', 'screenshots are recorded in Chromium');

const example = process.env.EXAMPLE ?? 'unknown';

/** The screenshots are recorded from the example that the tests run on, in a folder that git ignores. */
const screenshotName = (name: string) => `${example}-${name}.png`;

async function expectLooksTheSame(page: Page, name: string) {
  // fonts and the layout need a moment before the page is stable
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot(screenshotName(name), {
    fullPage: true,
    animations: 'disabled',
    // anti-aliasing differs by a few pixels between runs, a visible change is more than that
    maxDiffPixelRatio: Number(process.env.VISUAL_TOLERANCE ?? 0.002),
  });
}

test.describe('Appearance', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
    await mockZoomApiDescription(page);
  });

  test('API overview', async ({ page }) => {
    await page.goto('/zoom-api');
    await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
    await expectLooksTheSame(page, 'overview');
  });

  test('operation with parameters', async ({ page }) => {
    await page.goto('/zoom-api/operations/user');
    await expect(page.getByRole('heading', { name: /Retrieve a user/i })).toBeVisible();
    await expectLooksTheSame(page, 'operation-get');
  });

  test('operation with a request body', async ({ page }) => {
    await page.goto('/zoom-api/operations/userCreate');
    await expect(page.getByRole('heading', { name: /Create a user/i })).toBeVisible();
    await expectLooksTheSame(page, 'operation-post');
  });

  test('schema', async ({ page }) => {
    await page.goto('/zoom-api/schemas/Account');
    await expect(page.getByRole('heading', { name: /Account/i })).toBeVisible();
    await expectLooksTheSame(page, 'schema');
  });

  test.describe('in dark mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() =>
        window.localStorage.setItem('mosaic-theme', JSON.stringify({ mode: 'dark', version: 0 })),
      );
    });

    test('operation with a request body', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await expect(page.getByRole('heading', { name: /Create a user/i })).toBeVisible();
      await expectLooksTheSame(page, 'operation-post-dark');
    });

    test('schema', async ({ page }) => {
      await page.goto('/zoom-api/schemas/Account');
      await expect(page.getByRole('heading', { name: /Account/i })).toBeVisible();
      await expectLooksTheSame(page, 'schema-dark');
    });
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('operation with parameters', async ({ page }) => {
      await page.goto('/zoom-api/operations/user');
      await expect(page.getByRole('heading', { name: /Retrieve a user/i })).toBeVisible();
      await expectLooksTheSame(page, 'operation-get-phone');
    });

    test('overview', async ({ page }) => {
      await page.goto('/zoom-api');
      await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
      await expectLooksTheSame(page, 'overview-phone');
    });

    test('operation with a request body', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await expect(page.getByRole('heading', { name: /Create a user/i })).toBeVisible();
      await expectLooksTheSame(page, 'operation-post-phone');
    });
  });

  test('operation with a response', async ({ page }) => {
    await mockZoomApi(page, { id: 'u-1', email: 'user@example.com', type: 1 });
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'userId' }).fill('abc123');
    await page.getByRole('button', { name: 'Send API Request' }).click();
    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    await expectLooksTheSame(page, 'operation-get-response');
  });

  test('operation with another request sample language', async ({ page }) => {
    await page.goto('/zoom-api/operations/userCreate');
    await page.getByRole('button', { name: /request sample language/i }).click();
    await page.getByRole('menuitemcheckbox', { name: 'Obj-C', exact: true }).click();
    await expect(page.getByRole('button', { name: /request sample language/i })).toContainText('Obj-C');
    await expectLooksTheSame(page, 'request-sample-objc');
  });

  test('overview on a wide screen', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/zoom-api');
    await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
    await expectLooksTheSame(page, 'overview-wide');
  });

  test('operation with an open request sample menu', async ({ page }) => {
    await page.goto('/zoom-api/operations/userCreate');
    await page.getByRole('button', { name: /request sample language/i }).click();
    await expect(page.getByRole('menuitemcheckbox', { name: 'Obj-C', exact: true })).toBeVisible();
    await expectLooksTheSame(page, 'request-sample-menu');
  });
});
