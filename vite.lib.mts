import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
import { defineConfig } from 'vite';

/**
 * Builds `src/index.ts` of a package into `dist/` as CommonJS (`index.js`) and ESM (`index.mjs`).
 *
 * Dependencies and peer dependencies are external, unless listed in `rollup.bundleDeps` of the package's package.json.
 * Type declarations are emitted separately by `tsc` (see the `build.react` script of each package).
 */
export const createLibraryConfig = (packageDir: string) => {
  const pkg = JSON.parse(readFileSync(resolve(packageDir, 'package.json'), 'utf-8'));
  const dependencies = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];
  const bundleDeps: string[] = pkg.rollup?.bundleDeps ?? [];

  const matches = (id: string, names: string[]) => names.some(name => id === name || id.startsWith(`${name}/`));

  return defineConfig({
    root: packageDir,
    // the build output is a library, not an app: don't copy a `public` folder into it
    publicDir: false,
    plugins: [optimizeLodashImports()],
    build: {
      target: 'es2020',
      minify: false,
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: resolve(packageDir, 'src/index.ts'),
        formats: ['cjs', 'es'],
        fileName: format => (format === 'es' ? 'index.mjs' : 'index.js'),
      },
      rolldownOptions: {
        external: id => matches(id, dependencies) && !matches(id, bundleDeps),
      },
    },
  });
};
