import webpack from 'webpack';
import extend from 'extend';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './config';
import { outputDir } from '../app.config';
import { includeDirs, excludeDirs } from './vars';

const config = {
  output: {
    path: outputDir.server,
    filename: 'js/[name]Server.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: `babel?${JSON.stringify({
          cacheDirectory: true
        })}`,
        include: includeDirs
      },
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
      ___TESTING___: false,
      __PRODUCTION__: true,
      ___SERVERRENDER___: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('css/[name]Server.css',
      { allChunks: true }
    )
  ]
};


config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
