'use strict';
const { ProvidePlugin } = require('webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: { implementation: require('postcss') },
      },
    },
  ],
  babel: async () => {
    return {
      presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            targets: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
            modules: 'commonjs',
          },
        ],
      ],
    };
  },
  webpackFinal: config => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    config.resolve.fallback = {
      stream: false,
      path: false,
      process: false,
    };

    config.resolve.conditionNames = ['require', 'default'];

    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    config.plugins.push(
      new ProvidePlugin({
        process: require.resolve('process/browser'),
      }),
    );

    return config;
  },
};
