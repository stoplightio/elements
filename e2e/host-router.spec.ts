import { expect, test } from './support/fixtures';
import { loadZoomApiPage } from './support/zoom';

// Elements has to use the router of the app it is embedded in (instead of creating its own) when there is one.
// Only the react-vite example embeds Elements in a router of its own.
test.skip(process.env.EXAMPLE !== 'react-vite', 'needs an app that hosts Elements in its own router');
// Elements 9 only detects a host router from React Router 6, and the example uses React Router 8
test.skip(process.env.BASELINE === '1', 'only applies to the local build, see scripts/e2e-baseline.sh');

test.describe('Elements inside the router of the host app', () => {
  test('navigates through the router of the host app', async ({ page }) => {
    await loadZoomApiPage(page);
    const hostLocation = page.getByTestId('host-location');
    await expect(hostLocation).toHaveText('/zoom-api');

    await page.getByText('Groups', { exact: true }).click();
    await page.getByText('Create a group', { exact: true }).click();

    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
    await expect(hostLocation).toHaveText('/zoom-api/operations/groupCreate');
  });

  test('follows navigation of the host app', async ({ page }) => {
    await loadZoomApiPage(page);
    await page.getByText('Groups', { exact: true }).click();
    await page.getByText('Create a group', { exact: true }).click();
    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();

    await page.getByRole('link', { name: 'Stoplight Project' }).click();
    await expect(page.getByTestId('host-location')).toHaveText('/stoplight-project');
    await expect(page.getByRole('heading', { name: 'Create a group' })).toBeHidden();

    await page.goBack();
    await expect(page.getByTestId('host-location')).toHaveText('/zoom-api/operations/groupCreate');
    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
  });

  test('lets the host app link into Elements', async ({ page }) => {
    await loadZoomApiPage(page);
    await page.getByRole('link', { name: 'Stoplight Project' }).click();

    await page.getByRole('link', { name: 'Zoom API' }).click();

    await expect(page.getByTestId('host-location')).toHaveText('/zoom-api');
    await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();
  });
});
