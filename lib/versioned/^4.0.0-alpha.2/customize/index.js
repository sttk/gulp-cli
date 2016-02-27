'use strict';

var path = require('path');
var shared = path.resolve(__dirname, '../../../shared/');

var os = require('os');
if (!os.homedir) {  // For Node version earlier than 4.0.
  os.homedir = function() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  };
}

var log = require('gulplog');
var argv = require('yargs').argv;
var chalk = require('chalk');
var exit = require(path.join(shared, 'exit'));


var customizer = require(path.join(shared, 'customize/'));

customizer.makeCustomizable();
customizer.customize(path.join(os.homedir(), '.gulprc'), readErr);
customizer.customize(path.join(process.cwd(), '.gulprc'), readErr);

if (argv.customize) {
  if (typeof argv.customize === 'string') {
    var optfile = path.resolve(process.env.INIT_CWD, argv.customize);
    customizer.customize(optfile, bothErr);
  } else {
    console.log();
    customizer.enumerate();
    console.log();
    exit(0);
  }
}


function readErr(e) {
  if (e.readerror) {
    log.error(chalk.red('Error in customizing file: ' + e.file +
      ', because: ' + e.cause.message));
  }
}

function bothErr(e) {
  if (e.notfound) {
    log.error(chalk.red('No such customizing file: ' + e.file));
    return;
  }
  readErr(e);
}


module.exports = customizer;
