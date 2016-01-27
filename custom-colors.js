var gulp = require('gulp');
var chalk = require('chalk');

gulp._colors.tasklist.tree.branch = chalk.black;
gulp._colors.tasklist.tree.task.name = s => chalk.bold(chalk.red(s));
