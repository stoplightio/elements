import * as path from 'path';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import tslibResolveId from 'rollup-plugin-tslib-resolve-id';

module.exports = {
  input: path.join(__dirname, 'src/client.ts'),
  plugins: [
    tslibResolveId(),
    json(),
    terser(),
    resolve({
      preferBuiltins: false,
    }),
    commonjs({
      namedExports: {
        'node_modules/lodash/lodash.js': Object.keys(require('lodash')),
        'node_modules/@stoplight/types/dist/index.js': Object.keys(require('@stoplight/types')),
        'node_modules/@stoplight/json-ref-resolver/index.js': Object.keys(require('@stoplight/json-ref-resolver')),
      },
    }),
    webWorkerLoader({
      inline: true,
    }),
    typescript({
      tsconfig: path.join(__dirname, 'tsconfig.rollup.json'),
      include: ['src/**/*.{ts,tsx}'],
    }),
  ],
  output: {
    file: path.join(__dirname, 'dist/client.js'),
    format: 'iife',
    name: 'foo',
  },
};
