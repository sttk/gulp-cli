'use strict';

var ansiColors = require('ansi-colors');
var supportsColor = require('color-support');

function noColor(message) {
  return message;
}

function hasFlag(flag) {
  return (process.argv.indexOf('--' + flag) !== -1);
}

function hasColors() {
  if (hasFlag('no-color')) {
    return false;
  }

  if (hasFlag('color')) {
    return true;
  }

  return supportsColor();
}


var colors = {};

if (hasColors()) {
  Object.keys(ansiColors).forEach(function(name) {
    colors[name] = ansiColors[name];
  });
} else {
  Object.keys(ansiColors).forEach(function(name) {
    colors[name] = noColor;
  });
}

module.exports =  colors;
