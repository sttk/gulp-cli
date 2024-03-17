'use strict';

var fs = require('fs');
var path = require('path');

var log = require('gulplog');
var yargs = require('yargs');
var Liftoff = require('liftoff');
var interpret = require('interpret');
var v8flags = require('v8flags');
var findRange = require('semver-greatest-satisfied-range');

var exit = require('./lib/shared/exit');
var tildify = require('./lib/shared/tildify');
var arrayFind = require('./lib/shared/array-find');
var makeTitle = require('./lib/shared/make-title');
var makeHelp = require('./lib/shared/options/make-help');
var cliOptions = require('./lib/shared/options/cli-options');
var completion = require('./lib/shared/completion');
var cliVersion = require('./package.json').version;
var toConsole = require('./lib/shared/log/to-console');
var mergeCliOpts = require('./lib/shared/config/cli-flags');

var messages = require('./messages');

// Get supported ranges
var ranges = fs.readdirSync(path.join(__dirname, '/lib/versioned/'));

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'gulp',
  processTitle: makeTitle('gulp', process.argv.slice(2)),
  completions: completion,
  extensions: interpret.jsVariants,
  v8flags: v8flags,
  configFiles: [
    {
      name: '.gulp',
      path: '.',
      extensions: interpret.extensions,
      findUp: true,
    },
    {
      name: '.gulp',
      path: '~',
      extensions: interpret.extensions,
    },
  ],
});

// var opts = {};
// var optsErr;
// try {
//   opts = parser.argv;
// } catch (e) {
//   optsErr = e;
// }
// var usage =
//   '\n' + chalk.bold('Usage:') +
//   ' gulp ' + chalk.blue('[options]') + ' tasks';

var parser = yargs
  .help(false)
  .version(false)
  .detectLocale(false)
  .showHelpOnFail(false)
  .exitProcess(false)
  .fail(function(msg) { throw new Error(msg); })
  .options(cliOptions);

var opts = parser.parse();

// Set up event listeners for logging temporarily.
toConsole(log, opts);

cli.on('preload:before', function(name) {
  log.info(messages.PRELOAD_BEFORE, name);
});

cli.on('preload:success', function(name) {
  log.info(messages.PRELOAD_SUCCESS, name);
});

cli.on('preload:failure', function(name, error) {
  log.warn(messages.PRELOAD_FAILURE, name);
  if (error) {
    log.warn(messages.PRELOAD_ERROR, error);
  }
});

cli.on('loader:success', function(name) {
  // This is needed because interpret needs to stub the .mjs extension
  // Without the .mjs require hook, rechoir blows up
  // However, we don't want to show the mjs-stub loader in the logs
  /* istanbul ignore else */
  if (path.basename(name, '.js') !== 'mjs-stub') {
    log.info(messages.LOADER_SUCCESS, name);
  }
});

cli.on('loader:failure', function(name, error) {
  log.warn(messages.LOADER_FAILURE, name);
  if (error) {
    log.warn(messages.LOADER_ERROR, error);
  }
});

cli.on('respawn', function(flags, child) {
  log.info(messages.NODE_FLAGS, flags);
  log.info(messages.RESPAWNED, child.pid);
});

function run() {
  cli.prepare({
    cwd: opts.cwd,
    configPath: opts.gulpfile,
    preload: opts.preload,
    completion: opts.completion,
  }, onPrepare);
}

module.exports = run;

function isDefined(cfg) {
  return cfg != null;
}

function onPrepare(env) {
  // We only use the first config found, which is a departure from
  // the previous implementation that merged with the home
  var cfg = arrayFind(env.config, isDefined);
  var flags = mergeCliOpts(opts, cfg);

  // Set up event listeners for again logging after configuring.
  toConsole(log, flags);

  cli.execute(env, cfg.nodeFlags, function (env) {
    onExecute(env, cfg, flags);
  });
}

// The actual logic
function onExecute(env, cfg, flags) {
  // This translates the --continue flag in gulp
  // To the settle env variable for undertaker
  // We use the process.env so the user's gulpfile
  // Can know about the flag
  if (flags.continue) {
    process.env.UNDERTAKER_SETTLE = 'true';
  }

  // if (optsErr) {
  //   log.error(msgs.error.failToParseCliOpts, optsErr.message);
  //   makeHelp(parser).showHelp(console.error);
  //   exit(1);
  // }
  // if (env.config.flags.help) {
  //   makeHelp(parser).showHelp(console.log);
  //   exit(0);
  // }
  if (flags.help) {
    parser.showHelp(console.log);
    exit(0);
  }

  // Anything that needs to print outside of the logging mechanism should use console.log
  if (flags.version) {
    console.log('CLI version:', cliVersion);
    console.log('Local version:', env.modulePackage.version || 'Unknown');
    exit(0);
  }

  if (!env.modulePath) {
    var missingNodeModules =
      fs.existsSync(path.join(env.cwd, 'package.json'))
      && !fs.existsSync(path.join(env.cwd, 'node_modules'));

    var hasYarn = fs.existsSync(path.join(env.cwd, 'yarn.lock'));
    if (missingNodeModules) {
      log.error(messages.MISSING_NODE_MODULES, tildify(env.cwd));
      if (hasYarn) {
        log.error(messages.YARN_INSTALL)
      } else {
        log.error(messages.NPM_INSTALL)
      }
    } else {
      log.error(messages.MISSING_GULP, tildify(env.cwd));
      if (hasYarn) {
        log.error(messages.YARN_INSTALL_GULP);
      } else {
        log.error(messages.NPM_INSTALL_GULP);
      }
    }
    exit(1);
  }

  if (!env.configPath) {
    log.error(messages.GULPFILE_NOT_FOUND);
    exit(1);
  }

  // Chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    log.info(messages.CWD_CHANGED, tildify(env.cwd));
  }

  // Find the correct CLI version to run
  var range = findRange(env.modulePackage.version, ranges);

  if (!range) {
    log.error(messages.UNSUPPORTED_GULP_VERSION, env.modulePackage.version);
    exit(1);
  }

  // Load and execute the CLI version
  var versionedDir = path.join(__dirname, '/lib/versioned/', range, '/');
  require(versionedDir)(env, cfg, flags);
}
