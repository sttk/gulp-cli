'use strict';

var fs = require('fs');

var log = require('gulplog');
var stdout = require('mute-stdout');

var format = require('theming-log').format;
var theme = require('../../shared/log/theme');
var msgs = require('../../shared/log/messages');

var exit = require('../../shared/exit');
var tildify = require('../../shared/tildify');

var logTasks = require('../../shared/log/tasks');
var logEvents = require('../^4.0.0/log/events');
var logSyncTask = require('../^4.0.0/log/sync-task');
var logTasksSimple = require('../^4.0.0/log/tasks-simple');
var checkTaskNotFound = require('../^4.0.0/log/check-task-not-found');
var registerExports = require('../../shared/register-exports');

var copyTree = require('../../shared/log/copy-tree');
var getTask = require('../^4.0.0/log/get-task');

function execute(opts, env, config) {

  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks || opts.tasksJson) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);
  logSyncTask(gulpInst, opts);

  // This is what actually loads up the gulpfile
  var exported = require(env.configPath);

  registerExports(gulpInst, exported);

  // Always unmute stdout after gulpfile is required
  stdout.unmute();

  process.nextTick(function() {
    var tree;

    if (opts.tasksSimple) {
      tree = gulpInst.tree();
      return logTasksSimple(tree.nodes);
    }
    if (opts.tasks) {
      tree = gulpInst.tree({ deep: true });
      if (config.description && typeof config.description === 'string') {
        tree.label = config.description;
      } else {
        tree.label = format(theme, msgs.tasks.gulpfile, tildify(env.configPath));
      }

      return logTasks(tree, opts, getTask(gulpInst));
    }
    if (opts.tasksJson) {
      tree = gulpInst.tree({ deep: true });
      if (config.description && typeof config.description === 'string') {
        tree.label = config.description;
      } else {
        tree.label = format(theme, msgs.tasksJson.gulpfile, tildify(env.configPath));
      }

      var output = JSON.stringify(copyTree(tree, opts));

      if (typeof opts.tasksJson === 'boolean' && opts.tasksJson) {
        return console.log(output);
      }
      return fs.writeFileSync(opts.tasksJson, output, 'utf-8');
    }
    try {
      log.info(msgs.info.usingGulpfile, tildify(env.configPath));
      var runMethod = opts.series ? 'series' : 'parallel';
      gulpInst[runMethod](toRun)(function(err) {
        if (err) {
          exit(1);
        }
      });
    } catch (err) {
      var taskName = checkTaskNotFound(err);
      if (taskName) {
        log.error(msgs.error.taskNotFound, taskName);
      } else {
        log.error(msgs.error.failToRun, err.message);
      }
      exit(1);
    }
  });
}

module.exports = execute;
