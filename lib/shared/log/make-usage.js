'use strict';

var themingFormat = require('theming-log').format;
var copyProps = require('copy-props');
var cliOptions = require('../cli-options');

var logTheme = require('./log-theme');
var logMsgs = require('./log-msgs');

function makeUsage(yargs) {
  var options = copyProps(cliOptions, {});

  var fromTo = Object.keys(logMsgs.help.flags)
    .reduce(function(obj, key) {
      obj[key] = key + '.desc';
      return obj;
    }, {});

  copyProps(logMsgs.help.flags, options, fromTo, function(src) {
    return themingFormat(logTheme, src.value);
  });

  var usage = themingFormat(logTheme, logMsgs.help.usage);

  return yargs.usage(usage, options);
}

module.exports = makeUsage;
