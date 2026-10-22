// Publishes the packages whose version is not on npm yet (`lerna publish from-package`), under a dist-tag that follows
// from the versions: a prerelease version (10.0.0-next.0) is published as `next`, and never as `latest`, so that
// `npm install @stoplight/elements` doesn't pick it up. Run by the release job when a commit lands on `main`.
//
//   node scripts/release.mjs [--dry-run]
//
// `--dry-run` prints what would be published, and publishes nothing.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dryRun = process.argv.includes('--dry-run');
const packages = ['elements', 'elements-core', 'elements-dev-portal'].map(dir => {
  const { name, version } = JSON.parse(readFileSync(resolve('packages', dir, 'package.json'), 'utf-8'));
  return { name, version };
});

const isPublished = ({ name, version }) => {
  try {
    return (
      execFileSync('npm', ['view', `${name}@${version}`, 'version'], { encoding: 'utf-8', stdio: 'pipe' }).trim() ===
      version
    );
  } catch (error) {
    // npm answers E404 for a version that doesn't exist. Any other failure (the network, the registry) says nothing
    // about the version, and publishing on a guess is worse than stopping.
    if (String(error.stderr).includes('E404')) return false;
    throw error;
  }
};

const unpublished = packages.filter(pkg => !isPublished(pkg));
if (unpublished.length === 0) {
  console.log('Every package version is on npm already, nothing to publish.');
  process.exit(0);
}

const prereleases = unpublished.filter(({ version }) => version.includes('-'));
if (prereleases.length !== 0 && prereleases.length !== unpublished.length) {
  console.error(
    `Refusing to publish a mix of prerelease and release versions: ${unpublished.map(p => `${p.name}@${p.version}`).join(', ')}`,
  );
  process.exit(1);
}

const distTag = prereleases.length > 0 ? 'next' : 'latest';
console.log(`Publishing ${unpublished.map(p => `${p.name}@${p.version}`).join(', ')} with the dist-tag "${distTag}"`);

if (dryRun) process.exit(0);

execFileSync(
  'npx',
  [
    'lerna',
    'publish',
    'from-package',
    '--yes',
    '--dist-tag',
    distTag,
    '--registry',
    'https://registry.npmjs.org',
    '--loglevel',
    'silly',
  ],
  { stdio: 'inherit' },
);
