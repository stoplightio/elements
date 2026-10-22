// Installs the packages the way an app does, from the tarballs that `npm pack` makes of the built `dist` folders, and
// checks that they load and render with React 19:
//
//   npm run test.consumer              with the overrides that docs/guides/migrating-to-v10.md asks for
//   npm run test.consumer -- --plain   without them, to see if they are still needed (see below)
//
// Needs a build (`npm run build`) and the network. The overrides are needed while @stoplight/mosaic depends on
// use-resize-observer 9 (its peer dependencies stop at React 18, so npm adds a second copy of React DOM that crashes
// with React 19) and while @stoplight/markdown-viewer and @stoplight/json-schema-viewer depend on
// @stoplight/react-error-boundary 2 (which brings @sentry/react). Once those are released with fixes, `--plain` passes
// and the overrides, and this flag, can go.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const plain = process.argv.includes('--plain');
const keep = process.argv.includes('--keep');

const rootPackage = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));
const react = rootPackage.devDependencies.react;
const packages = ['elements-core', 'elements', 'elements-dev-portal'];

const work = mkdtempSync(join(tmpdir(), 'elements-consumer-'));
const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? '  ok   ' : '  FAIL '} ${message}`);
  if (!ok) failures.push(message);
};

try {
  console.log(`Installing the packages in ${work}${plain ? ' without overrides' : ' with the documented overrides'}`);

  const dependencies = { react, 'react-dom': react, jsdom: '^26.0.0' };
  for (const name of packages) {
    const dist = join(root, 'packages', name, 'dist');
    const [tarball] = JSON.parse(
      execFileSync('npm', ['pack', '--json', '--pack-destination', work], { cwd: dist, encoding: 'utf-8' }),
    );
    const manifest = JSON.parse(readFileSync(join(dist, 'package.json'), 'utf-8'));
    dependencies[manifest.name] = `file:./${tarball.filename}`;
  }

  const manifest = { name: 'elements-consumer', private: true, type: 'module', dependencies };
  if (!plain) {
    // keep in sync with "If you use npm" in docs/guides/migrating-to-v10.md
    manifest.overrides = {
      'use-resize-observer': { react: '^19.0.0', 'react-dom': '^19.0.0' },
      '@stoplight/react-error-boundary': '3.0.0',
    };
  }
  writeFileSync(join(work, 'package.json'), JSON.stringify(manifest, null, 2));
  execFileSync('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error'], { cwd: work, stdio: 'inherit' });

  // every copy of a package in node_modules, however deeply nested
  const versions = name => {
    const found = [];
    const visit = nodeModules => {
      let entries;
      try {
        entries = readdirSync(nodeModules);
      } catch {
        return;
      }
      for (const entry of entries) {
        const dir = join(nodeModules, entry);
        const packageDirs = entry.startsWith('@') ? readdirSync(dir).map(scoped => join(dir, scoped)) : [dir];
        for (const packageDir of packageDirs) {
          try {
            const pkg = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf-8'));
            if (pkg.name === name) found.push(pkg.version);
          } catch {
            // not a package
          }
          visit(join(packageDir, 'node_modules'));
        }
      }
    };
    visit(join(work, 'node_modules'));
    return found;
  };

  console.log('Checking the installed tree');
  const reactCopies = versions('react');
  const reactDomCopies = versions('react-dom');
  const sentryCopies = versions('@sentry/react');
  check(reactCopies.length === 1, `one copy of react (${reactCopies.join(', ') || 'none'})`);
  check(reactDomCopies.length === 1, `one copy of react-dom (${reactDomCopies.join(', ') || 'none'})`);
  check(sentryCopies.length === 0, `no @sentry/react (${sentryCopies.join(', ') || 'none'})`);

  console.log('Loading and rendering');
  cpSync(join(root, 'scripts/consumer-install/render.mjs'), join(work, 'render.mjs'));
  let output = '';
  try {
    output = execFileSync('node', ['render.mjs'], { cwd: work, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    output = `${error.stdout ?? ''}${error.stderr ?? ''}`;
  }
  const line = output.split('\n').find(l => l.startsWith('RESULT '));
  const result = line ? JSON.parse(line.slice('RESULT '.length)) : undefined;
  check(result?.imported === true, 'all three packages load');
  check(result?.rendered === true, 'the API component renders its description');
  check(
    result?.consoleErrors.length === 0,
    `no console errors${result?.consoleErrors.length ? `: ${result.consoleErrors[0]}` : ''}`,
  );
  if (!result) console.log(output.split('\n').slice(-8).join('\n'));
} finally {
  if (keep) console.log(`Kept ${work}`);
  else rmSync(work, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(
    `\n${failures.length} check(s) failed${plain ? ' (expected until Mosaic and the viewers are released with fixes)' : ''}`,
  );
  process.exit(1);
}
console.log('\nAll checks passed');
