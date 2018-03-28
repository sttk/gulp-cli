'use strict';

var logTheme = {
  HELP: {
    DESC: 'gray',
  },

  DESC: null,
  PATH: 'magenta',
  PID: 'magenta',
  MODULE: 'magenta',
  VERSION: null,
  TITLE: 'bold',
  TASK: 'cyan',
  OPTION: 'blue',
  DURATION: 'magenta',

  TASKS: {
    BRANCH: null,
    NAME: 'TASK',
    OPTION: 'OPTION',
    DESC: 'DESC',
    CHILD: null,
  },

  INFO: 'null',
  WARN: 'yellow',
  ERROR: 'red',

  IF: function(text) {
    var foundIndex = text.indexOf('?');
    return (foundIndex > 0) ? text.slice(foundIndex + 1) : '';
  },
};

module.exports = logTheme;
