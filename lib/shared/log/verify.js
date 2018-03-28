'use strict';

var exit = require('../exit');
var log = require('./cli-log');
var logMsgs = require('./log-msgs');

function logVerify(blacklisted) {
  var pluginNames = Object.keys(blacklisted);

  if (!pluginNames.length) {
    log.info(logMsgs.info.verifyOk);
    exit(0);
  }

  log.warn(logMsgs.warn.verifyBad, pluginNames.map(function(pluginName) {
    var reason = blacklisted[pluginName];
    return pluginName + ': ' + reason;
  }).join('\n'));
  exit(1);
}

module.exports = logVerify;
