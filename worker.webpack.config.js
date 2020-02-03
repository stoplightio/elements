const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'client.ts'),
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
    libraryTarget: 'commonjs',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          onlyCompileBundledFiles: true,
          compilerOptions: {
            module: 'commonjs',
          },
        },
      },
    ],
  },
};
