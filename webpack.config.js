const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
       path: path.resolve(__dirname, './build'),
       filename: 'build.js',
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './build'),
        open: true,
        compress: true,
        hot: false,
        port: 8080,
        liveReload: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack template',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
         new MiniCssExtractPlugin({
            filename: 'build.css'
         }),
         new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
             // CSS
               test: /\.css$/i,
               use: [MiniCssExtractPlugin.loader, 'css-loader'],

            }
        ],
    }
}