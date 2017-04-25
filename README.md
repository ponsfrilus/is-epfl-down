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
  <a href='https://gemnasium.com/github.com/epfl-devrun/is-epfl-down'>
    <img alt="Dependency Status" src="https://gemnasium.com/badges/github.com/epfl-devrun/is-epfl-down.svg" />
  </a>
  <a href="https://github.com/epfl-devrun/is-epfl-down/issues">
    <img alt="Github Issues" src="https://img.shields.io/github/issues/epfl-devrun/is-epfl-down.svg">
  </a>
  <a href="https://raw.githubusercontent.com/epfl-devrun/is-epfl-down/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/is-epfl-down'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/is-epfl-down.svg" />
  </a>
</p>

---

Install
-------

```bash
$ npm install -g is-epfl-down
```

Command Line
------------

```bash
$ is-epfl-down
Usage: is-epfl-down [options]

Options:
  -m, --main       Test the main site
  -o, --officials  Test all the officials
  -f, --faculties  Test all the faculties
  -s, --services   Test all the services
  -c, --config     Test your own list of subdomain       [string]
  -v, --version    Show version number                  [boolean]
  -?, --help       Show help                            [boolean]
```

**Testing the main site**

```bash
$ is-epfl-down -m
```

**Testing the services**

```bash
$ is-epfl-down -s
```

**Testing your own config**

```bash
$ is-epfl-down --config=/path/to/my/config.json
```

where ``config.json`` is an array of subdomain, for example:

```json
[
  "actu",
  "blogs",
  "memento",
  "wiki"
]
```

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
