import { expect, test } from './support/fixtures';
import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';
import { mockZoomApiDescription } from './support/zoom';

test.describe('Remembered settings', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
    await mockZoomApiDescription(page);
  });

  test('remembers the request sample language after a reload', async ({ page }) => {
    await page.goto('/zoom-api/operations/userCreate');
    const languageButton = page.getByRole('button', { name: /request sample language/i });
    await expect(languageButton).toHaveText('Request Sample: Shell / cURL');

    await languageButton.click();
    // languages without a choice of libraries (such as Obj-C) are selected right away
    await page.getByRole('menuitemcheckbox', { name: 'Obj-C', exact: true }).click();
    await expect(languageButton).toHaveText('Request Sample: Obj-C');

    await page.reload();

    await expect(languageButton).toHaveText('Request Sample: Obj-C');
    await expect(page.getByLabel(/NSURLSession|NSMutableURLRequest/i)).toBeAttached();
  });

  test('remembers the request sample language on other operations', async ({ page }) => {
    await page.goto('/zoom-api/operations/userCreate');
    await page.getByRole('button', { name: /request sample language/i }).click();
    await page.getByRole('menuitemcheckbox', { name: 'Obj-C', exact: true }).click();

    await page.goto('/zoom-api/operations/groupCreate');

    await expect(page.getByRole('button', { name: /request sample language/i })).toHaveText('Request Sample: Obj-C');
  });

  test('remembers an API key after a reload', async ({ page }) => {
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'access_token' }).fill('my-secret-token');

    await page.reload();

    await expect(page.getByRole('textbox', { name: 'access_token' })).toHaveValue('my-secret-token');
  });

  test('does not remember parameter values after a reload', async ({ page }) => {
    await page.goto('/zoom-api/operations/user');
    await page.getByRole('textbox', { name: 'userId' }).fill('abc123');

    await page.reload();

    await expect(page.getByRole('textbox', { name: 'userId' })).toHaveValue('');
  });

  // The values are stored as JSON under fixed keys. Settings that users saved with earlier versions have to keep
  // working, so the format is spelled out here instead of being derived from the code.
  test.describe('storage format', () => {
    test('stores the request sample language as JSON', async ({ page }) => {
      await page.goto('/zoom-api/operations/userCreate');
      await page.getByRole('button', { name: /request sample language/i }).click();
      await page.getByRole('menuitemcheckbox', { name: 'Obj-C', exact: true }).click();

      await expect
        .poll(() => page.evaluate(() => window.localStorage.getItem('RequestSamples_selectedLanguage')))
        .toBe('"objc"');
      expect(await page.evaluate(() => window.localStorage.getItem('RequestSamples_selectedLibrary'))).toBe('""');
    });

    test('stores API keys as JSON, by name of the security scheme', async ({ page }) => {
      await page.goto('/zoom-api/operations/user');
      await page.getByRole('textbox', { name: 'access_token' }).fill('my-secret-token');

      await expect
        .poll(() => page.evaluate(() => window.localStorage.getItem('TryIt_securitySchemeValues')))
        .toBe('{"global":"my-secret-token"}');
    });

    test('reads a request sample language that was stored by an earlier version', async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('RequestSamples_selectedLanguage', '"objc"');
        window.localStorage.setItem('RequestSamples_selectedLibrary', '""');
      });

      await page.goto('/zoom-api/operations/userCreate');

      await expect(page.getByRole('button', { name: /request sample language/i })).toHaveText('Request Sample: Obj-C');
    });

    test('reads an API key that was stored by an earlier version', async ({ page }) => {
      await page.addInitScript(() =>
        window.localStorage.setItem('TryIt_securitySchemeValues', '{"global":"stored-token"}'),
      );

      await page.goto('/zoom-api/operations/user');

      await expect(page.getByRole('textbox', { name: 'access_token' })).toHaveValue('stored-token');
    });

    test('ignores stored values that are not valid JSON', async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('RequestSamples_selectedLanguage', 'not json');
        window.localStorage.setItem('TryIt_securitySchemeValues', '{broken');
      });

      await page.goto('/zoom-api/operations/user');

      await expect(page.getByRole('button', { name: /request sample language/i })).toHaveText(
        'Request Sample: Shell / cURL',
      );
      await expect(page.getByRole('textbox', { name: 'access_token' })).toHaveValue('');
    });
  });
});
