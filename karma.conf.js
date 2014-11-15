// Karma configuration
module.exports = function(config) {
  config.set({

    // base path used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/config/module.js',
      'app/**/*.js',
      'test/unit/**/*.mocha.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'text-summary',
      dir: 'coverage/'
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