// Prepares `dist/` of the package in the current working directory for publishing (`publishConfig.directory`):
// writes a trimmed package.json that points at the built files, and copies README.md and LICENSE next to them.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));

const fields = [
  'name',
  'version',
  'description',
  'keywords',
  'main',
  'typings',
  'sideEffects',
  'files',
  'author',
  'repository',
  'license',
  'engines',
  'browser',
  'optionalDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'dependencies',
  'dependenciesMeta',
  'type',
  'exports',
];

const distPkg = Object.fromEntries(fields.filter(field => field in pkg).map(field => [field, pkg[field]]));

Object.assign(distPkg, {
  type: 'commonjs',
  main: './index.js',
  module: './index.esm.js',
  typings: pkg.typings ?? 'index.d.ts',
  exports: {
    ...(typeof pkg.exports === 'object' ? pkg.exports : {}),
    '.': {
      types: './index.d.ts',
      require: './index.js',
      import: './index.mjs',
    },
  },
});

writeFileSync(resolve('dist', 'package.json'), `${JSON.stringify(distPkg, null, 2)}\n`);

// `module` points at a `.js` file for bundlers that don't understand the `exports` map
copyFileSync(resolve('dist', 'index.mjs'), resolve('dist', 'index.esm.js'));

for (const file of ['README.md', 'LICENSE']) {
  if (!existsSync(resolve(file))) {
    throw new Error(`${file} is mandatory in the package root`);
  }
  copyFileSync(resolve(file), resolve('dist', file));
}
