'use strict';

var fs = require('fs');
var path = require('path');
var yargs = require('yargs');
var Liftoff = require('liftoff');
var interpret = require('interpret');
var v8flags = require('v8flags');
var findRange = require('semver-greatest-satisfied-range');
var exit = require('./lib/shared/exit');
var tildify = require('./lib/shared/tildify');
var makeTitle = require('./lib/shared/make-title');
var completion = require('./lib/shared/completion');
var verifyDeps = require('./lib/shared/verify-dependencies');
var cliVersion = require('./package.json').version;
var getBlacklist = require('./lib/shared/get-blacklist');

var loadConfigFiles = require('./lib/shared/config/load-files');
var mergeConfigToCliFlags = require('./lib/shared/config/cli-flags');
var mergeConfigToEnvFlags = require('./lib/shared/config/env-flags');
var copyProps = require('copy-props');

// Logging functions
var log = require('./lib/shared/log/cli-log');
var logVerify = require('./lib/shared/log/verify');

var logTheme = require('./lib/shared/log/log-theme');
var logMsgs = require('./lib/shared/log/log-msgs');
var makeUsage = require('./lib/shared/log/make-usage');
var makeHelp = require('./lib/shared/log/make-help');

// Get supported ranges
var ranges = fs.readdirSync(__dirname + '/lib/versioned/');

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'gulp',
  processTitle: makeTitle('gulp', process.argv.slice(2)),
  completions: completion,
  extensions: interpret.jsVariants,
  v8flags: v8flags,
  configFiles: {
    '.gulp': {
      home: {
        path: '~',
        extensions: interpret.extensions,
      },
      cwd: {
        path: '.',
        extensions: interpret.extensions,
      },
    },
  },
});

var parser = makeUsage(yargs);
var opts = parser.argv;

// Set up event listeners for logging temporarily.
log.setup(logTheme, opts);

cli.on('require', function(name) {
  log.info(logMsgs.info.require, name);
});

cli.on('requireFail', function(name) {
  log.warn(logMsgs.warn.requireFail, name);
});

cli.on('respawn', function(flags, child) {
  log.info(logMsgs.info.respawn, flags.join(', '), child.pid);
});

function run() {
  cli.launch({
    cwd: opts.cwd,
    configPath: opts.gulpfile,
    require: opts.require,
    completion: opts.completion,
  }, handleArguments);
}

module.exports = run;

// The actual logic
function handleArguments(env) {
  var cfgLoadOrder = ['home', 'cwd'];
  var cfg = loadConfigFiles(env.configFiles['.gulp'], cfgLoadOrder);
  opts = mergeConfigToCliFlags(opts, cfg);
  env = mergeConfigToEnvFlags(env, cfg);
  logTheme = copyProps(cfg.log.theme, logTheme);
  logMsgs = copyProps(cfg.log.messages, logMsgs);

  // This translates the --continue flag in gulp
  // To the settle env variable for undertaker
  // We use the process.env so the user's gulpfile
  // Can know about the flag
  if (opts.continue) {
    process.env.UNDERTAKER_SETTLE = 'true';
  }

  // Set up event listeners for logging again after configuring.
  log.setup(logTheme, opts);

  if (opts.help) {
    makeHelp(parser).showHelp(console.log);
    exit(0);
  }

  if (opts.version) {
    var gulpVer = '';
    if (env.modulePackage && env.modulePackage.version) {
      gulpVer = env.modulePackage.version;
    }
    log.info(logMsgs.info.version, cliVersion, gulpVer);
    exit(0);
  }

  if (opts.verify) {
    var pkgPath = opts.verify !== true ? opts.verify : 'package.json';
    if (path.resolve(pkgPath) !== path.normalize(pkgPath)) {
      pkgPath = path.join(env.cwd, pkgPath);
    }
    log.info(logMsgs.info.verify, pkgPath);

    var blacklistUrl = 'https://gulpjs.com/plugins/blackList.json';
    return getBlacklist(blacklistUrl, function(err, blacklist) {
      /* istanbul ignore if */
      if (err) {
        log.error(logMsgs.error.failToGetBlacklist, err.message);
        return exit(1);
      }

      var blacklisted = verifyDeps(require(pkgPath), blacklist);

      logVerify(blacklisted);
    });
  }

  if (!env.modulePath) {
    log.error(logMsgs.error.gulpNotFound, tildify(env.cwd));
    exit(1);
  }

  if (!env.configPath) {
    log.error(logMsgs.error.gulpfileNotFound);
    exit(1);
  }

  // Chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    log.info(logMsgs.info.cwdChanged, tildify(env.cwd));
  }

  // Find the correct CLI version to run
  var range = findRange(env.modulePackage.version, ranges);

  if (!range) {
    return log.error(logMsgs.error.badGulpVersion, env.modulePackage.version);
  }

  // Load and execute the CLI version
  require(path.join(__dirname, '/lib/versioned/', range, '/'))(opts, env, cfg);
}
