import { createRequire } from 'node:module';
import { join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [join(import.meta.dirname, '../packages/**/*.stories.{js,jsx,ts,tsx}')],

  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs', '@storybook/addon-styling-webpack'],

  webpackFinal: config => {
    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: join(import.meta.dirname, '../tsconfig.json') }));

    config.resolve.fallback = {
      stream: false,
      path: false,
      process: false,
      url: require.resolve('url/'),
    };

    config.resolve.conditionNames = ['require', 'default'];

    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: require.resolve('process/browser'),
      }),
    );

    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

export default config;
