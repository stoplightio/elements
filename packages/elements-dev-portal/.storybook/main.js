const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const PackageImporter = require('node-sass-package-importer');

module.exports = {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: [
        {
          loader: require.resolve('style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 2,
          },
        },
        'resolve-url-loader',
        {
          loader: require.resolve('sass-loader'),
          options: {
            sassOptions: {
              importer: [PackageImporter()],
            },
          },
        },
      ],
    });

    return config;
  },
};
