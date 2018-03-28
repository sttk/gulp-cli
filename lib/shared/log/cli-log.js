'use strict';

var gulplog = require('gulplog');
var toConsole = require('./to-console');
var themingLog = require('theming-log');
var logTheme = require('./log-theme');
var colors = require('./colors');
var timestamp = require('time-stamp');

Object.keys(colors).forEach(function(name) {
  logTheme[name] = colors[name];
});
logTheme.TIMESTAMP = function(fmt) {
  return '[' + colors.gray(timestamp(fmt || 'HH:mm:ss')) + '] ';
};


var cliLog = {};

cliLog.setup = function(theme, opts) {
  if (opts) {
    toConsole(gulplog, opts);
  }

  ['error', 'warn', 'info', 'debug'].forEach(function(level) {
    cliLog[level] = themingLog(theme, gulplog[level]);
  });

  cliLog.format = createFormatter(theme);
};

function createFormatter(theme) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(theme);
    return themingLog.format.apply(this, args);
  };
}

cliLog.setup(logTheme);

module.exports = cliLog;
