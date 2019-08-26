const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PackageImporter = require('node-sass-package-importer');
const inliner = require('sass-inline-svg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'widgets.tsx'),
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widgets.min.js',
    library: 'Stoplight',
    libraryTarget: 'var',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'widgets.styles.css',
            },
          },
          'extract-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-import'),
                require('autoprefixer')({
                  env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
                }),
              ],
            },
          },
          'resolve-url-loader',
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true,
              importer: [PackageImporter()],
              functions: {
                'svg-icon': inliner(path.resolve('node_modules', '@stoplight', 'ui-kit', 'styles', 'icons'), {
                  // run through SVGO first
                  optimize: true,
                  // minimal "uri" encoding is smaller than base64
                  encodingFormat: 'uri',
                }),
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.RUN_CONTEXT === 'analyze' ? 'server' : 'disabled' }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'widgets',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
