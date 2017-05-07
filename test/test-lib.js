/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should     = require('chai').should();
var rewire     = require('rewire');

var isEpflDown = rewire('../src/index.js');

describe('is-epfl-down module', function() {
  this.timeout(15000);

  before(function(done) {
    isEpflDown.__set__({
      console: {
        log: function() { /* Be quiet */ },
      },
    });
    done();
  });

  it('should return false for www.epfl.ch', function() {
    return isEpflDown(['www']).then(function(isDown) {
      isDown.should.equal(false);
    });
  });

  it('should return false for actu.epfl.ch', function() {
    return isEpflDown(['actu'], {timeout: 4000}).then(function(isDown) {
      isDown.should.equal(false);
    });
  });

  it('should return true for unicorn.epfl.ch', function() {
    return isEpflDown(['unicorn']).then(function(isDown) {
      isDown.should.equal(true);
    });
  });

  it('should throw an exception with an object in parameter', function() {
    return isEpflDown({}).then(function() {
    }).catch(function(err) {
      err.message.should.equal('Expected an array');
    });
  });

});
