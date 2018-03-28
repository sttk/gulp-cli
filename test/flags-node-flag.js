'use strict';

var expect = require('expect');
var path = require('path');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var tildify = require('../lib/shared/tildify');

var fixturesDir = path.resolve(__dirname, 'fixtures');

describe('flag: node flag', function() {
  it('Should respawn gulp by --harmony', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('gulpfiles')
      .gulp('--gulpfile', 'gulpfile-harmony.js', '--harmony')
      .run(cb);

    var gulpfile = path.resolve(fixturesDir, 'gulpfiles/gulpfile-harmony.js');

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      stdout = eraseTime(stdout);
      stdout = eraseLapse(stdout);
      stdout = stdout.replace(/PID: [0-9]+\n/, 'PID: ?\n');
      expect(stdout).toEqual(
        'Node flags detected: --harmony\n' +
        'Respawned to PID: ?\n' +
        'Using gulpfile ' + tildify(gulpfile) + '\n' +
        'Starting \'default\'...\n' +
        'default task\n' +
        'Finished \'default\' after ?\n' +
      '');
      done();
    }
  });
});
