import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import { includeDirs, excludeDirs, includeJadeDirs } from './vars';

const config = {
  entry: {
    // vendor: ["react", "react-dom", "react-addons-pure-render-mixin", "immutable", "bluebird"],
    bundle: ['./src/index/app.jsx']
  },
  output: {
    path: 'dist/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.json'],
    modulesDirectories: ['src', 'translations', 'test/json', 'node_modules']
  },
  resolveLoader: {
    modulesDirectories: ['tasks/loaders', 'node_modules']
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      loader: `react-hot!babel?${JSON.stringify({
        cacheDirectory: true
      })}`,
      include: includeDirs
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file?name=images/[name].[ext]',
      include: includeDirs
    },
    {
      test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]',
      exclude: excludeDirs
    },
    {
      test: /\.json?$/,
      loader: 'json?name=[path][name].[ext]',
      include: [path.resolve('test/json/')]
    },
    {
      test: /\.json$/,
      loader: 'json',
      include: [path.resolve('node_modules/react-aaui/')]
    },
    {
      test: /\.jade$/,
      loader: 'jade',
      include: includeJadeDirs
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __STATIC__: false,
      ___TESTING___: false,
      __PRODUCTION__: false,
      ___SERVERRENDER___: false
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      Promise: 'bluebird',
      PureRenderMixin: 'react-addons-pure-render-mixin'
    })
    // new CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "js/vendor.js"
    // })
  ]
};

module.exports = config;
