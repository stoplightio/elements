const defaultConfig = require('@stoplight/storybook-config/webpack.config');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  // Don't ignore yalc'd @stoplight packages
  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  return config;
};
