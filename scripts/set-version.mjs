// Writes the version of the package in the current working directory into `src/version.ts` (see `version.set`).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const { version } = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
const file = resolve('src', 'version.ts');

writeFileSync(file, readFileSync(file, 'utf-8').replace(/appVersion = '.*'/, `appVersion = '${version}'`));
