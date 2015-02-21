// Karma configuration
module.exports = function(config) {
  config.set({

    // base path used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['mocha', 'requirejs', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'bower_components/**/*.js', included: false},
      {pattern: 'node_modules/chai/chai.js', included: false},
      {pattern: 'node_modules/chai-as-promised/lib/chai-as-promised.js', included: false},
      {pattern: 'app/app.js', included: false},
      {pattern: 'app/**/*.js', included: false},
      {pattern: 'app/**/*.html', included: false},
      {pattern: 'require-common.js', included: false},
      {pattern: 'test-main.js', included: true},
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    coverageReporter: {
      reporters:[
        {type: 'html', dir:'coverage/'},
        {type: 'text-summary'}
      ],
    },

    // test results reporter to use
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests on file changes
    autoWatch: true,

    // start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};