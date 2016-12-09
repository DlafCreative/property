var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var DefinePlugin = require('webpack/lib/DefinePlugin');

/** Load client global variables */
try {
  var CONFIG = require('./client.params');
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND')
    console.log('client.config.js has not been generated')
    throw e;
}

module.exports = {
  
  /** Keep reference to client params */
  clientConfig: CONFIG,

  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'app': './client/main.ts'
  },

  resolve: {
    alias: {
      materializecss: 'materialize-css/dist/css/materialize.css',
      materialize:    'materialize-css/dist/js/materialize.js',
    },
    extensions: ['', '.js', '.ts', '.less'],    
    modules: [ helpers.root('node_modules'), 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        // Load ng2 component scoped less files
        test: /^((?!styles).)*\.less$/, 
        exclude: helpers.root('node_modules'), 
        loaders: ['exports-loader?module.exports.toString()', 'css-loader', 'less-loader']
      },
      {
        // Load styles.less file
        test: /styles\.less$/, 
        exclude: helpers.root('node_modules'), 
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // Looking for our application wide styles 
        // @todo : formerly for styles.css, see if still needed (eg: loading node module css files)
        test: /^((?!materialize).)*\.css$/,
        exclude: helpers.root('client', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
        // Loading materialize-css
      { 
        test: /materialize\.css$/,   
        loaders: ['style-loader', 'css-loader'] 
      },
        // Loading SCSS
      {
        test: /\.scss$/,
        exclude: helpers.root('node_modules'),
        loaders: ['style-loader','css-loader' , 'sass-loader']
      }
    ]
  },

  plugins: [
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'] // Names of each or our entries
    }),


    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Webpack generates a lot of js/css files. Insert them manually in the 
     * index.html would be painful. This plugin simplifies creation of HTML files to serve 
     * the webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),

    /**
     * Plugin: jQuery and HammerJS
     * Description: provide jQuery to materialize-css
     */
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
          Hammer: "hammerjs/hammer"
      }),     

    /**
     * Expose client global variables
     */
    new DefinePlugin({
      'API_HOST': JSON.stringify(CONFIG.API_HOST),
      'API_PORT': JSON.stringify(CONFIG.API_PORT)
    })
  ]
};
