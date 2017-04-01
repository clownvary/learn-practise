import webpack from 'webpack';
import extend from 'extend';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './config';
import { excludeDirs } from './vars';
import { host, port, outputDir } from '../app.config';

const config = {
  entry: {
    bundle: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      './src/index/app.jsx'
    ]
  },
  debug: true,
  devtool: '#inline-source-map',
  output: {
    path: outputDir.static,
    filename: 'js/[name].js',
    publicPath: `http://${host}:${port}/`
  },
  module: {
    loaders: [{
      test: /\.(less)$/,
      loader: 'style!css?-minimize&sourceMap!postcss!less',
      exclude: excludeDirs
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: 'src/index/index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: true,
      ___TESTING___: false,
      __PRODUCTION__: false,
      ___SERVERRENDER___: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

config.plugins = config.plugins.concat(baseConfig.plugins);
config.module.loaders = config.module.loaders.concat(baseConfig.module.loaders);

module.exports = extend({}, baseConfig, config);
