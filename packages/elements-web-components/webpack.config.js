const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    alias: {
      '@stoplight/elements': path.resolve(__dirname, '../elements/src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
