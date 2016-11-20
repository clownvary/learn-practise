// Karma configuration
// Generated on Fri Aug 26 2016 04:18:36 GMT+0800 (CST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            '../bower_components/angular/angular.min.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../service/*.js',
            './*.js'

        ],
        // plugins: [
        //     'karma-commonjs',
        //     'karma-babel-preprocessor',
        //     'karma-phantomjs-launcher'
        // ],
        // list of files to exclude
        exclude: ['./karma.conf.js'],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../service/*.js': ['babel','coverage'],//es6、转换.注意先是babel
            './*.spec.js': ['babel']//es6
        },
        // babelPreprocessor: {
        //     options: {
        //         presets: ['es2015']
        //     }
        // },
        coverageReporter: {
            type: 'html',
            dir: './coverage/'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9879,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
}