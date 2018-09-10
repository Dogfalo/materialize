## Auto Init
- Componenets are no longer initialized automatically on document load by Materialize
- Added function `M.AutoInit()` that initializes all componenets

## Autocomplete
- Added sort function to order completion results
- Autocomplete now uses dropdown to show options

## Carousel
- Added numVisible option
- Added onCycleTo callback

## Chips
- Renamed plugin from `material_chip` to `chips`
- Removed `autocompleteData` `autocompleteLimit` options, instead pass in autocomplete related options in `autocompleteOptions`
- Removed event triggers, use callback options instead
- Added limit option
- Added 3 callbacks onChipAdd, onChipSelect, onChipDelete
- Removed onChipAdd, onChipSelect, onChipDelete events


## Collapsible
- Removed automatic initialization
- Removed html attribute options
- Added keyboard support
- Added onOpenStart callback
- Added onOpenEnd callback
- Added onCloseStart callback
- Added onCloseEnd callback


## Datepicker
- Complete rewrite of Datepicker, please see new documentation


## Dropdown
- Added keyboard support
- Removed gutter option
- Changed belowOrigin option to coverTrigger
- Removed stopPropagation option
- Removed automatic initialization
- Call plugin on `.dropdown-content` instead of `.dropdown-button`
- Change attribute `data-activates` to `data-target`
- Rename classes `.dropdown-button` to `.dropdown-trigger`
- Rename option `belowOrigin` to `coverTrigger`
- Added onOpenStart callback
- Added onOpenEnd callback
- Added onCloseStart callback
- Added onCloseEnd callback
- Added autoFocus option
- Added `recalculateDimensions` method


## Materialbox
- Added inDuration option
- Added outDuration option
- Added onOpenStart callback
- Added onOpenEnd callback
- Added onCloseStart callback
- Added onCloseEnd callback

## Modal
- Changed modal animation
- Added preventScrolling option
- Change attribute `data-activates` to `data-target`
- Removed read and complete callback
- Added onOpenStart callback
- Added onOpenEnd callback
- Added onCloseStart callback
- Added onCloseEnd callback


## Parallax
- Added responsiveThreshold option to disable parallax effect below a certain screensize


## Pushpin
- Add callback that fires when a pushpin item changes between its 3 states


## Scrollfire
- Plugin removed


## Scrollspy
- Added throttle option

## Select
- Renamed plugin call `.material_select()` to `.formSelect()`
- Added `dropdownOptions` as a way to customize the dropdown that Select uses
- Removed `active` class


## Sidenav
- Removed menuWidth option, use CSS to set sidenav width instead
- Call plugin on `.sidenav` instead of `.button-collapse`
- Change attribute `data-activates` to `data-target`
- Add `.sidenav-trigger` class to sidenav open trigger
- Rename classes `.side-nav` to `.sidenav`
- Remove deprecated class `.userView`, use `.user-view` instead
- Rename plugin call `.sideNav()` to `.sidenav()`
- Sidenav option `closeOnClick` no longer exists
  - Instead apply the class `.sidenav-close` to any item in the Sidenav that you wish to trigger a close.
- Renamed `fixed` class to `sidenav-fixed`
- Renamed methods `show` and `hide` to `open` and `close` respectively
- Added preventScrolling option
- Removed onOpen and onClose callbacks
- Added onOpenStart callback
- Added onOpenEnd callback
- Added onCloseStart callback
- Added onCloseEnd callback


## Tabs
- Removed automatic initialization
- Renamed plugin method `select_tab` to `select`
- Added duration option
- Added method `updateTabIndicator` to fix tab underline position


## Tap Target
- Added onOpen callback
- Added onClose callback


## Timepicker
- Renamed `default` option to `defaultTime`
- Added cancel button to picker
- Timepicker options `clear`, `close` moved to `i18n.clear`, and `i18n.done` respectively.
- Renamed `fromnow` option to `fromNow`
- Removed `ampmclickable` option


## Toasts
- Arguments list of the M.toast function has been changed into an options Object similar to all the other plugins
- Rename the `className` option to `classes`
- Added activationPercent option


## Tooltip
- Removed delay option and added enterDelay and exitDelay
- Removed `tooltip` option, use option `html` to set tooltip html instead
- Added margin option
- Added inDuration and outDuration options
- Added transitionMovement option
- Added keyboard support
- Some html attribute options have been removed, only data-tooltip and data-position remain, instead use the options during initialization to set options


## Typography
- Removed Roboto
