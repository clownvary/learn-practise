import webpack from 'webpack';
import extend from 'extend';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './config';
import { outputDir, linkExtraPrefix } from '../app.config';
import { excludeDirs } from './vars';

const config = {
  output: {
    path: outputDir.prod,
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    chunkFilename: 'js/chunk.[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('css?minimize!postcss!less', { publicPath: '../' }),
        exclude: excludeDirs
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: false,
      __PRODUCTION__: true,
      ___SERVERRENDER___: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.jsp',
      inject: false,
      diff: 'prod',
      linkExtraPrefix,
      template: 'src/index/index.jade'
    }),
    new ExtractTextPlugin('css/[name].[hash].css',
      { allChunks: true }
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};

config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
