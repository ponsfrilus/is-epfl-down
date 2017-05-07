/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should  = require('chai').should();
var version = require('../package').version;

describe('is-epfl-down cli', function() {
  this.timeout(15000);
  var cliOption = '-m';
  var response;

  beforeEach(function(done) {
    var execFile = require('child_process').execFile;
    execFile('./src/cli.js', [cliOption], function(error, stdout) {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('should match "working fine" with option -m', function() {
    response.should.match(/working fine/);
    cliOption = '--config=./test/testConfigGood.json';
  });

  it('should match "working fine" with a good config', function() {
    response.should.match(/working fine/);
    cliOption = '--unicorn';
  });

  it('should not match "time for a break|working fine" ' +
    'with option --unicorn', function() {
    response.should.not.match(/time for a break|working fine/);
    cliOption = '--config=./test/testConfigBad.json';
  });

  it('should not match "time for a break" with a bad config', function() {
    response.should.match(/time for a break/);
    cliOption = '-m -t 10';
  });

  it('should match "time for a break" with option -t 10', function() {
    response.should.not.match(/time for a break/);
    cliOption = '-v';
  });

  it('should match version with option -v', function() {
    response.should.equal(version + '\n');
  });
});
