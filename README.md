![alt tag](https://raw.github.com/dogfalo/materialize/master/images/materialize.gif)
===========

[![Travis CI](https://travis-ci.org/Dogfalo/materialize.svg?branch=master)](https://travis-ci.org/Dogfalo/materialize)[![Dependency Status](https://david-dm.org/Dogfalo/materialize.svg)](https://david-dm.org/Dogfalo/materialize)[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/Dogfalo/materialize?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Materialize](http://materializecss.com/), a CSS Framework based on material design

### Current Version : v0.97.6

## Sass Requirements:
- Ruby Sass 3.3+, LibSass 0.6+

## Supported Browsers:
Chrome 35+, Firefox 31+, Safari 7+, IE 10+

## Changelog
- v0.97.6 (April 1st)
  - **Removed deprecated material icons from project**
  - **Changed /font directory to /fonts**
  - Datepicker and ScrollSpy now compatible with jQuery 2.2.x
  - Responsive tables now work with empty cells
  - Added focus states to checkboxes, switches, and radio buttons
  - Sidenav and Modals no longer cause flicker with scrollbar
  - Materialbox overflow and z-index issues fixed
  - Added new option for Card actions within a Card reveal
- v0.97.5 (Dec 21, 2015)
  - Fixed Meteor package crash
- v0.97.4 (Dec 20, 2015)
  - Added Jasmine testing with Travis CI
  - Select bugfixes
  - Grid Offset bugfix
  - Dropdown overflow bugfix
  - Range slider error bugfix
- v0.97.3 (Nov 15, 2015)
  - Meteor font issues fixed
  - Select rendering issue fixed
  - Added Push and Pull to grid
  - Dynamic accordion appends fixed
- v0.97.2 (Nov 8, 2015)
  - Image support inside select
  - Optgroup supported in select
  - Multiple select added
  - Card styling fixes
  - Breadcrumbs added
  - Scrollable tabs
  - Tooltips and dropdowns position themselves more intelligently inside the window
  - FAB menu is click-toggleable
  - Horizontal FAB support added
- v0.97.1 (Sep 13, 2015)
  - Added new range slider with uses noUiSlider to provide powerful options
  - Added CSS for Chips
  - Toasts support adding of html elements
  - Fixed select destroy/creation bug
  - Bugfixes for dropdown, badges, collections, scrollfire
  - Added default preloader color variable
  - File input now supports multiple files and dynamically loaded elements
- v0.97.0 (June 21, 2015)
  - **Documentation changed to use Official Google Icon web font**
  - **Input errors added**
  - Flicker on Firefox on dropdowns fixed
  - Pagination made more responsive
  - Modal now prevents scrolling
  - Modal animation added
  - Support for multiple modals added
  - Programmatic control of FAB to open/close added
  - Programmatic control of slider to play/pause added
  - Plus many more bug fixes


## Contributing
[Please read CONTRIBUTING.md for more information](CONTRIBUTING.md)

## Testing
We use Jasmine as our testing framework and we're trying to write a robust test suite for our components. If you want to help, [here's a starting guide on how to write tests in Jasmine](https://docs.google.com/document/d/1dVM6qGt_b_y9RRhr9X7oZfFydaJIEqB9CT7yekv-4XE/edit?usp=sharing)
