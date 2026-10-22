import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Plugin } from 'vite';

type Dependency = {
  name: string;
  version: string;
  license: string;
  author?: string;
  repository?: string;
  text?: string;
};

const LICENSE_FILE = /^(licen[cs]e|copying|notice)(\.(md|txt|markdown))?$/i;

/** The package in `node_modules` that a module belongs to, or `undefined` for modules that are not from a dependency. */
const findPackageRoot = (moduleId: string): string | undefined => {
  const id = moduleId.split('?')[0];
  const marker = '/node_modules/';
  const index = id.lastIndexOf(marker);
  if (index === -1) return undefined;

  const rest = id.slice(index + marker.length).split('/');
  const name = rest[0].startsWith('@') ? `${rest[0]}/${rest[1]}` : rest[0];
  return id.slice(0, index + marker.length) + name;
};

const readDependency = (root: string): Dependency => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));
  const license =
    typeof pkg.license === 'string'
      ? pkg.license
      : (pkg.license?.type ?? pkg.licenses?.map((l: any) => l.type).join(' OR '));
  const repository = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  const author = typeof pkg.author === 'string' ? pkg.author : pkg.author?.name;

  const files = readdirSync(root).filter(file => LICENSE_FILE.test(file));
  const text = files.map(file => readFileSync(join(root, file), 'utf-8').trim()).join('\n\n');

  return { name: pkg.name, version: pkg.version, license, author, repository, text: text || undefined };
};

const describe = ({ name, version, license, author, repository }: Dependency) =>
  [
    `${name} ${version}`,
    `  License: ${license}`,
    author && `  Author: ${author}`,
    repository && `  Repository: ${repository}`,
  ]
    .filter(Boolean)
    .join('\n');

const NO_TEXT = 'The package does not include a license text. It declares the license above.';

/** Packages that ship the same license text (the Apache-2.0 license, for one) are listed together, with the text once. */
const render = (dependencies: Dependency[], bundleName: string) => {
  const groups = new Map<string, Dependency[]>();
  for (const dependency of dependencies) {
    const text = dependency.text ?? NO_TEXT;
    groups.set(text, [...(groups.get(text) ?? []), dependency]);
  }

  return [
    `Third-party software in ${bundleName}`,
    '',
    `${bundleName} includes the packages below. Their licenses apply to them, not to Elements (Apache-2.0).`,
    '',
    ...[...groups].flatMap(([text, members]) => ['='.repeat(80), members.map(describe).join('\n\n'), '', text, '']),
  ].join('\n');
};

/**
 * Writes the licenses of the dependencies that the build includes in its output to `<bundleName>.LICENSE.txt`, next to
 * the bundle, and points to that file from a comment at the top of the bundle. The licenses of most packages require
 * that their notice comes with copies of the software, which includes the bundled copy that ships in a package.
 *
 * Fails the build for an included package that declares no license, since nobody knows what applies to it then.
 */
export const thirdPartyLicenses = (bundleName: string): Plugin => ({
  name: 'third-party-licenses',
  generateBundle(_options, bundle) {
    const roots = new Set<string>();
    for (const chunk of Object.values(bundle)) {
      if (chunk.type !== 'chunk') continue;
      for (const [id, module] of Object.entries(chunk.modules)) {
        // modules that were removed by tree shaking have nothing rendered
        if (module.renderedLength === 0) continue;
        const root = findPackageRoot(id);
        if (root && existsSync(join(root, 'package.json'))) roots.add(root);
      }
    }

    const dependencies = [...roots]
      .map(readDependency)
      .sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version));

    const unlicensed = dependencies.filter(({ license }) => !license);
    if (unlicensed.length > 0) {
      this.error(
        `${bundleName} includes packages that declare no license: ${unlicensed.map(d => `${d.name}@${d.version}`).join(', ')}`,
      );
    }

    if (dependencies.length === 0) return;

    this.emitFile({ type: 'asset', fileName: `${bundleName}.LICENSE.txt`, source: render(dependencies, bundleName) });

    // Added here and not with the `banner` option, because the minifier removes comments that come before it
    const banner = `/*! The licenses of the packages included in this file are in ${bundleName}.LICENSE.txt */\n`;
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === 'chunk' && chunk.isEntry) chunk.code = banner + chunk.code;
    }
  },
});
