/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();

describe('cli.js should return result', function() {
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

  it('result should match "working fine" with option -m', function() {
    response.should.match(/working fine/);
    cliOption = '--config=./test/testConfigGood.json';

  });

  it('result should match "working fine" with config', function() {
    response.should.match(/working fine/);
    cliOption = '--unicorn';
  });

  it('result should not match "time for a break|working fine"' +
    'with option --unicorn', function() {
    response.should.not.match(/time for a break|working fine/);
    cliOption = '--config=./test/testConfigBad.json';
  });

  it('result should not match "time for a break"' +
    'with option --unicorn', function() {
    response.should.not.match(/time for a break/);
  });


});
