'use strict';

var expect = require('expect');

var path = require('path');
var tildify = require('replace-homedir');
var fixturesDir = path.join(__dirname, 'fixtures/config');

var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.gulpfile', function() {

  it('Should configure with a .gulp.* file', function(done) {
    runner
      .chdir('flags/gulpfile')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 2, 2);
      expect(stdout).toEqual(
        'This gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/is/here/mygulpfile.js') +
          '\n' +
        'The current directory : ' + path.join(fixturesDir, 'flags/gulpfile')
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in the directory specified by ' +
  '\n\t--cwd', function(done) {
    runner
      .gulp('--cwd ./flags/gulpfile')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 2, 3);
      expect(stdout).toEqual(
        'This gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/is/here/mygulpfile.js') +
          '\n' +
        'The current directory : ' + path.join(fixturesDir, 'flags/gulpfile')
      );
      done(err);
    }
  });

  describe('Current dir has neither .gulp.js nor gulpfile.js', function() {
    it('Should find up project dir and use config file there', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-dir');

      runner
        .chdir(initCwd)
        .gulp('-T')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(topProj, '~'),
          'Config with ' + path.resolve(topProj, '.gulp.js'),
          '└── default  ' + path.resolve(topProj, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should change cwd to dir specified by \'--cwd\' and use config file there', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-dir');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--cwd', '../changed-prj')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(changedCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should change cwd to parent dir of gulpfile specified by \'--gulpfile\' and use the gulpfile and config file there', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-dir');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--gulpfile', '../changed-prj/gulpfile.js')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(changedCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });
  });

  describe('Current dir has gulpfile.js but not .gulp.js', function() {
    it('Should use gulpfile here', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj2');

      runner
        .chdir(initCwd)
        .gulp('-T')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Tasks for ' + tildify(path.resolve(initCwd, 'gulpfile.js'), '~'),
          '└── default  ' + path.resolve(initCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file and gulpfile in dir specified by \'--cwd\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj2');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--cwd', '../changed-prj')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(changedCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file and gulpfile in parent dir of gulpfile specified by \'--gulpfile\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj2');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--gulpfile', '../changed-prj/gulpfile.js')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(changedCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });
  });

  describe('Current dir has .gulp.js (not specifying gulpfile) and gulpfile.js', function() {
    it('Should use config file and gulpfile here', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj');

      runner
        .chdir(initCwd)
        .gulp('-T')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(initCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file here and use gulpfile in dir specified by \'--cwd\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--cwd', '../changed-prj')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file here and use gulpfile specified by \'--gulpfile\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--gulpfile', '../changed-prj/gulpfile.js')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(changedCwd, 'gulpfile.js'),
          '',
        ]);
        done(err);
      }
    });
  });

  describe('Current dir has .gulp.js (specifying gulpfile) and gulpfile-1.js', function() {
    it('Should use config file here and use gulpfile specified in config file', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj3');

      runner
        .chdir(initCwd)
        .gulp('-T')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(topProj, '~'),
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(initCwd, 'gulpfile-1.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file here, use gulpfile specified in config file and change cwd to dir specified by \'--cwd\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj3');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--cwd', '../changed-prj')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(initCwd, 'gulpfile-1.js'),
          '',
        ]);
        done(err);
      }
    });

    it('Should use config file here, use gulpfile specified in config file and change cwd to parent dir of gulpfile specified by \'--gulpfile\'', function(done) {
      var topProj = path.resolve(fixturesDir, './flags/gulpfile/top-prj');
      var initCwd = path.resolve(topProj, 'sub-prj3');
      var changedCwd = path.resolve(topProj, 'changed-prj');

      runner
        .chdir(initCwd)
        .gulp('-T', '--gulpfile', '../changed-prj/gulpfile.js')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout, 1, 3);
        expect(stdout.split(/\r\n|\r|\n/)).toEqual([
          'Working directory changed to ' + tildify(changedCwd, '~'),
          'Config with ' + path.resolve(initCwd, '.gulp.js'),
          '└── default  ' + path.resolve(initCwd, 'gulpfile-1.js'),
          '',
        ]);
        done(err);
      }
    });
  });

});

