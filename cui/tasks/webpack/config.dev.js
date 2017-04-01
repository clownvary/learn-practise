import webpack from 'webpack';
import extend from 'extend';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './config';
import { outputDir, linkExtraPrefix } from '../app.config';
import { excludeDirs } from './vars';

const config = {
  watch: true,
  devtool: 'inline-source-map',
  output: {
    path: outputDir.dev,
    filename: 'js/[name].js',
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
    new HtmlWebpackPlugin({
      filename: 'index.jsp',
      inject: false,
      diff: 'dev',
      linkExtraPrefix,
      template: 'src/index/index.jade'
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __STATIC__: false,
      ___TESTING___: false,
      __PRODUCTION__: false,
      ___SERVERRENDER___: false,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin('css/[name].css',
      { allChunks: true }
    )
  ]
};

config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
