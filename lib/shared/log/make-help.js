'use strict';

var themingFormat = require('theming-log').format;
var logTheme = require('./log-theme');
var logMsgs = require('./log-msgs');

function makeHelp(parser) {
  parser.usage(themingFormat(logTheme, logMsgs.help.usage));

  Object.keys(logMsgs.help.flags).forEach(function(flag) {
    parser.describe(flag, themingFormat(logTheme, logMsgs.help.flags[flag]));
  });

  return parser;
}

module.exports = makeHelp;
