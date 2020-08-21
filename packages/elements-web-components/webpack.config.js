const path = require('path');

const sassLoaderChain = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 2,
    },
  },
  'resolve-url-loader',
  'sass-loader',
];

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
    filename: 'elements.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            test: /elements.scss/,
            use: sassLoaderChain,
          },
          {
            use: [
              {
                loader: require.resolve('style-loader'),
              },
              ...sassLoaderChain,
            ],
          },
        ],
      },
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
