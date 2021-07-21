const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const absoluteElementsPath = resolve(__dirname, '../../packages/elements/src');
const absoluteElementsUtilsPath = resolve(__dirname, '../../packages/elements-utils/src');
const absoluteElementsCorePath = resolve(__dirname, '../../packages/elements-core/src');

console.log(absoluteElementsPath);

module.exports = {
  context: resolve(__dirname, '../src'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@stoplight/elements': absoluteElementsPath,
      '@stoplight/elements-utils': absoluteElementsUtilsPath,
      '@stoplight/elements-core': absoluteElementsCorePath,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: '../index.html' })],
  performance: {
    hints: false,
  },
};
