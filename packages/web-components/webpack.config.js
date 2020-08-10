const path = require('path');

const postcssOptions = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer')({
      env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
    }),
  ],
};

const sassLoaderChain = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 2,
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: postcssOptions,
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
    filename: 'bundle.js',
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
