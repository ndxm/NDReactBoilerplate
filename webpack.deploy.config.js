var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        index: [
            './src/index.js'
        ],
        vendors: ['crypto-js', 'history', 'humps', 'isomorphic-fetch', 'jquery', 'lodash', 'normalizr', 'object-assign',
            'q', 'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-logger', 'redux-router', 'redux-thunk']

    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name]_[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
        new ExtractTextPlugin('index_[contenthash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: '智能出题管理后台',
            template: 'index-template.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })

    ],
    resolve: {
        modulesDirectories: [
            'node_modules', 'common', 'img'
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?optional[]=runtime'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'style')
            ],
            //loaders: ['style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
            loader: ExtractTextPlugin.extract('style', 'css?modules!autoprefixer?{browsers:["> 5%", "ie 9"]}')
        }, {
            test: /\.css$/,
            include: [
                path.resolve(__dirname, 'style')
            ],
            loaders: ['style', 'css', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
        }, {
            test: /\.(svg|png|jpg|jpeg|gif)$/,
            loaders: ['file']
        }]
    }
};
