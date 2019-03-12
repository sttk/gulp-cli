'use strict';

var expect = require('expect');
var path = require('path');
var fixturesDir = path.join(__dirname, 'fixtures/config');

var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;

describe('config: flags.require', function() {

  it('Should require a module with a .gulp.* file', function(done) {
    runner
      .chdir(path.join(fixturesDir, 'flags/require/string'))
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      expect(eraseTime(headLines(stdout, 2))).toEqual(
        'inside test module\n' +
        'Requiring external module ../../../../test-module.js' +
      '');
      done(err);
    }
  });

  it('Should require multiple modules with a .gulp.* file', function(done) {
    runner
      .chdir(path.join(fixturesDir, 'flags/require/array'))
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      expect(eraseTime(headLines(stdout, 4))).toEqual(
        'Failed to load external module ../../../../test-error-module.js\n' +
        'Error: from error module\n' +
        'inside test module\n' +
        'Requiring external module ../../../../test-module.js' +
      '');
      done(err);
    }
  });
});

