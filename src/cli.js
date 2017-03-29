#!/usr/bin/env node

/*
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got        = require('got');
var services   = require('./services.json');
var logSymbols = require('log-symbols');
var isDown     = false;
var promises   = [];

var upMsg = function(domain) {
  console.log(logSymbols.success, domain);
};

var downMsg = function(domain) {
  isDown = true;
  console.log(logSymbols.error, domain);
};

var finalMsg = function() {
  if (isDown) {
    console.log('\n🍺  It\'s time for a break !');
  } else {
    console.log('\n🦄  Everything is working fine !');
  }
};

var testDomain = function(subdomain) {
  var domain = subdomain + '.epfl.ch';
  promises.push(got.head(domain).then(function() {
    upMsg(domain);
  }).catch(function() {
    downMsg(domain);
  }));
};

for (var i = 0; i < services.length; i++) {
  testDomain(services[i]);
}

Promise.all(promises).then(function() {
  finalMsg();
}).catch(function(e) {
  console.log(e);
});
