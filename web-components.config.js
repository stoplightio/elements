const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/web-components/index.ts',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
            stream: false,
            path: false,
            process: require.resolve('process/browser')
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
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: require.resolve('process/browser'),
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    module: true,
                    compress: {
                        join_vars: false // If true, this gives an error during runtime
                    },
                    mangle: {
                        keep_classnames: true // If false, Shows "unknown target" error during runtime
                    }
                }
            })
        ]
    },
};
