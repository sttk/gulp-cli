'use strict';

var path = require('path');
var chalk = require('chalk');
var exit = require('../exit');

var customizer = require('customizer')();


// Write customizable setting here.

var colors = require('./colors');
customizer.customized.colors = colors.customized;
customizer.enumerated.colors = colors.enumerated;


function customize(appver, filepaths, cliflag) {
  /* Enable if customization by versions are needed.
  var fp = path.resolve(__dirname, '../../versioned/', appver, '/customized/');
  require(fp)(customizer);
  */

  customizer.makeCustomizable();

  for (var i = 0, n = filepaths.length; i < n; i++) {
    customizer.customize(filepaths[i], readerr);
  }

  if (typeof cliflag === 'string') {
    customizer.customize(path.resolve(process.env.INIT_CWD, cliflag), botherr);
  } else if (cliflag) {
    console.log('// Gulp configuration list\n');
    customizer.enumerate();
    console.log();
    exit(0);
  }
}

function readerr(e) {
  if (e.readerror) {
    console.error(chalk.red('Error in customizing file: ' + e.file +
      ', because: ' + e.cause.message));
  }
}

function botherr(e) {
  if (e.notfound) {
    console.error(chalk.red('No such customizing file: ' + e.file));
    return;
  }
  readerr(e);
}


module.exports = customize;
