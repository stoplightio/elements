const defaultConfig = require('@stoplight/storybook-config/webpack.config');
const path = require('path');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  // Don't ignore yalc'd @stoplight packages
  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  config.node = {
    ...config.node,
    fs: 'empty',
  };

  config.output.globalObject = 'this';
  config.resolve.alias['web-worker:../worker.ts'] = path.join(process.cwd(), './src/__stories__/worker.shim.ts');

  return config;
};
