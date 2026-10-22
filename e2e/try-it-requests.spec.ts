import { expect, test } from './support/fixtures';
import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';
import { mockZoomApi, mockZoomApiDescription } from './support/zoom';

test.describe('TryIt requests', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
    await mockZoomApiDescription(page);
  });

  test('puts path parameters and the API key into the request URL', async ({ page }) => {
    const zoom = await mockZoomApi(page, { id: 'abc123' });
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'access_token' }).fill('my-secret-token');
    await page.getByRole('textbox', { name: 'userId' }).fill('abc123');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    const [request] = zoom.requests();
    expect(request.method()).toBe('GET');
    expect(request.url()).toBe('https://api.zoom.us/v2/users/abc123?access_token=my-secret-token');
  });

  test('puts query parameters into the request URL', async ({ page }) => {
    const zoom = await mockZoomApi(page, { users: [] });
    await page.goto('/zoom-api/operations/users');
    await page.getByRole('textbox', { name: 'page_size' }).fill('5');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    const url = new URL(zoom.requests()[0].url());
    expect(url.origin + url.pathname).toBe('https://api.zoom.us/v2/users');
    expect(url.searchParams.get('page_size')).toBe('5');
  });

  test('shows the response of the API', async ({ page }) => {
    await mockZoomApi(page, { id: 'abc123', first_name: 'Ada' });
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'userId' }).fill('abc123');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    await expect(page.getByText('Ada')).toBeVisible();
  });

  test('sends the request body as JSON', async ({ page }) => {
    const zoom = await mockZoomApi(page, { id: 'new-user' });
    await page.goto('/zoom-api/operations/userCreate');

    await page.getByRole('button', { name: 'Send API Request' }).click();

    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    const [request] = zoom.requests();
    expect(request.method()).toBe('POST');
    expect(new URL(request.url()).pathname).toBe('/v2/users');
    expect(request.headers()['content-type']).toContain('application/json');
    expect(() => JSON.parse(request.postData() ?? '')).not.toThrow();
  });

  test('uses the API key in the request sample', async ({ page }) => {
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'access_token' }).fill('my-secret-token');
    await page.getByRole('textbox', { name: 'userId' }).fill('abc123');

    await expect(page.getByLabel(/curl/i)).toContainText('/users/abc123?access_token=my-secret-token');
  });
});
