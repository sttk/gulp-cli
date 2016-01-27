var gulp = require('gulp');
var chalk = require('chalk');

require('./custom-colors');

function fn1(cb) {}
fn1.description = 'Description of task0.';
fn1.flags = { '--flag': 'Flag of task0.' };
gulp.task('task0', fn1);

gulp.task('default', gulp.series('task0'));
gulp.task('default').description = 'Description of default.';
