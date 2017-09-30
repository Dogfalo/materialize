# Upgrade to v1.0.0 from v0.100.1

## Sidenav
- Call plugin on `.sidenav` instead of `.button-collapse`
- Add `.sidenav-trigger` class to sidenav open trigger
- Rename classes `.side-nav` to `.sidenav`
- Remove deprecated class `.userView`
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
- Rename classes `.dropdown-button` to `.dropdown-trigger`
- Rename option `belowOrigin` to `coverTrigger`
- Removed stopPropagation option


## Select
- Rename plugin call `.material_select()` to `.select()`
