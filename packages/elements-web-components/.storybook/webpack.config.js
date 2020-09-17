const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PackageImporter = require('node-sass-package-importer');
const inliner = require('sass-inline-svg');

const cwd = process.cwd();

const pkg = require.resolve(path.join(cwd, 'package.json'), {
  paths: [process.cwd()],
});

module.exports = ({ config }) => {
  config.context = cwd;
  config.mode = 'development';
  config.resolve.plugins = [new TsconfigPathsPlugin()];

  config.node = {
    fs: 'empty',
  };

  config.plugins.push(
    new webpack.DefinePlugin({
      'pkg.name': JSON.stringify(pkg.name),
      'pkg.url': JSON.stringify(pkg.url),
    }),
  );

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

  config.module.rules.push({
    test: /\.css$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [
            require('autoprefixer')({
              env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
            }),
          ],
        },
      },
    ],
  });

  let svgIconFunc;
  try {
    const uiKitPath = require.resolve('@stoplight/ui-kit');
    svgIconFunc = inliner(path.dirname(uiKitPath) + '/styles/icons', {
      // run through SVGO first
      optimize: true,
      // minimal "uri" encoding is smaller than base64
      encodingFormat: 'uri',
    });
  } catch (e) {
    svgIconFunc = () => {
      throw e;
    };
  }

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 2,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
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
          sassOptions: {
            importer: [PackageImporter()],
            functions: {
              'svg-icon': svgIconFunc,
            },
          },
        },
      },
    ],
  });

  config.module.rules.unshift({
    test: /__stories__\/.*.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  config.resolve.extensions.push('.ts', '.tsx', '.jsx', '.js');

  return config;
};
