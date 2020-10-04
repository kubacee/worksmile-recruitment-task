const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/dist/plugin.js').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: "./src/main.js",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "./static/build")
    },
    devServer: {
        port: 9000,
        contentBase: './build',
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = webpackConfig;