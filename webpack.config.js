require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV, // process.env.NODE_ENV
    entry: {
        src: './src/server/index.js'
    },
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node.modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html'
        }),
    ],
    resolve: {
        extensions: [
          '.js',
          '.jsx',
          '.graphql'
        ]
    },
    devServer: {
        static: {
            publicPath: '/',
            directory: path.join(__dirname, '/dist')
        },
        proxy: {
            '/': {
                target: 'http://localhost:3000/',
                secure: false,
            }
        },
        hot: true,
        open: true,
        historyApiFallback: true
    },
    devtool: 'source-map'
};