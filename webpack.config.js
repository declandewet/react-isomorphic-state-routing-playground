
'use-strict';

var Webpack         = require('webpack');
var path            = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath       = path.resolve(__dirname, 'public', 'js');
var mainPath        = path.resolve(__dirname, 'scripts', 'main.js');

var config = {
  devtool: 'eval-sourcemap',
  entry: {
    vendor: [
      'react/addons',
      'lodash',
      'page',
      'path-to-regexp'
    ],
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      mainPath
    ]
  },
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'],
      exclude: [nodeModulesPath]
    }, {
      test: require.resolve('react/addons'),
      loader: 'expose?React'
    }, {
      test: require.resolve('lodash'),
      loader: 'expose?_'
    }]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new Webpack.optimize.OccurenceOrderPlugin(true),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.BannerPlugin('Copyright © Declan de Wet', {
      entryOnly: true,
      exclude: ['vendor.js']
    }),
    new Webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
