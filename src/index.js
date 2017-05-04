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

var testSubDomain = function(subdomain, opts) {
  var domain = subdomain + '.epfl.ch';
  promises.push(got.head(domain, {
    timeout: opts.timeout,
    retries: 0,
  }).then(function() {
    putDomainIsUp(domain);
  }).catch(function() {
    putDomainIsDown(domain);
  }));
};

module.exports = function(domainsList, opts) {
  if (!Array.isArray(domainsList)) {
    return Promise.reject(new TypeError('Expected an array'));
  }
  opts = opts || {};
  opts.timeout = opts.timeout || 7000;

  for (var i = 0; i < domainsList.length; i++) {
    testSubDomain(domainsList[i], opts);
  }
  return Promise.all(promises).then(function() {
    return isDown;
  });
};
