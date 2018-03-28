'use strict';

var gulp = require('gulp');

gulp.task('default', function(done) {
  throw new Error('Default');
  done();
});

gulp.task('notcomplete', function() {
});
