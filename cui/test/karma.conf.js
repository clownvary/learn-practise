const path = require('path');
const webpack = require('webpack');

const includeDirs = [
  path.resolve('src'),
  path.resolve('test'),
  path.resolve('translations'),
  path.resolve('node_modules/active.css'),
  path.resolve('node_modules/react-aaui'),
  path.resolve('node_modules/react-base-ui'),
  path.resolve('node_modules/font-awesome')
];

const exclude = /node_modules(?!\/react-aaui|\/active.css|\/react-base-ui)/;

module.exports = function karmaConfig(config) {
  config.set({
    port: 7999,
    basePath: '',
    // logLevel: config.LOG_DEBUG,
    browsers: ['PhantomJS'], // run in PhantomJS
    singleRun: false, // just run once by default
    frameworks: ['mocha', 'chai'],
    files: [
      // "../node_modules/phantomjs-polyfill/bind-polyfill.js",
      // "../node_modules/es6-promise/dist/es6-promise.js",
      'tests.webpack.js',
      { pattern: 'json/**/**/*.json', included: false, served: true, watched: false, nocache: false }
    ],
    proxies: {
      '/test/json/': '/base/json/'
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'], // report results in this format
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      entry: {
        vendor: ['react', 'react-dom', 'react-addons-pure-render-mixin', 'immutable', 'bluebird']
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.json'],
        modulesDirectories: ['src', 'translations', 'test/json', 'test/specs', 'node_modules']
      },
      resolveLoader: {
        modulesDirectories: ['tasks/loaders', 'node_modules']
      },
      module: {
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: [path.resolve('src/index')],
          loader: 'isparta'
        }],
        loaders: [{
          test: /\.(js|jsx)$/,
          include: includeDirs,
          loader: 'babel-loader'
        },
        {
          test: /\.(less|css)$/,
          exclude,
          loader: 'style!css?-minimize&sourceMap!postcss!less?sourceMap'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file?name=images/[name].[ext]',
          include: includeDirs
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file?name=fonts/[name].[ext]',
          exclude
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          include: [path.resolve('node_modules/react-aaui/')]
        },
        {
          test: /\.json?$/,
          loader: 'json?name=[path][name].[ext]',
          include: [path.resolve('test/json/')]
        }
        ]
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true
      },
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      plugins: [
        new webpack.DefinePlugin({
          __DEV__: false,
          __STATIC__: true,
          ___TESTING___: true,
          __PRODUCTION__: false,
          ___SERVERRENDER___: false
        }),
        new webpack.ProvidePlugin({
          React: 'react',
          ReactDOM: 'react-dom',
          Promise: 'bluebird',
          PureRenderMixin: 'react-addons-pure-render-mixin'
        })
      ]
    },
    webpackServer: {
      noInfo: true // please don"t spam the console when running in karma!
    },
    coverageReporter: {
      dir: path.join(process.cwd(), 'test/coverage'),
      reporters: [
        { type: 'text-summary' },
        { type: 'html', subdir: 'html' }
      ]
    }
  });
};
