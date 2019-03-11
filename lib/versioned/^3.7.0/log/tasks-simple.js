'use strict';

/* eslint no-console: off */

function logTasksSimple(env, localGulp) {
  console.log(Object.keys(localGulp.tasks)
    .join('\n')
    .trim());
}

module.exports = logTasksSimple;
