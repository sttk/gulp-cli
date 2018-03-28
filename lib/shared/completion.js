'use strict';

var fs = require('fs');
var path = require('path');
var log = require('./log/cli-log');
var logMsgs = require('./log/log-msgs');

module.exports = function(name) {
  if (typeof name !== 'string') {
    throw new Error(log.format(logMsgs.error.noCompletionType));
  }
  var file = path.join(__dirname, '../../completion', name);
  try {
    console.log(fs.readFileSync(file, 'utf8'));
    process.exit(0);
  } catch (err) {
    log.info(logMsgs.error.unknownCompletionType, name);
    process.exit(5);
  }
};
