'use strict';

var chalk = require('chalk');

var nocolor = function(s) {
  return s;
};

var customized = {
  tasks: {
    tree: {
      title: {
        text: nocolor,
        gulpfile: chalk.magenta,
      },
      branch: chalk.white,
      task: {
        name: chalk.cyan,
        description: chalk.white,
      },
      flag: {
        name: chalk.magenta,
        description: chalk.white,
      },
      child: {
        name: chalk.white,
      },
    },
  },
};

var enumerated = function(key, color) {
  console.log(key + ' = ' + color('###'));
};

module.exports = {
  customized: customized,
  enumerated: enumerated,
};
