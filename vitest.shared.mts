import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export const createConfig = (name: string) =>
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
      snapshotSerializers: ['enzyme-to-json/serializer'],
      reporters: [
        'default',
        ['junit', { suiteName: name, outputFile: path.resolve(root, `test-results/${name}/results.xml`) }],
      ],
      coverage: {
        provider: 'v8',
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
