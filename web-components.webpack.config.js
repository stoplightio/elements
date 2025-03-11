// filepath: /Users/virendra_solanke/repos/elements/web-components.webpack.config.js
const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/web-components/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      stream: false,
      path: false,
      process: require.resolve('process/browser'),
    },
  },
  performance: {
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000,
  },
  output: {
    filename: 'web-components.min.js',
    path: path.join(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-optional-chaining'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
  ],
};
