# Upgrade to v1.0.0 from v0.100.2

## Auto Init
- Components are no longer initialized automatically on document load by Materialize
- Added function `M.AutoInit()` that initializes all components

## Character Counter
- Automatic initialization removed, initialize it manually as shown in documentation


## Checkboxes and Radio Buttons
- Changed Checkboxes and Radio buttons to have similar label wrapping as switches
- Instead of using `.trigger('autoresize')` use `M.textareaAutoResize` to resize textareas


## Chips
- Renamed plugin from `material_chip` to `chips`
- Removed `autocompleteData` `autocompleteLimit` options, instead pass in autocomplete related options in `autocompleteOptions`
- Removed event triggers, use onChipAdd, onChipSelect, onChipDelete callback options instead


## Collapsible
- Removed automatic initialization, initialize it manually as shown in documentation
- Removed html attribute options, use the options parameter during initialization instead
- Removed onOpen and onClose callbacks and added onOpenStart, onOpenEnd, onCloseStart, onCloseEnd callbacks


## Collections
- Removed dismissible collections


## Datepicker
- Complete rewrite of Datepicker, please see new documentation
- Rename plugin call from `.pickadate()` to `.datepicker()`
- Datepicker options `clear`, `close` moved to `i18n.clear`, and `i18n.done` respectively.


## Dropdown
- Removed gutter option
- Removed stopPropagation option
- Call plugin on `.dropdown-trigger` instead of `.dropdown-button`
- Change attribute `data-activates` to `data-target`
- Rename classes `.dropdown-button` to `.dropdown-trigger`
- Rename option `belowOrigin` to `coverTrigger`
- Removed automatic initialization, initialize it manually as shown in documentation


## Floating Action Buttons
- Automatic initialization removed
- Converted to plugin


## Materialbox
- Removed automatic initialization, initialize it manually as shown in documentation


## Modal
- Change attribute `data-activates` to `data-target`
- Removed ready and complete callback, use onOpenEnd and onOpenEnd callback instead


## Scrollfire
- Plugin removed, this capability is better handled by other existing open source plugins


## Select
- Rename plugin call `.material_select()` to `.formSelect()`


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
- Removed onOpen and onClose callback, use onOpenEnd and onOpenEnd callback instead
- Rename `fixed` class to `sidenav-fixed`
- Rename methods `show` and `hide` to `open` and `close` respectively


## Tabs
- Removed automatic initialization, initialize it manually as shown in documentation
- Rename plugin method `select_tab` to `select`


## Tap Target
- Change attribute `data-activates` to `data-target`


## Text Inputs
- Added new Helper Text element that should be placed after the `label`
- Moved validation messages `data-error` and `data-success` to Helper Text


## Timepicker
- Change `default` option to `defaultTime`
- Timepicker options `clear`, `close` moved to `i18n.clear`, and `i18n.done` respectively.
- Change `fromnow` option to `fromNow`
- Removed `ampmclickable` option


## Toasts
- Arguments list of the M.toast function has been changed into an options Object similar to all the other plugins
- Rename the `className` option to `classes`


## Tooltip
- Removed delay option and added enterDelay and exitDelay
- Removed `tooltip` option, use option `html` to set tooltip html instead
- Some html attribute options have been removed, only data-tooltip and data-position remain, instead use the options during initialization to set options


## Transitions
- JavaScript transitions removed
