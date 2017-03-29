#!/usr/bin/env node

/*
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got        = require('got');
var logSymbols = require('log-symbols');
var isDown     = false;
var promises   = [];
var subDomains = require('./subdomain.json');

var yargs = require('yargs')
  .usage('Usage: $0 [--main] [--services] [-?, --help]')
  .option('main', {describe: 'Test the main site'})
  .option('services', {describe: 'Test all the services'})
  .help('?')
  .alias('?', 'help');

var argv = yargs.argv;

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

var iterateDomains = function() {
  for (var i = 0; i < subDomains.length; i++) {
    testDomain(subDomains[i]);
  }

  Promise.all(promises).then(function() {
    finalMsg();
  }).catch(function(e) {
    console.log(e);
  });
};

if (argv.main) {
  subDomains = subDomains.main;
  iterateDomains();
} else if (argv.services) {
  subDomains = subDomains.services;
  iterateDomains();
} else {
  yargs.showHelp();
}
