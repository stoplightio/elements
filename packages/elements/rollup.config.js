'use strict';
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');

const BASE_PATH = process.cwd();

const getConfigFile = name => {
  const filePath = path.resolve(BASE_PATH, name);
  if (fs.existsSync(path.resolve(BASE_PATH, name))) {
    return filePath;
  }

  return require.resolve(`@stoplight/scripts/${name}`);
};

const plugins = () =>
  [
    typescript({
      tsconfig: getConfigFile('tsconfig.build.json'),
      useTsconfigDeclarationDir: true,
    }),
    process.env.MINIFY ? terser() : null,
  ].filter(Boolean);

const dependencies = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];
const external = module => dependencies.some(dep => module.startsWith(dep));

module.exports = [
  {
    input: path.resolve(BASE_PATH, 'src/index.ts'),
    output: {
      entryFileNames: '[name].js',
      dir: path.resolve(BASE_PATH, 'dist'),
      format: 'cjs',
    },
    plugins: [json(), commonjs(), ...plugins()],
    external: external,
  },
  {
    input: path.resolve(BASE_PATH, 'src/index.ts'),
    output: {
      entryFileNames: '[name].mjs',
      dir: path.resolve(BASE_PATH, 'dist'),
      format: 'esm',
    },
    plugins: plugins(),
    external: external,
  },
];
