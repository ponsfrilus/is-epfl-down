/*
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();

describe('cli.js should return result', function() {
  this.timeout(15000);
  var response;

  before(function(done) {
    var execFile = require('child_process').execFile;
    execFile('./src/cli.js', function(error, stdout) {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('result should match "time for a break" or "working fine"', function() {
    response.should.match(/time for a break|working fine/);
  });
});
