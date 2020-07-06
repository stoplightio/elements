const defaultConfig = require('@stoplight/storybook-config/webpack.config');
const inliner = require('sass-inline-svg');
const path = require('path');
const { last } = require('lodash');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  // Don't ignore yalc'd @stoplight packages
  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  config.node = {
    ...config.node,
    fs: 'empty',
  };

  last(config.module.rules).include = undefined;
  last(last(config.module.rules).use).options.sassOptions.functions['svg-icon'] = inliner(
    path.resolve('../', '../', 'node_modules', '@stoplight', 'ui-kit', 'styles', 'icons'),
    {
      optimize: true,
      encodingFormat: 'uri',
    },
  );

  return config;
};
