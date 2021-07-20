const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {implementation: require('postcss')}
      }
    }
  ],
  webpackFinal: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
};
