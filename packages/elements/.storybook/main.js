const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const PackageImporter = require('node-sass-package-importer');
const inliner = require('sass-inline-svg');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    let svgIconFunc;
    try {
      const uiKitPath = require.resolve('@stoplight/ui-kit');
      svgIconFunc = inliner(path.dirname(uiKitPath) + '/styles/icons', {
        // run through SVGO first
        optimize: true,
        // minimal "uri" encoding is smaller than base64
        encodingFormat: 'uri',
      });
    } catch (e) {
      svgIconFunc = () => {
        throw e;
      };
    }

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
              functions: {
                'svg-icon': svgIconFunc,
              },
            },
          },
        },
      ],
    });

    return config;
  },
};
