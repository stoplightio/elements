const defaultConfig = require('@stoplight/storybook-config/webpack.config');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const cwd = process.cwd();

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  config.resolve.plugins = [new TsconfigPathsPlugin()];

  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(cwd, '../', '../')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          onlyCompileBundledFiles: true, // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles-boolean-defaultfalse
        },
      },
    ],
  });

  // Don't ignore yalc'd @stoplight packages
  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  config.node = {
    ...config.node,
    fs: 'empty',
  };

  return config;
};
