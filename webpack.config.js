const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        src: './src/client/main.jsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
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
            template: './index.html',
            favicon: './src/client/assets/favicon.ico'
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
        port: 8080,
        static: {
            publicPath: '/',
            directory: path.join(__dirname, '/dist')
        },
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                secure: false,
            }
        },
        hot: true,
        open: true,
        historyApiFallback: true
    },
    devtool: 'source-map'
};