var msgDic = {
  'help.usage': {
    desc: 'Is the usage section of the help message.',
  },

  'help.flags.help': {
    desc: 'Is the description of {code:--help} flag ' +
          'in the help message.',
  },

  'help.flags.version': {
    desc: 'Is the description of {code:--version} flag ' +
          'in the help message.',
  },

  'help.flags.require': {
    desc: 'Is the description of {code:--require} flag ' +
          'in the help message.',
  },

  'help.flags.gulpfile': {
    desc: 'Is the description of {code:--gulpfile} flag ' +
          'in the help message.',
  },

  'help.flags.cwd': {
    desc: 'Is the description of {code:--cwd} flag ' +
          'in the help message.',
  },

  'help.flags.verify': {
    desc: 'Is the description of {code:--verify} flag ' +
          'in the help message.',
  },

  'help.flags.tasks': {
    desc: 'Is the description of {code:--tasks} flag ' +
          'in the help message.',
  },

  'help.flags.tasks-simple': {
    desc: 'Is the description of {code:--tasks-simple} flag ' +
          'in the help message.',
  },

  'help.flags.tasks-json': {
    desc: 'Is the description of {code:--tasks-json} flag ' +
          'in the help message.',
  },

  'help.flags.tasks-depth': {
    desc: 'Is the description of {code:--tasks-depth} flag ' +
          'in the help message.',
  },

  'help.flags.compact-tasks': {
    desc: 'Is the description of {code:--compact-tasks} flag ' +
          'in the help message.',
  },

  'help.flags.sort-tasks': {
    desc: 'Is the description of {code:--sort-tasks} flag ' +
          'in the help message.',
  },

  'help.flags.color': {
    desc: 'Is the description of {code:--color} flag ' +
          'in the help message.',
  },

  'help.flags.no-color': {
    desc: 'Is the description of {code:--no-color} flag ' +
          'in the help message.',
  },

  'help.flags.silent': {
    desc: 'Is the description of {code:--silent} flag ' +
          'in the help message.',
  },

  'help.flags.continue': {
    desc: 'Is the description of {code:--continue} flag ' +
          'in the help message.',
  },

  'help.flags.series': {
    desc: 'Is the description of {code:--series} flag ' +
          'in the help message.',
  },

  'help.flags.log-level': {
    desc: 'Is the description of {code:--log-level} flag ' +
          'in the help message.',
  },

  'tasks.gulpfile': {
    desc: 'Is the loaded gulpfile path.' +
          'This path is tildified by user home directory.',
    params: [
      {
        desc: 'The path of the loaded gulpfile.',
        example: '~/path/to/gulpfile.js',
      },
    ],
  },

  'tasks.topTask': {
    desc: 'Is the top task name and its description for {code:--tasks} flag.',
    params: [
      {
        desc: 'The branch line.',
        example: '├── ',
      },
      {
        desc: 'The task name',
        example: 'myTask',
      },
      {
        desc: 'The flag whether the task has a description.' +
              'An empty string if the task has no description.' +
              'This value must not include the character \'?\'.',
        example: '1',
      },
      {
        desc: 'Spaces to align task descriptions',
        example: '      ',
      },
      {
        desc: 'The description for the task',
        example: 'This is a task.',
      },
    ],
  },

  'tasks.option': {
    desc: 'Is the option name and its description for {code:--tasks} flag.',
    params: [
      {
        desc: 'The branch line.',
        example: '│ │ ',
      },
      {
        desc: 'The option name.',
        example: 'myOption',
      },
      {
        desc: 'The flag whether the option has a description.' +
              'An empty string or \'false\' means no description. ' +
              'This value must not include the character \'?\'.',
        example: '1',
      },
      {
        desc: 'Spaces to align task and option descriptions',
        example: '    ',
      },
      {
        desc: 'The description for the option',
        example: 'This is an option.',
      },
    ],
  },

  'tasks.childTask': {
    desc: 'Is the child task name for {code:--tasks} flag.',
    params: [
      {
        desc: 'The branch line.',
        example: '│   ├── ',
      },
      {
        desc: 'The child task name.',
        example: 'childTask',
      },
    ],
  },

  'tasksJson.gulpfile': {
    desc: 'Is the loaded gulpfile path. ' +
          'This path is tildified by user home directory.',
    params: [
      {
        desc: 'The path of the loaded gulpfile.',
        example: '~/path/to/gulpfile.js',
      },
    ],
  },

  'info.require': {
    desc: 'Is the message to inform loading a module.',
    params: [
      {
        desc: 'The module name which has been loaded.',
        example: 'babel-register',
      },
    ],
  },

  'info.respawn': {
    desc: 'Is the message to inform respawning this program.',
    params: [
      {
        desc: 'The node flag to be applied when respawning',
        example: '--harmony',
      },
      {
        desc: 'The process ID which was respawned.',
        example: '39759',
      },
    ],
  },

  'info.version': {
    desc: 'Is the message to show the current versions of gulp and CLI.',
    params: [
      {
        desc: 'The current version of gulp-cli.',
        example: '2.0.1',
      },
      {
        desc: 'The current version of gulp.',
        example: '4.0.0',
      },
    ],
  },

  'info.cwdChanged': {
    desc: 'Is the message to inform changing the current working directory.',
    params: [
      {
        desc: 'The cwd path which was changed.' +
              'This path is tildified by user home directory.',
        example: '~/path/to/cwd',
      },
    ],
  },

  'info.verify': {
    desc: 'Is the message to inform starting verification of ' +
          'the current or specified package.json path.',
    params: [
      {
        desc: 'The package path which was verified.',
        example: '/path/to/package.json',
      },
    ],
  },

  'info.verifyOk': {
    desc: 'Is the message to inform that there are no blacklisted ' +
          'plugins in the package.json file',
  },

  'info.usingGulpfile': {
    desc: 'Is the message to inform the path of the using gulpfile.',
    params: [
      {
        desc: 'The gulpfile path.' +
              'This path is tildified by user home directory.',
        example: '~/path/to/gulpfile.js',
      },
    ],
  },

  'info.taskStart': {
    desc: 'Is the message to inform starting a task',
    params: [
      {
        desc: 'The task name',
        example: 'myTask',
      },
    ],
  },

  'info.taskStop': {
    desc: 'Is the message to inform finishing a task and its duration.',
    params: [
      {
        desc: 'The task name',
        example: 'myTask',
      },
      {
        desc: 'The duration of the task',
        example: '500 ms',
      },
    ],
  },

  'warn.requireFail': {
    desc: 'Is the message to warn failing to load a module.',
    params: [
      {
        desc: 'The module name which failed to loading',
        example: 'nomodule/register',
      },
      {
        desc: 'The flag whether the cause message exists. ' +
              'An empty string or \'false\' means no cause message. ' +
              'This value must not include the character \'?\'.',
        example: 'true',
      },
      {
        desc: 'The cause message of this error',
        example: 'Error: from error module',
      },
    ],
  },

  'warn.verifyBad': {
    desc: 'Is the message to warn that there are blacklisted plugins ' +
          'in the package.json file.',
    params: [
      {
        desc: 'The blacklisted plugin names and messages.',
        example: 'gulp-badmodule: deprecated. use `goodmodule` instead.',
      },
    ],
  },

  'warn.taskNotComplete': {
    desc: 'Is the message to warn that a task is forgotten to call ' +
          'an completion callback or to return a stream, a promise ' +
          'and so on.',
    params: [
      {
        desc: 'The task names which are forgotten to signal completion.',
        example: 'myTask',
      },
    ],
  },

  'error.gulpNotFound': {
    desc: 'Is the error message when gulp was not found in cwd.',
    params: [
      {
        desc: 'The cwd path.' +
              'This path is tildified by user home directory.',
        example: '~/path/to/cwd',
      },
      {
        desc: 'The flag whether using package manager is yarn',
        example: 'false',
      },
      {
        desc: 'The flag whether using package manager is npm',
        example: 'true',
      },
    ],
  },

  'error.nodeModulesNotFound': {
    desc: 'Is the error message when node modules were not installed.',
    params: [
      {
        desc: 'The cwd path.' +
              'This path is tildified by user home directory.',
        example: '~/path/to/cwd',
      },
      {
        desc: 'The flag whether using package manager is yarn',
        example: 'false',
      },
      {
        desc: 'The flag whether using package manager is npm',
        example: 'true',
      },
    ],
  },

  'error.gulpfileNotFound': {
    desc: 'The error message when no gulpfile was found.',
  },

  'error.badGulpVersion': {
    desc: 'The error message when the current gulp version is not supported.',
    params: [
      {
        desc: 'The current gulp version',
        example: '1.0.0',
      },
    ],
  },

  'error.failToGetBlacklist': {
    desc: 'Is the error message when failed to get the blacklist json file.',
    params: [
      {
        desc: 'The cause message of the failure',
        example: 'Request failed. Status Code: 404',
      },
    ],
  },

  'error.invalidBlacklistJson': {
    desc: 'Is the error message when failed to parse the blacklist json file.',
  },

  'error.blacklistRequestFailed': {
    desc: 'Is the error message when the request to fetch a blacklist ' +
          'file returned an error status code.',
    params: [
      {
        desc: 'The error status code.',
        example: '404',
      },
    ],
  },

  'error.taskError': {
    desc: 'Is the error message of the running task.',
    params: [
      {
        desc: 'The task name running.',
        example: 'myTask',
      },
      {
        desc: 'The duration of the running task',
        example: '300 ms',
      },
      {
        desc: 'The flag whether there is a cause message. ' +
              'An empty string or \'false\' means no cause message. ' +
              'This value must not include the character \'?\'.',
        example: '1',
      },
      {
        desc: 'The cause message of this error',
        example: 'Error: unknown error.',
      },
    ],
  },

  'error.taskNotFound': {
    desc: 'Is the error message when the specified task is not found ' +
          'in gulpfile',
    params: [
      {
        desc: 'The task name which was not found.',
        example: 'myTask',
      },
    ],
  },

  'error.failToRun': {
    desc: 'Is the error message when running gulp was failed.',
    params: [
      {
        desc: 'The cause of failure.',
        example: 'An error caused in gulp.',
      },
    ],
  },

  'error.noCompletionType': {
    desc: 'Is the error message when no completion type was specified.',
  },

  'error.unknownCompletionType': {
    desc: 'Is the error message when the specified completion type ' +
          'was not found.',
    params: [
      {
        desc: 'The specified completion type.',
        example: 'bsh',
      }
    ],
  },
};
