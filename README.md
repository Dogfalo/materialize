<p align="center">
  <a href="http://materializecss.com/">
    <img src="http://materializecss.com/res/materialize.svg" width="150">
  </a>

  <h3 align="center">MaterializeCSS</h3>

  <p align="center">
    Materialize, a CSS Framework based on material design.
    <br>
    <a href="http://materializecss.com/"><strong>-- Browse the docs --</strong></a>
    <br>
    <br>
    <a href="https://travis-ci.org/Dogfalo/materialize">
      <img src="https://travis-ci.org/Dogfalo/materialize.svg?branch=master" alt="Travis CI badge">
    </a>
    <a href="https://badge.fury.io/js/materialize-css">
      <img src="https://badge.fury.io/js/materialize-css.svg" alt="npm version badge">
    </a>
    <a href="https://cdnjs.com/libraries/materialize">
      <img src="https://img.shields.io/cdnjs/v/materialize.svg" alt="CDNJS version badge">
    </a>
    <a href="https://david-dm.org/Dogfalo/materialize">
      <img src="https://david-dm.org/Dogfalo/materialize/status.svg" alt="dependencies Status badge">
      </a>
    <a href="https://david-dm.org/Dogfalo/materialize#info=devDependencies">
      <img src="https://david-dm.org/Dogfalo/materialize/dev-status.svg" alt="devDependency Status badge">
    </a>
    <a href="https://gitter.im/Dogfalo/materialize">
      <img src="https://badges.gitter.im/Join%20Chat.svg" alt="Gitter badge">
    </a>
</p>

## Table of Contents
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Supported Browsers](#supported-browsers)
- [Changelog](#changelog)
- [Testing](#testing)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Quickstart:
Read the [Getting started page](http://materializecss.com/getting-started.html) for more information about the framework. Templates and how to use materialize can be found on the [materializecss website](http://materializecss.com).

- [Download the latest release](https://github.com/Dogfalo/materialize/releases/latest) of materialize directly from GitHub.
- Clone the repo: `git clone https://github.com/Dogfalo/materialize.git`.
- Include the files via [cdnjs](https://cdnjs.com/libraries/materialize). More [here](http://materializecss.com/getting-started.html).
- Install with [npm](https://www.npmjs.com): `npm install materialize-css`.
- Install with [Bower](https://bower.io): `bower install materialize`.
- Install with [Atmosphere](https://atmospherejs.com): `meteor add materialize:materialize`.

## Documentation
The documentation can be found at <http://materializecss.com>. To run the documentation locally on your machine, you need [Node.js](https://nodejs.org/en/) installed on your computer.

### Running documentation locally
Run these commands to set up the documentation:

```bash
git clone https://github.com/Dogfalo/materialize
cd materialize
npm install
```

Then run `grunt monitor` to compile the documentation. When it finishes, open a new browser window and navigate to `localhost:8000`. We use [BrowserSync](https://www.browsersync.io/) to display the documentation.

### Documentation for previous releases
Previous releases and their documentation are available for [download](https://github.com/Dogfalo/materialize/releases).

## Supported Browsers:
Materialize is compatible with:

- Chrome 35+
- Firefox 31+
- Safari 7+
- Opera
- Edge
- IE 10+

## Changelog
For changelogs, check out [the Releases section of materialize](https://github.com/Dogfalo/materialize/releases) or the [CHANGELOG.md](CHANGELOG.md).

## Testing
We use Jasmine as our testing framework and we're trying to write a robust test suite for our components. If you want to help, [here's a starting guide on how to write tests in Jasmine](CONTRIBUTING.md#jasmine-testing-guide).

## Contributing
Check out the [CONTRIBUTING document](CONTRIBUTING.md) in the root of the repository to learn how you can contribute. You can also browse the [Help Wanted](https://github.com/Dogfalo/materialize/labels/help-wanted) tag in our issue tracker to find things to do.

## Copyright and license
Code copyright 2017 Materialize. Code released under the MIT license.
