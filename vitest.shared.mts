import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

type Thresholds = { statements: number; branches: number; functions: number; lines: number };

/**
 * @param thresholds the lowest coverage `npm run test.prod` accepts. Set a few points below the current coverage, so
 * that dropping it fails the build, and raise it when the coverage grows.
 */
export const createConfig = (name: string, thresholds: Thresholds) =>
  defineConfig({
    resolve: {
      alias: [
        { find: /^@stoplight\/elements-core$/, replacement: path.resolve(root, 'packages/elements-core/src') },
        { find: '@test-utils', replacement: path.resolve(root, 'test-utils') },
      ],
    },
    test: {
      name,
      environment: 'jsdom',
      globals: true,
      setupFiles: [path.resolve(root, 'setupTests.ts')],
      include: ['src/**/*.{spec,test}.{ts,tsx,js,jsx}'],
      testTimeout: 10000,
      server: { deps: { inline: [/@stoplight\//] } },
      environmentOptions: { jsdom: { url: 'http://localhost/' } },
      reporters: [
        'default',
        ['junit', { suiteName: name, outputFile: path.resolve(root, `test-results/${name}/results.xml`) }],
      ],
      coverage: {
        provider: 'v8',
        thresholds,
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/__tests__/**',
          '**/__fixtures__/**',
          '**/__stories__/**',
          '**/__mocks__/**',
          '**/index.ts',
          '**/types.ts',
          '**/*story*.{ts,tsx}',
          '**/*.stories.{ts,tsx}',
        ],
      },
    },
  });
