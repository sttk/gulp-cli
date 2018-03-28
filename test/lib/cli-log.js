'use strict';

var expect = require('expect');
var log = require('../../lib/shared/log/cli-log');

var consoleLogBak = console.log;
var consoleErrBak = console.error;
var stdoutWriteBak = process.stdout.write;
var stderrWriteBak = process.stderr.write;

var consoleLogBuf = [];
var consoleErrBuf = [];
var stdoutWriteBuf = [];
var stderrWriteBuf = [];

var consoleLogFn = function(v) {
  consoleLogBuf.push(v);
};
var consoleErrFn = function(v) {
  consoleErrBuf.push(v);
};
var stdoutWriteFn = function(v) {
  stdoutWriteBuf.push(v);
};
var stderrWriteFn = function(v) {
  stderrWriteBuf.push(v);
};

function setupLogs() {
  console.log = consoleLogFn;
  console.error = consoleErrFn;
  process.stdout.write = stdoutWriteFn;
  process.stderr.write = stderrWriteFn;
  consoleLogBuf = [];
  consoleErrBuf = [];
  stdoutWriteBuf = [];
  stderrWriteBuf = [];
}
function putbackLogs() {
  console.log = consoleLogBak;
  console.error = consoleErrBak;
  process.stdout.write = stdoutWriteBak;
  process.stderr.write = stderrWriteBak;
}

describe('lib: log/to-console', function() {

  after(function() {
    putbackLogs();
  });

  it('Should setup with log level 4 and an empty theme', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 4 });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is an info log',
      'This is a warn log',
      'This is a debug log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should setup with log level 3 and an empty theme', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 3 });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is an info log',
      'This is a warn log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should setup with log level 2 and an empty theme', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 2 });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is a warn log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should setup with log level 1 and an empty theme', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 1 });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should setup with log level 3 when specified level is 0', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 0 });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is an info log',
      'This is a warn log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should setup with log level 3 when specified level is nullish', function(done) {
    setupLogs();
    log.setup({}, {});
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is an info log',
      'This is a warn log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an error log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should disable all level logs when tasksSimple flag is specified', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 4, tasksSimple: true });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([]);
    expect(consoleErrBuf).toEqual([]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should disable all level logs when silent flag is specified', function(done) {
    setupLogs();
    log.setup({}, { logLevel: 4, silent: true });
    log.info('This is an info log');
    log.warn('This is a warn log');
    log.error('This is an error log');
    log.debug('This is a debug log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([]);
    expect(consoleErrBuf).toEqual([]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  it('Should decorate logs with theme', function(done) {
    setupLogs();
    log.setup({
      HIGHLIGHT: function(v) {
        return '**' + v + '**';
      },
    }, { logLevel: 4 });
    log.info('This is an { HIGHLIGHT : info } log');
    log.warn('This is a {HIGHLIGHT : warn} log');
    log.error('This is an {HIGHLIGHT: error} log');
    log.debug('This is a {HIGHLIGHT: debug } log');
    putbackLogs();
    expect(consoleLogBuf).toEqual([
      'This is an **info** log',
      'This is a **warn** log',
      'This is a **debug** log',
    ]);
    expect(consoleErrBuf).toEqual([
      'This is an **error** log',
    ]);
    expect(stdoutWriteBuf.length).toEqual(0);
    expect(stderrWriteBuf.length).toEqual(0);
    done();
  });

  describe('.format', function() {
    it('Should create formetter and format strings', function(done) {
      setupLogs();
      log.setup({
        B: function(v) {
          return '**' + v + '**';
        },
      }, { logLevel: 4 });
      putbackLogs();
      expect(log.format('{B: Hello, {1}!}', 'gulp'))
        .toEqual('**Hello, gulp!**');
      done();
    });
  });
});
