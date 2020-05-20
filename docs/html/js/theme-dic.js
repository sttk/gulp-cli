var themeDic = {
  'HELP.DESC': {
    desc: 'The style for a help description.',
    params: [
      { example: 'A Help description.' }
    ],
  },
  DESC: {
    desc: 'The style for a general description.',
    params: [
      { example: 'A description.' }
    ],
  },
  PATH: {
    desc: 'The style for a file path.',
    params: [
      { example: '/path/to/file' }
    ],
  },
  PID: {
    desc: 'The style for a process ID.',
    params: [
      { example: '3125' }
    ],
  },
  MODULE: {
    desc: 'The style for a module name.',
    params: [
      { example: 'babel-register' }
    ],
  },
  VERSION: {
    desc: 'The style for a version number.',
    params: [
      { example: '4.0.2' },
    ],
  },
  TITLE: {
    desc: 'The style for a title.',
    params: [
      { example: 'A title' },
    ],
  },
  TASK: {
    desc: 'The style for a task name.',
    params: [
      { example: 'task' },
    ],
  },
  OPTION: {
    desc: 'The style for a task name.',
    params: [
      { example: '--option' },
    ],
  },
  DURATION: {
    desc: 'The style for a duration.',
    params: [
      { example: '2.12 ms', },
    ],
  },
  'TASKS.BRANCH': {
    desc: 'The style for a branch line in a task tree..',
    usage: '{TASKS.BRANCH: {1}} {TASKS.NAME: {2}}    {TASKS.DESC: {3}}',
    params: [
      { example: '├─┬' },
      { example: 'build' },
      { example: 'Build all the things!' },
    ],
  },
  'TASKS.NAME': {
    desc: 'The style for a task name in a task tree.',
    usage: '{TASKS.BRANCH: {1}} {TASKS.NAME: {2}}    {TASKS.DESC: {3}}',
    params: [
      { example: '├─┬' },
      { example: 'build' },
      { example: 'build' },
      { example: 'Build all the things!' },
    ],
  },
  'TASKS.OPTION': {
    desc: 'The style for an option in a task tree.',
    usage: '{TAKKS.BRANCH: {1}}  {TASKS.OPTION: {2}}  …{TASKS.DESC: {3}}',
    params: [
      { example: '│ │' },
      { example: '--production' },
      { example: 'compressed into single bundle' },
    ],
  },
  'TASKS.DESC': {
    desc: 'The style for a task/option description in a task tree.',
    usage: '{TASKS.BRANCH: {1}} {TASKS.NAME: {2}}    {TASKS.DESC: {3}}',
    params: [
      { example: '├─┬' },
      { example: 'build' },
      { example: 'Build all the things!' },
    ],
  },
  'TASKS.CHILD': {
    desc: 'The style for a child task name in a task tree.',
    usage: '{TASKS.BRANCH: {1}} {TASKS.CHILD: {2}}',
    params: [
      { example: '│   ├──' },
      { example: 'clean' },
    ],
  },
  INFO: {
    desc: 'The style for an information log.',
    usage: '{TIMESTAMP}{INFO: {1}}',
    params: [
      { example: 'This is an information log' },
    ],
  },
  WARN: {
    desc: 'The style for a warning log.',
    usage: '{TIMESTAMP}{WARN: {1}}',
    params: [
      { example: 'This is a warning log' },
    ],
  },
  ERROR: {
    desc: 'The style for an error log.',
    usage: '{TIMESTAMP}{ERROR: {1}}',
    params: [
      { example: 'This is an error log' },
    ],
  },
  TIMESTAMP: {
    desc: 'The style for a time stamp.',
    usage: '{TIMESTAMP}',
  },
  IF: {
    desc: 'The template for a conditional output.',
    usage: '{IF: {1}?{2}} … \\{1\\} is neither "" nor "false"\n' +
           '{IF: {3}?{4}} … \\{3\\} is either "" or "false"',
    params: [
      { example: 'true' },
      { example: 'An error message' },
      { example: 'false' },
      { example: 'Another error message' },
    ],
  },
  NOW: {
    desc: 'The function which returns the current datetime in the specified format.',
    usage: '{NOW: HH:mm:ss}',
  },
  bgblack: {
    desc: 'The function which add black background color to a text.',
    params: [
      { example: 'This is a bgblack message.' },
    ],
  },
  bgblue: {
    desc: 'The function which add blue background color to a text.',
    params: [
      { example: 'This is a bgblue message.' },
    ],
  },
  bgcyan: {
    desc: 'The function which add cyan background color to a text.',
    params: [
      { example: 'This is a bgcyan message.' },
    ],
  },
  bggreen: {
    desc: 'The function which add green background color to a text.',
    params: [
      { example: 'This is a bggreen message.' },
    ],
  },
  bgmagenta: {
    desc: 'The function which add magenta background color to a text.',
    params: [
      { example: 'This is a bgmagenta message.' },
    ],
  },
  bgred: {
    desc: 'The function which add red background color to a text.',
    params: [
      { example: 'This is a bgred message.' },
    ],
  },
  bgwhite: {
    desc: 'The function which add white background color to a text.',
    usage: '{bgwhite: {black: {1}}',
    params: [
      { example: 'This is a bgwhite message.' },
    ],
  },
  bgyellow: {
    desc: 'The function which add yellow background color to a text.',
    params: [
      { example: 'This is a bgyellow message.' },
    ],
  },
  black: {
    desc: 'The function which add black color to a text.',
    usage: '{bgwhite: {black: {1}}',
    params: [
      { example: 'This is a black message.' },
    ],
  },
  blue: {
    desc: 'The function which adds blue color to a text.',
    params: [
      { example: 'This is a blue message.' },
    ],
  },
  bold: {
    desc: 'The function which adds bold style to a text.',
    params: [
      { example: 'This is a bold message.' },
    ],
  },
  cyan: {
    desc: 'The function which adds cyan color to a text.',
    params: [
      { example: 'This is a cyan message.' },
    ],
  },
  dim: {
    desc: 'The function which adds dim effect to a text.',
    params: [
      { example: 'This is a dimmed message.' },
    ],
  },
  gray: {
    desc: 'The function which adds gray color to a text.',
    params: [
      { example: 'This is a gray message.' },
    ],
  },
  green: {
    desc: 'The function which adds green color to a text.',
    params: [
      { example: 'This is a green message.' },
    ],
  },
  grey: {
    desc: 'The function which adds grey color to a text.',
    params: [
      { example: 'This is a grey message.' },
    ],
  },
  hidden: {
    desc: 'The function which adds hidden effect to a text.',
    params: [
      { example: 'This is a hidden message.' },
    ],
  },
  inverse: {
    desc: 'The function which adds inverse effect to a text.',
    params: [
      { example: 'This is a inverse message.' },
    ],
  },
  italic: {
    desc: 'The function which adds italic style to a text.',
    params: [
      { example: 'This is a italic message.' },
    ],
  },
  magenta: {
    desc: 'The function which adds magenta color to a text.',
    params: [
      { example: 'This is a magenta message.' },
    ],
  },
  red: {
    desc: 'The function which adds red color to a text.',
    params: [
      { example: 'This is a red message.' },
    ],
  },
  reset: {
    desc: 'The function which resets color to a text.',
    usage: '{red: This is {reset: {1}}}',
    params: [
      { example: 'a reset message.' },
    ],
  },
  strikethrough: {
    desc: 'The function which adds strikethrough style to a text.',
    params: [
      { example: 'This is a strikethrough message.' },
    ],
  },
  underline: {
    desc: 'The function which adds underline color to a text.',
    usage: '{underline: {1}}',
    params: [
      { example: 'This is a underline message.' },
    ],
  },
  white: {
    desc: 'The function which adds white color to a text.',
    usage: '{BGBLACK: {WHITE: {1}}',
    params: [
      { example: 'This is a white message.' },
    ],
  },
  yellow: {
    desc: 'The function which adds yellow color to a text.',
    params: [
      { example: 'This is a yellow message.' },
    ],
  },
};
