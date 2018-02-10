# Upgrade to v1.0.0 from v0.100.1

## Sidenav
- Call plugin on `.sidenav` instead of `.button-collapse`
- Change attribute `data-activates` to `data-target`
- Add `.sidenav-trigger` class to sidenav open trigger
- Rename classes `.side-nav` to `.sidenav`
- Remove deprecated class `.userView`, use `.user-view` instead
- Rename plugin call `.sideNav()` to `.sidenav()`
- Sidenav option `closeOnClick` no longer exists
  - Instead apply the class `.sidenav-close` to any item in the Sidenav that you wish to trigger a close.


## Tabs
- Initialize plugin (no longer initializes by default)
- Rename plugin method `select_tab` to `select`


## Chips
- Removed event triggers, use callback options instead


## Dropdown
- Call plugin on `.dropdown-content` instead of `.dropdown-button`
- Change attribute `data-activates` to `data-target`
- Rename classes `.dropdown-button` to `.dropdown-trigger`
- Rename option `belowOrigin` to `coverTrigger`
- Removed stopPropagation option


## Select
- Rename plugin call `.material_select()` to `.select()`


## Feature Discovery
- Rename plugin call `.tapTarget()` to `.featureDiscovery()`
- Change attribute `data-activates` to `data-target`


## Forms
- Added new Helper Text element that should be placed after the `label`
- Moved validation messages `data-error` and `data-success` to Helper Text
- Changed Checkboxes and Radio buttons to have similar label wrapping as switches
- Instead of using `.trigger('autoresize')` use `M.textareaAutoResize` to resize textareas


## Pickers
- Rename plugin call `.pickadate()` to `.datepicker()`
- Datepicker options `today`, `clear`, `close` moved to `i18n.today`, `i18n.clear`, and `i18n.done` respectively.


## Collections
- Removed dismissible collections


## ScrollFire
- Removed due to simplicity and overlap. There are much better scrolling libraries that people should use


## Transitions
- JavaScript transitions removed


## Floating Action Buttons
- Automatic initialization removed
- Converted to plugin


## Character Counter
- Automatic initialization removed


## Toasts
- Arguments list of the M.toast function has been changed into an options Object similar to all the other plugins
- Rename the `className` option to `classes`


## Materialbox
- Automatic initialization removed