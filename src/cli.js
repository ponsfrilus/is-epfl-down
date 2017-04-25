#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got        = require('got');
var logSymbols = require('log-symbols');
var jsonfile   = require('jsonfile');
var isDown     = false;
var promises   = [];
var subDomains = require('./subdomain.json');
var player     = require('play-sound')();

var yargs = require('yargs')

  // Main
  .option('m', {
    alias: 'main',
    describe: 'Test the main site',
  })

  // Officials
  .option('o', {
    alias: 'officials',
    describe: 'Test all the officials',
  })

  // Faculties
  .option('f', {
    alias: 'faculties',
    describe: 'Test all the faculties',
  })

  // Services
  .option('s', {
    alias: 'services',
    describe: 'Test all the services',
  })

  // Config
  .option('c', {
    alias: 'config',
    describe: 'Test your own list of subdomain',
    requiresArg: true,
    type: 'string',
  })

  // Version
  .alias('v', 'version')
  .version(function() {
    return require('../package').version;
  })
  .describe('v', 'show version information')

  // Help
  .help('?')
  .alias('?', 'help')
  .usage('Usage: $0 [options]');

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
    player.play(__dirname + '/alarm.wav');
  } else {
    console.log('\n🦄  Everything is working fine !');
  }
};

var testDomain = function(subdomain) {
  var domain = subdomain + '.epfl.ch';
  promises.push(got.head(domain, {
    timeout: 7000,
    retries: 0,
  }).then(function() {
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

if (argv.m) {
  subDomains = subDomains.main;
  iterateDomains();
} else if (argv.s) {
  subDomains = subDomains.services;
  iterateDomains();
} else if (argv.f) {
  subDomains = subDomains.faculties;
  iterateDomains();
} else if (argv.o) {
  subDomains = subDomains.officials;
  iterateDomains();
} else if (argv.c) {
  try {
    subDomains = jsonfile.readFileSync(argv.config);
    iterateDomains();
  } catch (e) {
    console.log(e);
  }
} else {
  yargs.showHelp();
}
