'use strict';

var copyProps = require('copy-props');
var path = require('path');

function loadConfigFiles(configFiles, configFileOrder) {
  var config = {};

  configFileOrder.forEach(loadFile);

  function loadFile(key) {
    var filePath = configFiles[key];
    if (!filePath) {
      return;
    }

    var fileDir = path.dirname(filePath);

    copyProps(require(filePath), config, convert);

    function convert(loadedInfo) {
      switch (loadedInfo.keyChain) {
        case 'flags.gulpfile':
        case 'flags.cwd': {
          return path.resolve(fileDir, loadedInfo.value);
        }
        case 'flags.require': {
          if (!Array.isArray()) {
            return [loadedInfo.value];
          }
          return loadedInfo.value;
        }
        default: {
          return loadedInfo.value;
        }
      }
    }
  }

  return config;
}

module.exports = loadConfigFiles;
