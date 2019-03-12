'use strict';

var expect = require('expect');
var path = require('path');
var fixturesDir = path.join(__dirname, 'fixtures/config');

var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);
var headLines = require('gulp-test-tools').headLines;
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;

describe('config: flags.cwd', function() {

  it('Should configure with a .gulp.* file', function(done) {
    runner
      .chdir('flags/cwd/dir1/dir11')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var chgWorkdirLog = headLines(stdout, 1);
      var workdir = 'flags/cwd/dir1/dir12'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      var useGulpfileLog = headLines(stdout, 2, 1);
      var gulpfile = 'flags/cwd/dir1/gulpfile.js'.replace(/\//g, path.sep);
      expect(useGulpfileLog).toMatch('Using gulpfile ');
      expect(useGulpfileLog).toMatch(gulpfile);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'cwd: ' + path.resolve(fixturesDir, 'flags/cwd/dir1/dir12') + '\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });

});
