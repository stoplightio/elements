import type { Page } from '@playwright/test';

import { expect, test } from './support/fixtures';
import { redirectUnpkgToLocalDistFolder } from './support/redirectUnpkg';

const PROJECT_API = 'https://stoplight.io/api/v1/projects/cHJqOjYwNjYx';

test.describe('Stoplight component', () => {
  test.beforeEach(async ({ page }) => {
    await redirectUnpkgToLocalDistFolder(page, 'elements');
  });

  test.describe('Api page', () => {
    test('loads api page correctly', async ({ page }) => {
      await loadStoplightProjectPage(page);

      const nodeResponse = page.waitForResponse(`${PROJECT_API}/nodes/**`);
      await page.getByText('To-dos', { exact: true }).click();
      await nodeResponse;

      await expect(page.getByText('https://todos.stoplight.io', { exact: true })).toBeVisible();
      await expect(
        page.getByText('https://stoplight.io/mocks/elements-examples/studio-demo/389434', { exact: true }),
      ).toBeVisible();

      /* With the change from displaying securitySchemes to security on the HttpService component,
          this is no longer visible until we update the test schema - which is in a github project:
          https://github.com/stoplightio/studio-demo - that may no longer exist.

          For now, will look at a different heading but once we update test data will revert this change.
          TODO (DKT 9/26/23) */

      // await expect(page.getByRole('heading', { name: /API Key/ })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Additional Information/ })).toBeVisible();
    });
  });

  test.describe('Operation page', () => {
    test('loads operation docs correctly', async ({ page }) => {
      await loadCreateTodoPage(page);
      await expect(page.getByRole('heading', { name: /Create Todo/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Request/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Response/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Security: API Key/ })).toBeVisible();
    });

    test('does not break on select dropdown', async ({ page }) => {
      await loadCreateTodoPage(page);
      await page.getByRole('button', { name: /request sample/i }).click();
      await expect(page.getByText('Obj-C', { exact: true })).toBeVisible();
    });

    test('displays request sample correctly', async ({ page }) => {
      await loadCreateTodoPage(page);
      await expect(page.getByLabel(/curl/i)).toBeAttached();
      await expect(page.getByLabel(/--request post/i)).toBeAttached();
    });

    test('displays example correctly', async ({ page }) => {
      await loadListTodosPage(page);
      await expect(page.getByLabel(/\[[\s\S]+\]/)).toBeAttached();
    });

    test('displays schema correctly', async ({ page }) => {
      await loadCreateTodoPage(page);
      await expect(page.getByText('id', { exact: true })).toBeVisible();
      await expect(page.getByText('completed_at', { exact: true })).toBeVisible();
    });

    test('invokes TryIt request', async ({ page }) => {
      await loadListTodosPage(page);

      await page.route(/^https:\/\/todos\.stoplight\.io\/.*/, route => {
        if (route.request().method() !== 'GET') {
          return route.continue();
        }

        return route.fulfill({
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
          },
          contentType: 'application/json',
          body: '"hello world"',
        });
      });

      const todosRequest = page.waitForRequest(/^https:\/\/todos\.stoplight\.io\/.*/);
      await page.getByRole('button', { name: /send api request/i }).click();
      await todosRequest;

      await expect(page.getByText('hello world', { exact: true })).toBeVisible();
    });

    test('mocks response correctly', async ({ page }) => {
      await loadListTodosPage(page);
      await page.getByRole('button', { name: /server/i }).click();
      await page.getByRole('menuitemradio', { name: /mock server/i }).dispatchEvent('click');

      const mockRequest = page.waitForResponse('https://stoplight.io/mocks/**');
      await page.getByRole('button', { name: /send api request/i }).click();
      await mockRequest;

      await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    });
  });

  test.describe('Schema page', () => {
    test('loads schema page correctly', async ({ page }) => {
      await loadTodoSchemaPage(page);
      await expect(page.getByRole('heading', { name: /Todo/i })).toBeVisible();
      await expect(page.getByText('id', { exact: true })).toBeVisible();
      await expect(page.getByText('completed_at', { exact: true })).toBeVisible();
    });

    test('displays example correctly', async ({ page }) => {
      await loadTodoSchemaPage(page);
      await expect(page.getByLabel(/\{[\s\S]+\}/)).toBeAttached();
    });
  });

  test.describe('Markdown page', () => {
    test('loads markdown page correctly', async ({ page }) => {
      await loadMarkdownPage(page);
      await expect(page.getByRole('heading', { name: 'Introduction', exact: true })).toBeVisible();
      await expect(
        page.getByText(
          'A primary goal of Studio is to enrich, not replace, your existing workflows. It works offline, with folders and files on your computer, just like your favorite IDEs.',
          { exact: true },
        ),
      ).toBeVisible();
    });
  });

  test('navigates via table of contents', async ({ page }) => {
    await loadStoplightProjectPage(page);
    await page.getByText('pets', { exact: true }).click();
    await page.getByText('Create a pet', { exact: true }).click();
    await expect(page.getByRole('heading', { name: /Create a pet/i })).toBeVisible();
  });
});

async function loadStoplightProjectPage(page: Page) {
  const node = page.waitForResponse(`${PROJECT_API}/nodes/**`);
  const toc = page.waitForResponse(`${PROJECT_API}/table-of-contents`);
  await page.goto('/stoplight-project');
  await Promise.all([node, toc]);
}

async function loadCreateTodoPage(page: Page) {
  await visitNode(page, 'b3A6Mzg5NDM2', 'create-todo');
}

async function loadListTodosPage(page: Page) {
  await visitNode(page, 'b3A6Mzg5NDM1', 'list-todos');
}

async function loadTodoSchemaPage(page: Page) {
  await visitNode(page, 'c2NoOjkxNDY1MDA', 'todo');
}

async function loadMarkdownPage(page: Page) {
  await visitNode(page, 'ZG9jOjE', 'introduction');
}

async function visitNode(page: Page, nodeId: string, nodeSlug: string) {
  const node = page.waitForResponse(`${PROJECT_API}/nodes/${nodeId}-${nodeSlug}`);
  const toc = page.waitForResponse(`${PROJECT_API}/table-of-contents`);
  await page.goto(`/stoplight-project/${nodeId}-${nodeSlug}`);
  await Promise.all([node, toc]);
}
