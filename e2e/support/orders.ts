import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Page } from '@playwright/test';

import { expect } from './fixtures';

/** The API of the "Proxied API" page of the react-vite example, which has server variables. */
export const ORDERS_OPENAPI_URL = 'https://example.com/orders.openapi.yaml';

export async function loadOrdersApiOperation(page: Page, operationId: 'listOrders' | 'getOrder') {
  const description = readFileSync(join(__dirname, '..', 'fixtures', 'orders.openapi.yml'), 'utf-8');
  await page.route(ORDERS_OPENAPI_URL, route => route.fulfill({ status: 200, body: description }));

  await page.goto(`/proxied-api/operations/${operationId}`);
  await expect(page.getByRole('heading', { name: /Retrieve an order|List orders/ })).toBeVisible();
}

/** The URL TryIt would send the request to, as shown in the cURL request sample. */
export async function requestSampleUrl(page: Page) {
  const sample = await page
    .getByRole('group')
    .filter({ hasText: /curl --request/ })
    .first()
    .innerText();

  return sample.replace(/\s+/g, ' ').match(/--url (\S+)/)?.[1];
}
