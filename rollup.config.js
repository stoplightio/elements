import config from '@stoplight/scripts/rollup.config';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

config.plugins.push(
  commonjs(),
  resolve({
    only: ['json-schema-merge-allof', /lodash(?:-es)?\/?.*/],
  }),
  webWorkerLoader({
    inline: true,
  }),
);

export default config;
