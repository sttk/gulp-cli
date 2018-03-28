'use strict';

var expect = require('expect');
var https = require('https');
var getBlacklist = require('../../lib/shared/get-blacklist');

var isConnected = false;
function checkIfConnected(testcase, cb) {
  if (isConnected) {
    cb();
    return;
  }

  https.get('https://gulpjs.com', function(res) {
    if (res.statusCode === 200) {
      isConnected = true;
      cb();
    }
  }).on('error', function() {
    isConnected = false;
    testcase.skip();
  });
}

describe('lib: get-blacklist', function() {

  it('Should error when failed to resolve domain name', function(done) {
    checkIfConnected(this, function() {
      getBlacklist('https://gulpjs.invalid', cb);

      function cb(err) {
        // This error is caused when network is disconnected, too.
        expect(err.message).toMatch(/^getaddrinfo ENOTFOUND/);
        done();
      }
    });
  });

  it('Should error when http status is not 200.', function(done) {
    checkIfConnected(this, function() {
      getBlacklist('https://gulpjs.com/plugins/blacklist.jssss', cb);

      function cb(err) {
        expect(err.message).toEqual('Request failed. Status Code: 404');
        done();
      }
    });
  });

  it('Should error when blacklist.json is invalid JSON', function(done) {
    checkIfConnected(this, function() {
      getBlacklist('https://gulpjs.com/', cb);

      function cb(err) {
        expect(err.message).toEqual('Invalid Blacklist JSON.');
        done();
      }
    });
  });
});

