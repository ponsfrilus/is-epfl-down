<p align="center">
  <img alt="Is EPFL Down" src="https://raw.githubusercontent.com/epfl-devrun/is-epfl-down/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  Check if EPFL is down.
</p>

<p align="center">
  <a href="https://travis-ci.org/epfl-devrun/is-epfl-down">
    <img alt="Travis Status" src="https://travis-ci.org/epfl-devrun/is-epfl-down.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/epfl-devrun/is-epfl-down?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/epfl-devrun/is-epfl-down/badge.svg?branch=master"/>
  </a>
  <a href='https://gemnasium.com/github.com/epfl-devrun/is-epfl-down'>
    <img alt="Dependency Status" src="https://gemnasium.com/badges/github.com/epfl-devrun/is-epfl-down.svg" />
  </a>
  <a href="https://raw.githubusercontent.com/epfl-devrun/is-epfl-down/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/is-epfl-down'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/is-epfl-down.svg" />
  </a>
</p>

---

Command Line
------------

### Install

Install this globally and you'll have access to the `is-epfl-down` command
anywhere on your system.

```bash
$ npm install -g is-epfl-down
```

### Usage

```bash
$ is-epfl-down
Usage: is-epfl-down [options]

Options:
  -m, --main       Test EPFL main site
  -o, --officials  Test EPFL officials websites
  -f, --faculties  Test EPFL faculties websites
  -s, --services   Test EPFL services
  -c, --config     Test your own list of subdomain      [string]
  -t, --timeout    Milliseconds to wait for a server    [number]
  -a, --alarm      Override default alarm sound         [string]
  -v, --version    Show version number                 [boolean]
  -?, --help       Show help                           [boolean]
```

To read more about `is-epfl-down` cli, please visit the documentation: https://epfl-devrun.github.io/projects/is-epfl-down/cli.html.

API
---

### Install

```bash
$ npm install --save is-epfl-down
```

### Usage

```javascript
var isEpflDown = require('is-epfl-down');

isEpflDown(['www','actu','blogs']).then(function(isDown) {
  console.log(isDown)
  //=> false
});

isEpflDown(['unicorn'], {timeout: 1000}).then(function(isDown) {
  console.log(isDown)
  //=> true
});
```

To read more about `is-epfl-down` module, please visit the documentation: https://epfl-devrun.github.io/projects/is-epfl-down/api.html.

Screenshot
----------

![Command line](https://raw.githubusercontent.com/epfl-devrun/is-epfl-down/master/docs/readme/screenshot.png)

Contributing to Is EPFL Down
----------------------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Developers
----------

  * [Olivier Bieler](https://github.com/obieler)
  * [William Belle](https://github.com/williambelle)

License
-------

Apache License 2.0

(c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.

See the [LICENSE](LICENSE) file for more details.
