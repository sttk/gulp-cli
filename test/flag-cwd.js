'use strict';

var path = require('path');
var os = require('os');
var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var tildify = require('../lib/shared/tildify');

var fixturesDir = path.resolve(__dirname, 'fixtures', 'gulpfiles');

describe('flag: --cwd', function() {
  it('Should change cwd by --cwd', function(done) {
    runner({ verbose: false })
      .gulp('--cwd', fixturesDir)
      .run(cb);

    var gulpfile = path.resolve(fixturesDir, 'gulpfile.js');

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseLapse(eraseTime(stdout));
      expect(stdout).toEqual(
        'Working directory changed to ' + tildify(fixturesDir) + '\n' +
        'Using gulpfile ' + tildify(gulpfile) + '\n' +
        'Starting \'default\'...\n' +
        'Starting \'test1\'...\n' +
        'Starting \'noop\'...\n' +
        'Finished \'noop\' after ?\n' +
        'Finished \'test1\' after ?\n' +
        'Starting \'test3\'...\n' +
        'Starting \'described\'...\n' +
        'Finished \'described\' after ?\n' +
        'Finished \'test3\' after ?\n' +
        'Starting \'noop\'...\n' +
        'Finished \'noop\' after ?\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });

  it('Should show error when changed cwd has no gulp', function(done) {
    var cwd = os.tmpdir();

    runner({ verbose: false })
      .gulp('--cwd', cwd)
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stderr = eraseTime(stderr);
      expect(stderr).toEqual(
        'Local gulp not found in ' + cwd + '\n' +
        'Try running: npm install gulp\n' +
      '');
      expect(stdout).toEqual('');
      done();
    }
  });
});
