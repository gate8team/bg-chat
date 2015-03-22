'use strict';

var consoleColors = require('colors'),
    config = require('./index.js');

var loadUpDefaults = function() {
  consoleColors.setTheme(config.get('console:theme'));
};

module.exports = function() {
  loadUpDefaults();
  return consoleColors;
};
