exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'test/functional/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  /* Change this depending on your configuration (global/local/version) */
  seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.43.1.jar',
  chromeDriver: './node_modules/chromedriver/bin/chromedriver',

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};