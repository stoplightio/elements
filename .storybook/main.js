'use strict';
import { dirname, join } from 'path';
const { ProvidePlugin } = require('webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  stories: [join(__dirname, '../packages/**/*.stories.{js,jsx,ts,tsx}')],
  features: {
    storyStoreV7: false
  },

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-toolbars'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-styling-webpack'),
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

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
