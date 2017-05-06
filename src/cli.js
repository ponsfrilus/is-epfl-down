#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var isEpflDown = require('./index.js');
var subDomains = require('./subdomain.json');

var jsonfile = require('jsonfile');
var player   = require('play-sound')();
var yargs    = require('yargs')

  // Main
  .option('m', {
    alias: 'main',
    describe: 'Test EPFL main site',
  })

  // Officials
  .option('o', {
    alias: 'officials',
    describe: 'Test EPFL officials websites',
  })

  // Faculties
  .option('f', {
    alias: 'faculties',
    describe: 'Test EPFL faculties websites',
  })

  // Services
  .option('s', {
    alias: 'services',
    describe: 'Test EPFL services',
  })

  // Config
  .option('c', {
    alias: 'config',
    describe: 'Test your own list of subdomain',
    requiresArg: true,
    type: 'string',
  })

  // Timeout
  .option('t', {
    alias: 'timeout',
    describe: 'Milliseconds to wait for a server',
    requiresArg: true,
    type: 'number',
  })

  // Alarm
  .option('a', {
    alias: 'alarm',
    describe: 'Override default alarm sound',
    requiresArg: true,
    type: 'string',
  })

  // Version
  .alias('v', 'version')
  .version(function() {
    return require('../package').version;
  })
  .describe('v', 'Show version information')

  // Help
  .help('?')
  .alias('?', 'help')
  .usage('Usage: $0 [options]');

var argv = yargs.argv;

var buildSubDomainList = function() {
  var subDomainList = [];
  if (argv['?']) {
    yargs.showHelp();
  }
  if (argv.m) {
    subDomainList = subDomainList.concat(subDomains.main);
  }
  if (argv.s) {
    subDomainList = subDomainList.concat(subDomains.services);
  }
  if (argv.f) {
    subDomainList = subDomainList.concat(subDomains.faculties);
  }
  if (argv.o) {
    subDomainList = subDomainList.concat(subDomains.officials);
  }
  if (argv.c) {
    try {
      subDomainList = subDomainList.concat(jsonfile.readFileSync(argv.c));
    } catch (e) {
      console.log(e);
    }
  }
  if (subDomainList.length === 0) {
    yargs.showHelp();
    process.exit(0);
  }
  return subDomainList;
};

var playAlarm = function() {
  if (argv.a) {
    player.play(argv.a);
  } else {
    player.play(__dirname + '/alarm.wav');
  }
};

var putResult = function(isDown) {
  if (isDown) {
    console.log('\n🍺  It\'s time for a break !');
    playAlarm();
  } else {
    console.log('\n🦄  Everything is working fine !');
  }
};

var opts = {};
if (argv.t) {
  opts.timeout = argv.t;
}

isEpflDown(buildSubDomainList(), opts).then(putResult);
