// Prints the newest stable version of a package on npm that has the given major version:
//
//   node scripts/published-version.mjs <package> <major>
//
// The compatibility checks (e2e-baseline.sh, visual-compat.sh) use it to compare with the latest release of the
// previous major version, without a version number that has to be kept up to date by hand.
import { execFileSync } from 'node:child_process';

const [name, major] = process.argv.slice(2);
if (!name || !/^\d+$/.test(major ?? '')) {
  console.error('usage: published-version.mjs <package> <major>');
  process.exit(2);
}

const versions = JSON.parse(execFileSync('npm', ['view', name, 'versions', '--json'], { encoding: 'utf-8' }));
const stable = versions
  .filter(version => new RegExp(`^${major}\\.\\d+\\.\\d+$`).test(version))
  .map(version => version.split('.').map(Number))
  .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

if (stable.length === 0) {
  console.error(`${name} has no stable ${major}.x version on npm`);
  process.exit(1);
}

console.log(stable.at(-1).join('.'));
