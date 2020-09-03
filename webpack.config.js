const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const fs = require('fs');
let PugFiles = [];

fs.readdirSync('./src/pug').forEach(function(elementName) {
    let array = elementName.split(".");
    // Check that is a file or folder
    if (array.length == 2) {
        PugFiles.push(
            new HtmlWebpackPlugin({
                template: `./src/pug/${ elementName }`,
                filename: `./${ array[0]}.html`,
                minify: {
                    collapseWhitespace: false,
                },
            })
        )
    }
});

module.exports = {
  entry:
    {
        main: [
            './src/js/main.js',
            './src/scss/style.scss'
        ]
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    progress: true,
    host: '0.0.0.0',
    open: true,
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                publicPath: "../",
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.pug$/,
            exclude: /node_modules/,
            loader: ['html-loader', 'pug-html-loader?pretty=true'],
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'url-loader',
                    options: { 
                        name: "[path][name].[ext]",
                        context: "src",     // 處理圖片巢狀資料夾結構
                        limit: 1024
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|ttc|ttf|otf)$/i,
            exclude: /node_modules/,
            use: {
                loader: 'url-loader',
                options: { 
                    name: "fonts/[name].[ext]",
                    limit: 1024
                }
            }
        },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
        "verbose": true,
        "cleanOnceBeforeBuildPatterns": [
            '**/*'
        ],
    }),
    new CopyWebpackPlugin([
        { from: './src/static', to: './dist/static' }
    ]),
    new ExtractTextPlugin({
        filename: "css/style.css",
    }),
    new OptimizeCssPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
    }),
    new LiveReloadPlugin(),
  ].concat(PugFiles),
};