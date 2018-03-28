'use strict';

module.exports = {
  help: {
    alias: 'h',
    type: 'boolean',
  },
  version: {
    alias: 'v',
    type: 'boolean',
  },
  require: {
    type: 'string',
    requiresArg: true,
  },
  gulpfile: {
    alias: 'f',
    type: 'string',
    requiresArg: true,
  },
  cwd: {
    type: 'string',
    requiresArg: true,
  },
  verify: {
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
  },
  'tasks-simple': {
    type: 'boolean',
  },
  'tasks-json': {
  },
  'tasks-depth': {
    alias: 'depth',
    type: 'number',
    requiresArg: true,
  },
  'compact-tasks': {
    type: 'boolean',
  },
  'sort-tasks': {
    type: 'boolean',
  },
  color: {
    type: 'boolean',
  },
  'no-color': {
    type: 'boolean',
  },
  silent: {
    alias: 'S',
    type: 'boolean',
  },
  continue: {
    type: 'boolean',
  },
  series: {
    type: 'boolean',
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    // Can't use `default` because it seems to be off by one
  },
};
