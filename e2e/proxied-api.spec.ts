import { mockCorsEndpoint } from './support/cors';
import { expect, test } from './support/fixtures';
import { loadOrdersApiOperation, requestSampleUrl } from './support/orders';

// The "Proxied API" page of the react-vite example sends the requests of TryIt through a CORS proxy, with
// credentials, and documents an API with server variables. The other examples don't have such a page.
test.skip(process.env.EXAMPLE !== 'react-vite', 'needs the "Proxied API" page of the react-vite example');

test.describe('TryIt through a CORS proxy', () => {
  test('shows the proxy in the request sample', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');

    expect(await requestSampleUrl(page)).toBe(
      'https://proxy.example.com/https://eu.orders.example.com/v1/orders/{orderId}',
    );
  });

  test('sends the request to the proxy, with the URL of the API appended', async ({ page }) => {
    const proxy = await mockCorsEndpoint(page, 'https://proxy.example.com/**', {
      body: { id: 'o-1' },
      credentials: true,
    });
    await loadOrdersApiOperation(page, 'getOrder');
    await page.getByRole('textbox', { name: 'orderId' }).fill('o-1');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    expect(proxy.requests().map(request => request.url())).toEqual([
      'https://proxy.example.com/https://eu.orders.example.com/v1/orders/o-1',
    ]);
  });

  test('sends the request with credentials', async ({ page }) => {
    // an answer that allows every origin is not valid for a request with credentials, so the browser rejects it
    await mockCorsEndpoint(page, 'https://proxy.example.com/**', { credentials: false });
    await loadOrdersApiOperation(page, 'listOrders');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByRole('button', { name: 'Error', exact: true })).toBeVisible();
  });

  test('shows the response that the proxy returns', async ({ page }) => {
    await mockCorsEndpoint(page, 'https://proxy.example.com/**', { body: [{ id: 'order-42' }], credentials: true });
    await loadOrdersApiOperation(page, 'listOrders');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    await expect(page.getByText('order-42')).toBeVisible();
  });
});

test.describe('Server variables', () => {
  test('use the default values of the variables', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');

    await expect(page.getByRole('button', { name: 'region' })).toHaveText('eu');
    await expect(page.getByRole('textbox', { name: 'version' })).toHaveAttribute('placeholder', 'v1');
  });

  test('change the URL of the request sample', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');

    await page.getByRole('button', { name: 'region' }).click();
    await page.getByRole('option', { name: 'us' }).click();
    await page.getByRole('textbox', { name: 'version' }).fill('v2');

    expect(await requestSampleUrl(page)).toBe(
      'https://proxy.example.com/https://us.orders.example.com/v2/orders/{orderId}',
    );
  });

  test('change the URL the request is sent to', async ({ page }) => {
    const proxy = await mockCorsEndpoint(page, 'https://proxy.example.com/**', { credentials: true });
    await loadOrdersApiOperation(page, 'getOrder');
    await page.getByRole('button', { name: 'region' }).click();
    await page.getByRole('option', { name: 'us' }).click();
    await page.getByRole('textbox', { name: 'version' }).fill('v2');
    await page.getByRole('textbox', { name: 'orderId' }).fill('o-1');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    expect(proxy.requests().map(request => request.url())).toEqual([
      'https://proxy.example.com/https://us.orders.example.com/v2/orders/o-1',
    ]);
  });

  test('are only shown for servers that have variables', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');
    await expect(page.getByRole('button', { name: 'Server Variables' })).toBeVisible();

    await page.getByRole('button', { name: 'Server', exact: true }).click();
    await page.getByRole('menuitemradio', { name: /Sandbox/ }).dispatchEvent('click');

    await expect(page.getByRole('button', { name: 'Server Variables' })).toBeHidden();
    expect(await requestSampleUrl(page)).toBe(
      'https://proxy.example.com/https://sandbox.orders.example.com/orders/{orderId}',
    );
  });

  test('keep their values when switching servers and back', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');
    await page.getByRole('textbox', { name: 'version' }).fill('v2');

    await page.getByRole('button', { name: 'Server', exact: true }).click();
    await page.getByRole('menuitemradio', { name: /Sandbox/ }).dispatchEvent('click');
    await page.getByRole('button', { name: 'Server', exact: true }).click();
    await page.getByRole('menuitemradio', { name: /Regional/ }).dispatchEvent('click');

    await expect(page.getByRole('textbox', { name: 'version' })).toHaveValue('v2');
    expect(await requestSampleUrl(page)).toBe(
      'https://proxy.example.com/https://eu.orders.example.com/v2/orders/{orderId}',
    );
  });

  test('keep their values when navigating to another operation', async ({ page }) => {
    await loadOrdersApiOperation(page, 'getOrder');
    await page.getByRole('button', { name: 'region' }).click();
    await page.getByRole('option', { name: 'us' }).click();

    await page.getByRole('link', { name: /^List orders/ }).click();

    await expect(page.getByRole('heading', { name: 'List orders' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'region' })).toHaveText('us');
  });
});
