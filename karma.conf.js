// Karma configuration
// Generated on Fri Sep 08 2023 11:10:31 GMT+0200 (Central European Summer Time)

module.exports = function(config) {
  config.set({

    frameworks: [ 'mocha', 'webpack' ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/harness.js', watched: false },
    ],

    preprocessors: {
      'test/harness.js': ['webpack']
    },

    webpack: {},
    reporters: ['progress'],
    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
  })
}
