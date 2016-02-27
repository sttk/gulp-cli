'use strict';

var lab = exports.lab = require('lab').script();
var assert = require('assert');
var path = require('path');
var util = require('util');

var fixtures = require(path.join(__dirname, 'fixtures/customizer'));
var expected = require(path.join(__dirname, 'expected/customizer'));

var Customizer = require(path.resolve(__dirname, '../lib/shared/customizer'));

lab.experiment('customizer', function() {

  lab.experiment('customize', function() {

    lab.test('normal', function(done) {
      var customizer = new Customizer();

      var testcases = fixtures.customize;
      var hopeddata = expected.customize;

      testcases.forEach(function(testcase) {
        var hoped = hopeddata[testcase.name];

        customizer.customized = testcase.customized;
        customizer.makeCustomizable();
        customizer.customize(path.join(__dirname, testcase.file), function(e) {
          assert.fail(null, null, util.inspect(e));
        });

        Object.keys(hoped.customized).forEach(function(key) {
          var actual = customizer.customized[key];
          assert.deepEqual(actual, hoped.customized[key]);
        });
      });

      done();
    });

    lab.test('error - file not found', function(done) {
      var customizer = new Customizer();
      customizer.makeCustomizable();

      var file = path.join(__dirname, 'no-file-1');
      customizer.customize(file);

      customizer.customize(file, function(e) {
        assert.equal(e.notfound, true);
        assert.notEqual(e.readerror, true);
        assert.equal(e.cause, null);
        assert.equal(e.file, file);
      });
      done();
    });

    lab.test('error - invalid file', function(done) {
      var customizer = new Customizer();
      customizer.customized.aaa = {};
      customizer.makeCustomizable();

      var file = path.join(__dirname,
        'fixtures/customizer/customize-invalid.txt');

      customizer.customize(file);

      customizer.customize(file, function(e) {
        assert.notEqual(e.notfound, true);
        assert.equal(e.readerror, true);
        assert.notEqual(e.cause.message, null);
        assert.equal(e.file, file);
      });
      done();
    });
  });

  lab.experiment('enumerate', function() {

    lab.test('normal', function(done) {
      var customizer = new Customizer();

      var testcases = fixtures.enumerate;
      var hopeddata = expected.enumerate;

      testcases.forEach(function(testcase) {
        var hoped = hopeddata[testcase.name];

        customizer.customized = testcase.customized;
        customizer.enumerated = testcase.enumerated;
        customizer.makeCustomizable();

        customizer.enumerate();
        assert.deepEqual(testcase.collected, hoped.collected);
        testcase.collected.splice(0, testcase.collected.length);
      });

      done();
    });

    lab.test('error - unmatching keys', function(done) {
      var collected = [];
      var collector = function(key, value) {
        collected.push(key + ' = ' + value);
      };

      var customizer = new Customizer();
      customizer.customized = { aaa: { bbb: { ccc: 1, ddd: 9, }, }, };
      customizer.enumerated = { 'aaa.bbb': collector };
      customizer.makeCustomizable();
      customizer.enumerate();
      assert.deepEqual(collected, ['aaa.bbb.ccc = 1', 'aaa.bbb.ddd = 9']);

      collected = [];
      customizer.enumerated = { 'aaa.xxx': collector };
      customizer.enumerate();
      assert.deepEqual(collected, []);

      collected = [];
      customizer.enumerated = { 'aaa.bbb.xxx': collector };
      customizer.enumerate();
      assert.deepEqual(collected, []);

      collected = [];
      customizer.enumerated = { 'aaa.bbb.ccc.xxx': collector };
      customizer.enumerate();
      assert.deepEqual(collected, []);

      done();
    });
  });
});
