'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var tildify = require('../lib/shared/tildify');

var headLines = require('gulp-test-tools').headLines;
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures', 'config', 'falsy');

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

describe('config: falsy logs', function() {

  it('Should output no error line.', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'no-gulpfile')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done();
    }
  });

  it('Should output no info line', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(skipLines(stdout, 1)).toEqual(
        'Stop clean\n' +
        'Stop build\n' +
        'Stop default\n' +
      '');
      done(err);
    }
  });
});
