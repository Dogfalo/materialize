Changelog
=======
Bolded styling surrounded by emojis indicates a breaking change.

## 1.0.0 (September 9th, 2018)
- [Full Changelog here](https://github.com/Dogfalo/materialize/blob/v1-dev/v1-changelog.md)

## 1.0.0-rc.2 (June 23rd, 2018)
- Autocomplete
  - Fixed bug where Autocomplete did not open properly in certain cases with keyboard focus

- Carousel
  - Fix noWrap option bug

- Collapsible
  - Now correctly removes all event listeners on destroy

- Materialbox
  - Destroy now removed wrapper element added during intialization

- Pushpin
  - Fixed bug on IE11 where class was not removed properly

- Select
  - No longer triggers onchange event when selecting the same option

- Sidenav
  - Destroy now reenables body scrolling if Sidenav was destroyed while it was open

- Tabs
  - Tab indicator no longer displays improperly when a scrollbar is present in the element


## 1.0.0-rc.1 (May 1st, 2018)
- Autocomplete
  - Added open and close methods
  - Fixed bug where Autocomplete would close on click

- Datepicker
  - Added autoClose option

- Modal
  - Fixed issue with focus with nested modals

- Select
  - Removed `active` class on option elements
  - Fixed bug where `selected` class was not properly removed on option elements

- Sidenav
  - Destroy method now correctly removes style property

- Text Input
  - Fixed bug where autofill on chrome overlapped text input

- Toast
  - Fixed bug where Toast did not respect inDuration option

- Tooltip
  - Fixed tooltip positioning bug in certain scenarios when html height was less than screen height
  - Fixed bug where tooltip stayed open on click


## 1.0.0-beta (March 21st, 2018)
- Autocomplete
  - Now uses dropdown

- Carousel
  - Added numVisible option

- Collapsible
  - Added keyboard support

- Dropdown
  - Fixed scrolling dropdown bug on touch devices

- Javascript Initialization
  - Added AutoInit function

- Modals
  - Focus now stays within open modal

- Pickers
  - Standardized action buttons to match those on android
  - Added support for date and time input types
  - **fromnow renamed to fromNow**

- Select
  - Dropdown scrolls to selected option

- Sidenav
  - Now detects vertical scrolling

- Tabs
  - Fixed tab preselection on swipeable tabs

- TapTarget
  - **Reverted name change from FeatureDiscovery**

- Tooltips
  - Added keyboard support


## 1.0.0-alpha.4 (February 18th, 2018)
- Badge
  - Fixed display issue when used in a table

- Chips
  - Fixed autocomplete initialization

- CSS
  - Added hide and show classes for extra large breakpoint
  - Added small buttons
  - Fixed input helper text alignment when using prefix

- Date Picker
  - Fixed month and year select overflow issues
  - Added additional date formatting options

- Dropdown
  - Added container option
  - Dropdown on mobile now correctly selects the right item
  - Dropdown now closes correctly on iOS devices

- Materialbox
  - Fixed error with photo caption
  - Fixed issues caused by width and height attributes
  - Fixed issues caused by max-width and max-height

- Modal
  - Improved support for nested modals

- Parallax
  - Fixed infinite loop bug

- Select
  - *Renamed plugin class to `FormSelect`*
  - *Renamed jQuery plugin to `formSelect`*

- Sidenav
  - Fixed issues with draggable option when used with fixed sidenav

- Time Picker
  - Changed i18n options to be more consistent with date picker
  - Fixed error with auto close option


## 1.0.0-alpha.3 (December 29th, 2017)
- *Initialization code for all components changed. E.g. Change`new M.Tooltip(el, options)` to `M.Tooltip.init(el, options)`*
  - This was done so that the same initialization code can be used to initialize single Elements as well as NodeLists and jQuery element objects

- Added in onOpen and OnClose callbacks for appropriate plugins

- Datepicker
  - Destroy function added

- Feature Discovery
  - Added open and close callbacks

- Materialbox
  - Added open and close callbacks

- Modal
  - Added open and close callbacks for consistency
  - Removed ready and complete callbacks

- Parallax
  - Has responsiveThreshold option
  - Destroy function added

- Pushpin
  - added onPositionChange callback

## 1.0.0-alpha.2 (November 30th)
- Chips
  - Fixed and standardized chips callback parameters

- Datepicker
  - Fixed date format option
  - Scrollbar no longer unecessarily appears when using datepicker
  - Fixed bug where using month and year selectors didn't change date

- Dropdown
  - Removed automatic focus highlight on open

- Textarea
  - Fixed error where text was cut off on Firefox

- Tabs
  - Fixed error with pure JavaScript initialization
  - Fixed error where a tab with no content would break tabs

- Timepicker
  - Fixed error with twelveHour options

- Replaced velocity.js with anime.js

## 1.0.0-alpha.1 (November 10th)
- Dropdown
  - rewritten with classes
  - Plugin is initialized on `.dropdown-content` instead of `.dropdown-button`
  - Renamed classes `.dropdown-button` to `.dropdown-trigger`
  - Renamed option `belowOrigin` to `coverTrigger`
  - Added callbacks onOpenStart, onOpenEnd, onCloseStart, onCloseEnd
  - Removed HTML attribute options
  - Removed stopPropagation option
  - Reworked animation

- Select
  - rewritten with classes
  - Plugin renamed from 'material_select' to 'select'
  - The select will no longer copy the class attribute on each <option> el to the <img> for the icon in the generated select.

- Tabs
  - rewritten with classes
  - added duration option
  - now requires plugin initialization
  - tabs 'select_tab' method renamed to 'select'

- Chips
  - rewritten with classes
  - changed events to callbacks
  - Added limit chips option

- Autocomplete
  - rewritten with classes
  - Added updateData method
  - Added sortFunction option

- Feature Discovery
  - rewritten with classes
  - Plugin renamed from 'tapTarget' to 'featureDiscovery'

- Forms
  - Added new helper text element
  - Moved validation messages 'data-error' and 'data-success' to Helper Text

- Pickatime
  - Renamed to Timepicker
  - Now opens on enter or click instead of focus
  - Added open animation
  - Reworked and simplified Timepicker HTML structure
  - Renamed internal classes to reflect Timpicker namechange and structure rework

- Floating Action Button
  - Converted to plugin
  - Added direction option
  - Added toolbar transition option


## v0.100.1 (July 21st)
- Fixed bug where modal triggers could not contain child elements
- Fixed bug with right alignment option for dropdown
- Allow select native browser validation error messages
- Added fix for validation messages being mispositioned when input is empty

## v0.100.0 (July 19th)
- :sparkles: **Rewrote Modal Plugin** :sparkles:
  - Modal open no longer initializes plugin
  - Fixed bug where modal open did not use initialized options
  - Modal-trigger class required for modal trigger elements
- :sparkles: **Rewrote Toast Plugin** :sparkles:
  - Added class method to dismiss all toasts
  - Added instance method to remove specific toasts
- Validation styling support added for many form components
- Added ability to remove autocompelete data
- Fixed waves persisting bug
- Waves no longer throws error on svg elements
- Fixed side nav callback bugs
- Tab accessibility for date picker
- Added container option for time picker
- Fixed carousel image loading bug
- Full width carousel now resizes height on resize
- Added carousel destroy
- Fixed multiple bugs with jQuery outerWidth on Linux
- Fixed cursor blinking on select on iOS
- Fixed search form styling in navbar
- Fixed label animation on date picker
- Added close on select option for date picker
- Browser errors now show up on radio buttons and checkboxes

## v0.99.0 (June 22th)
- Added support for jQuery 3
- Fixed dynamic textarea resize bug
- Added support for custom active elements in scrollspy
- Added Time Picker
- Updated styling for Date Picker
- Added callbacks to side nav
- Updated styling for switches

## v0.98.2 (April 14th)
- :no_good: **Autocomplete: renamed and moved options to `autocompleteOptions`** :no_good:
- Fixed collapsible preselect bug
- Fixed dropdown event bubbling bug
- Fixed range position inaccuracies
- Fixed feature discovery mobile styles
- Fixed carousel reinitialize bugs
- Fixed grid offset bug


## v0.98.1 (March 21st)
- Fixed various select bugs on mobile devices
- Fixed small sidenav overlay bugs
- Fixed carousel resizing bug
- Fixed materialbox callback bug
- Range slider supports keyboard navigation
- Added XL breakpoint
- Added Pulse CSS effect
- Added Feature Discovery component


## v0.98.0 (January 25th)
- :no_good: **Standardized plugin option naming to camelcase (please check your plugin calls to make sure all the options are camelcase)** :no_good:
- Added FABs in image cards
- Added swipeable tabs
- Fixed carousel misalignment when switching quickly
- Fixed carousel resize bug where slide widths wouldn't change when changing window size
- Improved tabs compatibility with cards
- Fixed bug where using backspace to delete chips would navigate back in certain browsers
- Added autocomplete integration with chips
- Upgraded noUiSlider to version 9 with support for vertical sliders


## v0.97.8 (October 30th, 2016)
- **Refactored Modal plugin**
- Tabs now supported in navbar
- Chips data can now be reinitiailized
- Minor side nav fixes
- FAB to toolbar component added
- Fixed dropdown options bug


## v0.97.7 (July 23rd, 2016)
- Basic horizontal cards
- Carousel bug fixes and new features
- Updated sidenav styles and new component
- Meteor package now supports Sass
- Autocomplete form component
- Chips jQuery plugin


## v0.97.6 (April 1st, 2016)
- **Removed deprecated material icons from project**
- **Changed /font directory to /fonts**
- Datepicker and ScrollSpy now compatible with jQuery 2.2.x
- Responsive tables now work with empty cells
- Added focus states to checkboxes, switches, and radio buttons
- Sidenav and Modals no longer cause flicker with scrollbar
- Materialbox overflow and z-index issues fixed
- Added new option for Card actions within a Card reveal


## v0.97.5 (December 21st, 2015)
- Fixed Meteor package crash


## v0.97.4 (Dec 20, 2015)
- Added Jasmine testing with Travis CI
- Select bugfixes
- Grid Offset bugfix
- Dropdown overflow bugfix
- Range slider error bugfix


## v0.97.3 (Nov 15, 2015)
- Meteor font issues fixed
- Select rendering issue fixed
- Added Push and Pull to grid
- Dynamic accordion appends fixed


## v0.97.2 (Nov 8, 2015)
- Image support inside select
- Optgroup supported in select
- Multiple select added
- Card styling fixes
- Breadcrumbs added
- Scrollable tabs
- Tooltips and dropdowns position themselves more intelligently inside the window
- FAB menu is click-toggleable
- Horizontal FAB support added


## v0.97.1 (Sep 13, 2015)
- Added new range slider with uses noUiSlider to provide powerful options
- Added CSS for Chips
- Toasts support adding of html elements
- Fixed select destroy/creation bug
- Bugfixes for dropdown, badges, collections, scrollfire
- Added default preloader color variable
- File input now supports multiple files and dynamically loaded elements


## v0.97.0 (June 21, 2015)
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


## v0.96.0 (April 1, 2015)
- Toasts, transitions, scrollfire added under Materialize namespace
- Dropdown is now created as a child of its parent
- Collapsibles supports nesting
- Modal Bottom Sheet added
- Indeterminate Checkboxes added
- New Checkbox Style added
- Text Inputs supports placeholder/readonly
- Google Inbox-like Collapsible added
- Text Character Counter added
- Waves no longer breaks on SVGs


## v0.95.3 (Feb 25, 2015)
- Parallax image loading / responsiveness fixes
- Date picker supports month/year as dropdown
- Dismissable collection items
- Avatar collection items
- Pagination Added
- ScrollFire fixes


## v0.95.2 (Feb 10, 2015)
- Switches added
- Transition animation functions added
- ScrollFire Plugin added (fires functions dependent on scroll position)
- Responsive Video tag added
- Custom File Input Button added
- Modals has a fixed footer option
- Sidenav implementation changed (needs 2 UL menus)
- Slider Responsive Fixes


## v0.95.1 (Jan 26, 2015)
- Sidenav Fixes
- Dropdown alignment/gutter options added
- Parallax fixes
- JavaScript Initialization no longer needed for many components
- HTML options through data-attributes
- Site colors can be defined through Primary and Secondary color in Sass
- Tables no longer resonsive by default


## v0.95.0 (Jan 17, 2015)
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


## v0.94.0 (Dec 30, 2014)
- Sidenav supports right edge positioning
- Responsive Embeds
- Image Vertical align classes
- border-box added
- Variable file created
- Pushpin added
- Tooltips support all directions
- Layout helper classes added
- Materialbox Fixes
- Form Element Enhancements
- Navbar supports search bar
- Waves fixes
- Materialbox Captions
- Image Slider Fixes


## v0.93.1 (Dec 20, 2014)
- Flexbox Sticky Footer removed due to IE incompatibility


## v0.93.0 (Dec 19, 2014)
- Card Reveal
- Image Slider
- Dynamically loaded forms work correctly
- Badges added
- Circular Image
- Waves Fixes
- Footer Added
- Toast support Custom HTML
- Modals support programmatic opening/closing
- Responsive Image support


## v0.92.1 (Dec 14, 2014)
- Bower semver fix
- Added new radio button style


## v0.92.0 (Dec 13, 2014)
- Clicking icon in dropdown in navbar no longer closes dropdown immediately
- Multiple select inputs now work properly
- Mobile navbar no longer extends past screen width
- Parallax improved
- Modal restructured / can be opened programmatically
- Callbacks added to modals
- Added dist folder to repo
- Cards restructured


## v0.91 (Dec 3, 2014)
- bug fixes to forms
- added waves color classes
- toast thickened to look better on mobile
- many other bug fixes


## v0.9 (Nov 30, 2014)
- Touch interactions added
- tons more...
