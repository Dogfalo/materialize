![alt tag](https://raw.github.com/dogfalo/materialize/master/images/materialize.gif)
===========

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/Dogfalo/materialize?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Materialize, a CSS Framework based on material design

### Current Version : v0.96.0

## Sass Requirements:
- Ruby Sass 3.3+, LibSass 0.6+

## Supported Browsers:
Chrome 35+, Firefox 31+, Safari 7+, IE 10+

## Contributing
- Compiling Files
  - `npm install`
  - `grunt monitor`, this will compile .scss, .js., .jade files
- Documentation
  - If you notice an error in the documentation, please edit the corresponding .html page under jade/page-contents/.
- Issues
  - If you have an issue please make sure you document the problems in depth. One line issues with no explanations will be closed.
- Feature Requests
  - We like feature requests but make sure that it can be seen within the goals of the project and not just something you need individually. Also you should try and give as much examples and details about the new feature as possible.
- Code Examples
  - Use this [codepen](http://codepen.io/Dogfalo/pen/xbzPQV) to illustrate your problem.

## Changelog
- v0.96.0 (April 1, 2015)
  - **Toasts, transitions, scrollfire added under Materialize namespace**
  - **Dropdown is now created as a child of its parent**
  - Collapsibles supports nesting
  - Modal Bottom Sheet added
  - Indeterminate Checkboxes added
  - New Checkbox Style Added
  - Text Inputs supports placeholder/readonly
  - Google Inbox-like Collapsible added
  - Text Character Counter added
  - Waves no longer breaks on SVG's

- v0.95.3 (Feb 25, 2015)
  - Parallax image loading / responsiveness fixes
  - Date picker supports month/year as dropdown
  - Dismissable collection items
  - Avatar collection items
  - Pagination Added
  - ScrollFire fixes

- v0.95.2 (Feb 10, 2015)
  - Switches added
  - Transition animation functions added
  - ScrollFire Plugin added (fires functions dependent on scroll position)
  - Responsive Video tag added
  - Custom File Input Button added
  - Modals has a fixed footer option
  - SideNav implementation changed (needs 2 UL menus)
  - Slider Responsive Fixes

- v0.95.1 (Jan 26, 2015)
  - Sidenav Fixes
  - Dropdown alignment/gutter options added
  - Parallax fixes
  - JavaScript Initialization no longer needed for many components
  - HTML options through data-attributes
  - Site colors can be defined through Primary and Secondary color in Sass
  - Tables no longer resonsive by default

- v0.95.0 (Jan 17, 2015)
  - Drag Out Menu fixed with Touch Interactions
  - Toasts minor bugfix
  - OL element has default styling
  - Fullscreen Slider added
  - Footer requires page-footer class
  - Progress Bars added
  - Form autofill support added
  - Responsive Tables support added
  - Scrollspy Plugin released
  - Waves events are now delegated / behavior enhanced
