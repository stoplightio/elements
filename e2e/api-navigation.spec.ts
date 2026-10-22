import { expect, test } from './support/fixtures';
import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';
import { loadZoomApiPage, mockZoomApiDescription } from './support/zoom';

test.describe('API navigation', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
  });

  test('navigates via the table of contents from a deep link', async ({ page }) => {
    await mockZoomApiDescription(page);
    await page.goto('/zoom-api/operations/groups');
    await expect(page.getByRole('heading', { name: /List groups/i })).toBeVisible();

    await page.getByRole('link', { name: /^Create a group/ }).click();

    await expect(page).toHaveURL(/\/zoom-api\/operations\/groupCreate$/);
    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
  });

  test('keeps the sidebar links anchored to the API root', async ({ page }) => {
    await mockZoomApiDescription(page);
    await page.goto('/zoom-api/operations/groups');

    // the same link must lead to the same place, whichever page the user is on
    await expect(page.getByRole('link', { name: /^Create a group/ })).toHaveAttribute(
      'href',
      '/zoom-api/operations/groupCreate',
    );
  });

  test('supports the browser back and forward buttons', async ({ page }) => {
    await loadZoomApiPage(page);
    await page.getByText('Groups', { exact: true }).click();
    await page.getByText('Create a group', { exact: true }).click();
    await expect(page).toHaveURL(/\/zoom-api\/operations\/groupCreate$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/zoom-api$/);
    await expect(page.getByRole('heading', { name: 'Zoom API', level: 1, exact: true })).toBeVisible();

    await page.goForward();
    await expect(page).toHaveURL(/\/zoom-api\/operations\/groupCreate$/);
    await expect(page.getByRole('heading', { name: /Create a group/i })).toBeVisible();
  });
});
