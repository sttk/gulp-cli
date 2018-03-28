'use strict';

var fs = require('fs');

var log = require('../../shared/log/cli-log');
var logMsgs = require('../../shared/log/log-msgs');
var stdout = require('mute-stdout');

var exit = require('../../shared/exit');
var tildify = require('../../shared/tildify');

var logTasks = require('../../shared/log/tasks');
var logEvents = require('../^4.0.0/log/events');
var logSyncTask = require('../^4.0.0/log/sync-task');
var logTasksSimple = require('../^4.0.0/log/tasks-simple');
var registerExports = require('../../shared/register-exports');

var copyTree = require('../../shared/log/copy-tree');
var checkTaskNotFound = require('../^4.0.0/log/check-task-not-found');

function execute(opts, env, config) {

  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks || opts.tasksJson) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);
  logSyncTask(gulpInst);

  // This is what actually loads up the gulpfile
  var exported = require(env.configPath);

  registerExports(gulpInst, exported);

  // Always unmute stdout after gulpfile is required
  stdout.unmute();

  process.nextTick(function() {
    var tree;

    if (opts.tasksSimple) {
      return logTasksSimple(gulpInst.tree());
    }
    if (opts.tasks) {
      tree = {};
      if (config.description && typeof config.description === 'string') {
        tree.label = config.description;
      } else {
        tree.label = log.format(logMsgs.tasks.gulpfile,
          tildify(env.configPath));
      }
      tree.nodes = gulpInst.tree({ deep: true });
      return logTasks(tree, opts, function(taskname) {
        return gulpInst.task(taskname);
      });
    }
    if (opts.tasksJson) {
      tree = {};
      if (config.description && typeof config.description === 'string') {
        tree.label = config.description;
      } else {
        tree.label = log.format(logMsgs.tasksJson.gulpfile,
          tildify(env.configPath));
      }
      tree.nodes = gulpInst.tree({ deep: true });

      var output = JSON.stringify(copyTree(tree, opts));
      if (typeof opts.tasksJson === 'boolean' && opts.tasksJson) {
        return console.log(output);
      }
      return fs.writeFileSync(opts.tasksJson, output, 'utf-8');
    }
    try {
      log.info(logMsgs.info.usingGulpfile, tildify(env.configPath));
      var runMethod = opts.series ? 'series' : 'parallel';
      gulpInst[runMethod](toRun)(function(err) {
        if (err) {
          exit(1);
        }
      });
    } catch (err) {
      var taskName = checkTaskNotFound(err);
      if (taskName) {
        log.error(logMsgs.error.taskNotFound, taskName);
      } else {
        log.error(logMsgs.error.failToRun, err.message);
      }
      exit(1);
    }
  });
}

module.exports = execute;
