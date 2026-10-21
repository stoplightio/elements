import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, type Page, test } from '@playwright/test';

import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';

const ZOOM_OPENAPI_URL = 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml';

test.describe('API component', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
  });

  test.describe('Api page', () => {
    test('loads api page correctly', async ({ page }) => {
      await loadZoomApiPage(page);
      await expect(page.getByText('https://api.zoom.us/v2', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: /API Key/ })).toBeVisible();
      await expect(page.getByText('API Description', { exact: true })).toBeVisible();
    });
  });

  test.describe('Operation page', () => {
    test('loads operation docs correctly', async ({ page }) => {
      await page.goto('/zoom-api/operations/groupCreate');
      await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Request/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Response/i })).toBeVisible();
    });

    test('does not break on select dropdown', async ({ page }) => {
      await loadZoomApiPage(page);
      await page.goto('/zoom-api/operations/groups');
      await page.getByRole('button', { name: /request sample/i }).click();
      await expect(page.getByText('Obj-C', { exact: true })).toBeVisible();
    });

    test('displays request sample correctly', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await expect(page.getByLabel(/curl/i)).toBeAttached();
      await expect(page.getByLabel(/--request post/i)).toBeAttached();
    });

    test('displays example correctly', async ({ page }) => {
      await page.goto('/zoom-api/operations/users');
      await expect(page.getByLabel(/\{[\s\S]+\}/)).toBeAttached();
    });

    test('displays schema correctly', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await expect(page.getByText('action', { exact: true }).first()).toBeVisible();
      await expect(page.getByText('password', { exact: true }).first()).toBeVisible();
    });

    test('invokes TryIt request (receives network error)', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await page.getByRole('button', { name: /Send API Request/i }).click();
      await expect(page.getByRole('button', { name: 'Error', exact: true })).toBeVisible();
    });
  });

  test.describe('Schema page', () => {
    test('loads schema page correctly', async ({ page }) => {
      await page.goto('/zoom-api/schemas/Account');
      await expect(page.getByRole('heading', { name: /Account/i })).toBeVisible();
      await expect(page.getByText('first_name', { exact: true }).first()).toBeVisible();
      await expect(page.getByText('pay_mode', { exact: true }).first()).toBeVisible();
    });

    test('displays example correctly', async ({ page }) => {
      await page.goto('/zoom-api/schemas/Account');
      await expect(page.getByLabel(/\{[\s\S]+\}/)).toBeAttached();
    });
  });

  test('navigates via table of contents', async ({ page }) => {
    await loadZoomApiPage(page);
    await page.getByText('Groups', { exact: true }).click();
    await page.getByText('Create a group', { exact: true }).click();
    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
  });
});

async function loadZoomApiPage(page: Page) {
  const zoomOpenApi = readFileSync(join(__dirname, 'fixtures', 'zoom.openapi.yml'), 'utf-8');
  await page.route(ZOOM_OPENAPI_URL, route => route.fulfill({ status: 200, body: zoomOpenApi }));

  const zoomRequest = page.waitForRequest(ZOOM_OPENAPI_URL);
  await page.goto('/zoom-api');
  await zoomRequest;

  await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
}
