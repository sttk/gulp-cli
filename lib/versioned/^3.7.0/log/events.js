'use strict';

var log = require('../../../shared/log/cli-log');
var logMsgs = require('../../../shared/log/log-msgs');
var prettyTime = require('pretty-hrtime');

var exit = require('../../../shared/exit');
var formatError = require('../format-error');

// Wire up logging events
function logEvents(gulpInst) {

  // Exit with 0 or 1
  var failed = false;
  process.once('exit', function(code) {
    if (code === 0 && failed) {
      exit(1);
    }
  });

  // Total hack due to poor error management in orchestrator
  gulpInst.on('err', function() {
    failed = true;
  });

  gulpInst.on('task_start', function(e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info(logMsgs.info.taskStart, e.task);
  });

  gulpInst.on('task_stop', function(e) {
    var time = prettyTime(e.hrDuration);
    log.info(logMsgs.info.taskStop, e.task, time);
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    log.error(logMsgs.error.taskError, e.task, true, time, msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(logMsgs.error.taskNotFound, err.task);
    exit(1);
  });
}

module.exports = logEvents;
