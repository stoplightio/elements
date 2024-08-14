'use strict';
import { dirname, join } from 'path';
const { ProvidePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  stories: [join(__dirname, '../packages/**/*.stories.@(js|jsx|ts|tsx)')],
  features: {
    storyStoreV8: false,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  },
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-toolbars'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-styling-webpack'),
    getAbsolutePath('@storybook/addon-essentials'),
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

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true, // Turn off TypeScript validation
          },
        },
      ]
    });


    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

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