const defaultConfig = require('@stoplight/storybook-config/webpack.config');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  return config;
};
