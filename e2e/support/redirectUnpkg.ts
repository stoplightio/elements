import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Page } from '@playwright/test';

const contentTypes: Record<string, string> = {
  '.js': 'application/javascript',
  '.css': 'text/css',
};

/**
 * The static-html example loads Elements from unpkg. Serve the locally built files instead,
 * so the tests exercise the code from this checkout.
 */
export async function redirectUnpkgToLocalDistFolder(page: Page, packageName: string) {
  const distDir = join(process.cwd(), 'packages', packageName, 'dist');
  const files = ['web-components.min.js', 'styles.min.css'];

  await page.route(`https://unpkg.com/@stoplight/${packageName}/*`, route => {
    const fileName = route.request().url().replace(`https://unpkg.com/@stoplight/${packageName}/`, '');
    if (!files.includes(fileName)) {
      return route.continue();
    }

    const extension = fileName.slice(fileName.lastIndexOf('.'));
    return route.fulfill({
      status: 200,
      contentType: contentTypes[extension],
      body: readFileSync(join(distDir, fileName), 'utf-8'),
    });
  });
}
