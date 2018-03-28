'use strict';

function checkTaskNotFound(err) {
  var result = /^Task never defined: +(.*)$/.exec(err.message);
  if (result) {
    return result[1];
  }
}

module.exports = checkTaskNotFound;
