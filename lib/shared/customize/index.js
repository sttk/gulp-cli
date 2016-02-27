'use strict';

var customizer = require('../customizer')();

var colors = require('./colors');
customizer.customized.colors = colors.customized;
customizer.enumerated.colors = colors.enumerated;

module.exports = customizer;
