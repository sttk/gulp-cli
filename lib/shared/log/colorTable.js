var chalk = require('chalk');

function nosetting(s) { return s; }

module.exports = {

  tasklist: {

    tree: {
      title: nosetting,
      gulpfile: chalk.magenta,
      branch: chalk.gray,
      task: {
        name: chalk.cyan,
        description: nosetting,
      },
      flag: {
        name: chalk.cyan,
        description: nosetting,
      },
      child: {
        name: chalk.gray,
      },
    },
  },
};
