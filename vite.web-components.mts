import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';

const ignoredWarnings = new Set(['MODULE_LEVEL_DIRECTIVE', 'EMPTY_IMPORT_META', 'COMMONJS_VARIABLE_IN_ESM']);

const require = createRequire(import.meta.url);

/**
 * Builds `src/web-components/index.ts` of a package into `dist/web-components.min.js`:
 * a self-contained script (React and all dependencies included) that registers the web components when loaded.
 *
 * Runs after the library build, which owns `dist/`, so the output folder is not emptied.
 */
export const createWebComponentsConfig = (packageDir: string) =>
  defineConfig({
    root: packageDir,
    publicDir: false,
    resolve: {
      // `@stoplight/elements-core` and friends resolve to their sources, see `paths` in the root tsconfig.json
      tsconfigPaths: true,
    },
    define: {
      // webpack maps `global` to the browser's global object; some dependencies rely on it
      global: 'globalThis',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      target: 'es2020',
      minify: true,
      outDir: 'dist',
      emptyOutDir: false,
      chunkSizeWarningLimit: 2200,
      rolldownOptions: {
        input: resolve(packageDir, 'src/web-components/index.ts'),
        onwarn(warning, defaultHandler) {
          // Known to be harmless in this bundle: "use client" in @tanstack/react-query, an `import.meta.hot` guard in
          // react-router and a `typeof module` check in @jsdevtools/ono
          if (ignoredWarnings.has(warning.code)) return;
          defaultHandler(warning);
        },
        transform: {
          // dependencies like `@stoplight/json-schema-ref-parser` read `process.browser`, `process.cwd()`, ...
          inject: { process: require.resolve('process/browser') },
        },
        output: {
          format: 'iife',
          entryFileNames: 'web-components.min.js',
          codeSplitting: false,
        },
      },
    },
  });
