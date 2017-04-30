![alt tag](https://raw.github.com/dogfalo/materialize/master/images/materialize.gif)
===========

[![Travis CI](https://travis-ci.org/Dogfalo/materialize.svg?branch=master)](https://travis-ci.org/Dogfalo/materialize) [![devDependency Status](https://david-dm.org/Dogfalo/materialize/dev-status.svg)](https://david-dm.org/Dogfalo/materialize#info=devDependencies) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Dogfalo/materialize?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Materialize](http://materializecss.com/), a CSS Framework based on material design

### Current Version : v0.98.2

## Sass Requirements:
- Ruby Sass 3.3+, LibSass 0.6+

## Supported Browsers:
Chrome 35+, Firefox 31+, Safari 7+, IE 10+

## Changelog
Bolded styling surrounded by emojis indicates a breaking change.

- v0.98.2 (April 14th)
  - Fixed collapsible preselect bug
  - Fixed dropdown event bubbling bug
  - Fixed range position inaccuracies
  - Fixed feature discovery mobile styles
  - Fixed carousel reinitialize bugs
  - Fixed grid offset bug

- v0.98.1 (March 21st)
  - Fixed various select bugs on mobile devices
  - Fixed small sideNav overlay bugs
  - Fixed carousel resizing bug
  - Fixed materialbox callback bug
  - Range slider supports keyboard navigation
  - Added XL breakpoint
  - Added Pulse CSS effect
  - Added Feature Discovery component

- v0.98.0 (January 25th)
  - :no_good: **Standardized plugin option naming to camelcase (please check your plugin calls to make sure all the options are camelcase)** :no_good:
  - Added FABs in image cards
  - Added swipeable tabs
  - Fixed carousel misalignment when switching quickly
  - Fixed carousel resize bug where slide widths wouldn't change when changing window size
  - Improved tabs compatibility with cards
  - Fixed bug where using backspace to delete chips would navigate back in certain browsers
  - Added autocomplete integration with chips
  - Upgraded noUiSlider to version 9 with support for vertical sliders

- v0.97.8 (October 30th, 2016)
  - **Refactored Modal plugin**
  - Tabs now supported in navbar
  - Chips data can now be reinitiailized
  - Minor side nav fixes
  - FAB to toolbar component added
  - Fixed dropdown options bug
- v0.97.7 (July 23rd, 2016)
  - Basic horizontal cards
  - Carousel bug fixes and new features
  - Updated sidenav styles and new component
  - Meteor package now supports Sass
  - Autocomplete form component
  - Chips jQuery plugin




## Testing
We use Jasmine as our testing framework and we're trying to write a robust test suite for our components. If you want to help, [here's a starting guide on how to write tests in Jasmine](https://docs.google.com/document/d/1dVM6qGt_b_y9RRhr9X7oZfFydaJIEqB9CT7yekv-4XE/edit?usp=sharing)

## Contributing
[Please read CONTRIBUTING.md for more information](CONTRIBUTING.md)

## Translation
If you want to help us translate the documentation into other languages, please send us an email at materializeframework@gmail.com telling us which language team you want to join. We use [Transifex](https://www.transifex.com) as our localization platform and we will send you an invite there.
