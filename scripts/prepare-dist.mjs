// Prepares `dist/` of the package in the current working directory for publishing (`publishConfig.directory`):
// writes a trimmed package.json that points at the built files, completes the relative imports in the type
// declarations, and copies README.md and LICENSE next to them.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));

const fields = [
  'name',
  'version',
  'description',
  'keywords',
  'sideEffects',
  'files',
  'author',
  'repository',
  'license',
  'browser',
  'optionalDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'dependencies',
  'dependenciesMeta',
];

const distPkg = Object.fromEntries(fields.filter(field => field in pkg).map(field => [field, pkg[field]]));

// The packages are ESM-only. `main`, `module` and `types` are for tools that don't read `exports`.
Object.assign(distPkg, {
  type: 'module',
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  exports: {
    ...Object.fromEntries(
      Object.entries(typeof pkg.exports === 'object' ? pkg.exports : {}).filter(([subpath]) => subpath !== '.'),
    ),
    '.': {
      types: './index.d.ts',
      default: './index.js',
    },
  },
});

writeFileSync(resolve('dist', 'package.json'), `${JSON.stringify(distPkg, null, 2)}\n`);

// In an ES module package TypeScript (with `node16` or `nodenext` module resolution) wants relative imports to name the
// file that is imported, so `./components/Docs` has to become `./components/Docs/index.js`. `tsc` doesn't do that.
const declarationFiles = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'node_modules' ? [] : declarationFiles(path);
    return name.endsWith('.d.ts') ? [path] : [];
  });

const specifier = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}(?:\/[^'"]*)?)\2/g;

for (const file of declarationFiles(resolve('dist'))) {
  const source = readFileSync(file, 'utf-8');
  const completed = source.replace(specifier, (match, prefix, quote, path) => {
    if (/\.(js|json|css)$/.test(path)) return match;
    const target = resolve(dirname(file), path);
    if (existsSync(`${target}.d.ts`)) return `${prefix}${quote}${path}.js${quote}`;
    if (existsSync(join(target, 'index.d.ts'))) return `${prefix}${quote}${path.replace(/\/$/, '')}/index.js${quote}`;
    throw new Error(`${file}: cannot find the declarations for ${path}`);
  });
  if (completed !== source) writeFileSync(file, completed);
}

for (const file of ['README.md', 'LICENSE']) {
  if (!existsSync(resolve(file))) {
    throw new Error(`${file} is mandatory in the package root`);
  }
  copyFileSync(resolve(file), resolve('dist', file));
}
