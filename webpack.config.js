var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cinline-source-map',
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ],
        vendors: ['crypto-js', 'history', 'humps', 'isomorphic-fetch', 'jquery', 'lodash', 'normalizr', 'object-assign',
            'q', 'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-logger', 'redux-router', 'redux-thunk']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js')
    ],
    resolve: {
        modulesDirectories: [
            'node_modules', 'common', 'img'
        ]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, '/script/')
        }, {
            test: /\.js$/,
            loaders: ['react-hot', 'babel?optional[]=runtime'],
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'style')
            ],
            loaders: ['style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
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

