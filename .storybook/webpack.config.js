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
  config.resolve.alias['web-worker:./worker.ts'] = path.join(__dirname, '../src/worker.shim.ts');

  return config;
};
