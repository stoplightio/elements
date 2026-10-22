import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, type Page } from '@playwright/test';

import { mockCorsEndpoint } from './cors';

export const ZOOM_OPENAPI_URL =
  'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml';

/** Serves the Zoom description from `fixtures/` instead of GitHub, so the tests don't depend on the network. */
export async function mockZoomApiDescription(page: Page) {
  const zoomOpenApi = readFileSync(join(__dirname, '..', 'fixtures', 'zoom.openapi.yml'), 'utf-8');
  await page.route(ZOOM_OPENAPI_URL, route => route.fulfill({ status: 200, body: zoomOpenApi }));
}

export async function loadZoomApiPage(page: Page) {
  await mockZoomApiDescription(page);

  const zoomRequest = page.waitForRequest(ZOOM_OPENAPI_URL);
  await page.goto('/zoom-api');
  await zoomRequest;

  await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
}

/** Answers the requests TryIt sends to the Zoom API and records them. */
export const mockZoomApi = (page: Page, body: unknown = { ok: true }) =>
  mockCorsEndpoint(page, 'https://api.zoom.us/**', { body });
