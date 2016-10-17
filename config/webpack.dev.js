var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
/** Webpack dev server address and port listening */
const HOST = process.env.HOST || commonConfig.clientConfig.DEV_HOST;
const PORT = process.env.PORT || commonConfig.clientConfig.DEV_PORT;

const METADATA = {
  host: HOST,
  port: PORT,
  ENV: ENV
};

module.exports = webpackMerge(commonConfig, {

  metadata: METADATA,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // Extract CSS burried inside bundles, provide it to HtmlWebpackPlugin
    new ExtractTextPlugin('[name].css')
  ],

  /**
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    host: METADATA.host,
    port: METADATA.port,
    historyApiFallback: true,
    stats: 'minimal'
  }
});