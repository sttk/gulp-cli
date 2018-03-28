'use strict';

var https = require('https');

var concat = require('concat-stream');
var log = require('./log/cli-log');
var logMsgs = require('./log/log-msgs');

function collect(stream, cb) {
  stream.on('error', cb);
  stream.pipe(concat(onSuccess));

  function onSuccess(result) {
    cb(null, result);
  }
}

function parse(str, cb) {
  try {
    cb(null, JSON.parse(str));
  } catch (err) {
    cb(new Error(log.format(logMsgs.error.invalidBlacklistJson)));
  }
}

function getBlacklist(url, cb) {
  https.get(url, onRequest).on('error', onRequestError);

  function onRequestError(e) {
    cb(e);
  }

  function onRequest(res) {
    if (res.statusCode !== 200) {
      return cb(new Error(
        log.format(logMsgs.error.blacklistRequestFailed, res.statusCode)));
    }

    res.setEncoding('utf8');

    collect(res, onCollect);
  }

  function onCollect(err, result) {
    /* istanbul ignore if */
    if (err) {
      return cb(err);
    }

    parse(result, onParse);
  }

  function onParse(err, blacklist) {
    if (err) {
      return cb(err);
    }

    cb(null, blacklist);
  }
}

module.exports = getBlacklist;
