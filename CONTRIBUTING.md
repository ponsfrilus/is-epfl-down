Contributing
============

Welcome, so you are thinking about contributing to Is EPFL Down ?
Awesome, this a great place to start.

Setup
-----

```bash
$ git clone IS_EPFL_DOWN_REPO
$ cd is-epfl-down
$ npm install
```

Test
----

```bash
$ npm test
```

Run
---

```bash
$ ./src/cli.js
```

Release
-------

  1. Bump the correct version (``npm version [<newversion> | major | minor | patch]``)
  2. Update the file [CHANGELOG.md](CHANGELOG.md)
  3. Create the tag (``git tag -a v<version> -m "Tagging the v<version> release"``)
  4. Publish with ``npm publish``

License
-------

Apache License 2.0

(c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.

See the [LICENSE](LICENSE) file for more details.
