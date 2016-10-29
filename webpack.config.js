var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Variables
 */
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DEBUG = process.env.NODE_ENV !== 'production';


/**
 * Plugins
 */
var plugins = [];

if (DEBUG) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
} else {
  plugins.push(new UglifyJsPlugin({ minimize: true, compress: { warnings: false } }));
  plugins.push(new ExtractTextPlugin('style.css', {allChunks: true}));
}

plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity));


/**
 * Webpack settings
 */
module.exports = {

  target: 'web',

  debug: DEBUG,

  context: __dirname,

  entry: {
    app: ['./src/index.js'],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'lodash',
      'react-bootstrap'
    ],
  },

  devtool: DEBUG ? 'source-map' : '',

  output: {
    path: __dirname + '/dist',
    pathInfo: true,
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: DEBUG ? ['react-hot', 'babel'] : ['babel'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/flash-notification-react-redux')
        ],
      },
      { test: /\.scss$/, loader: DEBUG ? 'style!css!sass' : ExtractTextPlugin.extract('css!sass') },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
    ],

    noParse: /\.min\.js/
  },

  sassLoader: {
    includePaths: __dirname + '/sass',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    inline: true,
  },

  plugins: plugins,

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
