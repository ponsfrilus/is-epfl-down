/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got        = require('got');
var logSymbols = require('log-symbols');
var promises   = [];
var isDown     = false;

var putDomainIsUp = function(domain) {
  console.log(logSymbols.success, domain);
};

var putDomainIsDown = function(domain) {
  isDown = true;
  console.log(logSymbols.error, domain);
};

var testSubDomain = function(subdomain) {
  var domain = subdomain + '.epfl.ch';
  promises.push(got.head(domain, {
    timeout: 7000,
    retries: 0,
  }).then(function() {
    putDomainIsUp(domain);
  }).catch(function() {
    putDomainIsDown(domain);
  }));
};

module.exports = function(domainsList) {
  if (!Array.isArray(domainsList)) {
    return Promise.reject(new TypeError('Expected an array'));
  }

  for (var i = 0; i < domainsList.length; i++) {
    testSubDomain(domainsList[i]);
  }
  return Promise.all(promises).then(function() {
    return isDown;
  });
};
