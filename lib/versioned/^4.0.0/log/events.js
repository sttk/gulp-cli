'use strict';

var log = require('../../../shared/log/cli-log');
var logMsgs = require('../../../shared/log/log-msgs');
var prettyTime = require('pretty-hrtime');

var formatError = require('../format-error');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(evt) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    var level = evt.branch ? 'debug' : 'info';
    log[level](logMsgs.info.taskStart, evt.name);
  });

  gulpInst.on('stop', function(evt) {
    var time = prettyTime(evt.duration);
    var level = evt.branch ? 'debug' : 'info';
    log[level](logMsgs.info.taskStop, evt.name, time);
  });

  gulpInst.on('error', function(evt) {
    var msg = formatError(evt);
    var hasMsg = '';
    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(evt.error) === -1) {
      hasMsg = '1';
      loggedErrors.push(evt.error);
    }

    var time = prettyTime(evt.duration);
    var level = evt.branch ? 'debug' : 'error';
    log[level](logMsgs.error.taskError, evt.name, time, hasMsg, msg);
  });
}

module.exports = logEvents;
