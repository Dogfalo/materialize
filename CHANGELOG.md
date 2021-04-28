# Changelog
All notable changes to this project will be documented in this file. For changes made before this fork, please refer to [HISTORY.md](https://github.com/materializecss/materialize/blob/v1-dev/HISTORY.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0-alpha] - 2021-03-31

### Added

- Nightly builds of the latest code available through github actions ([Easy link for the latest build](https://nightly.link/materializecss/materialize/workflows/nightly/v1-dev/build)) ([58d18003](https://github.com/materializecss/materialize/commit/58d180036374f2b38a244e5e96c33838ce185220))
- Added support for text input suffix icons ([3e516e5b](https://github.com/materializecss/materialize/commit/3e516e5b322e4f8c7299cc37504389d0ddbb1ed6))
- Added dragTargetWidth option ([6f4b2a15](https://github.com/materializecss/materialize/commit/6f4b2a15fc9f21a91ce95a1baffe60cfb15619df))
- Added ability to change tooltip animate opacity ([8fce193f](https://github.com/materializecss/materialize/commit/8fce193fa94fe6d5a04630e732623c84fc803c3d))
- Added option to prevent user chips ([cc696bf3](https://github.com/materializecss/materialize/commit/cc696bf386e3ebbe72f14a7605bed886569da8f7))

### Changed

- Docs are now hosted at [materializecss.github.io/materialize](https://materializecss.github.io/materialize/). This also means removing all adverts, tracking and patreon stuff. ([ef0ce5b0](https://github.com/materializecss/materialize/commit/ef0ce5b0a13a418d47c6d88272fd3173b6954c2e), [fbfd2d6a](https://github.com/materializecss/materialize/commit/fbfd2d6afb09483700cff78c4e651875269430a6), [376be29f](https://github.com/materializecss/materialize/commit/376be29f10e53f77cbec203cee5f20a6e72cc62c), [1a4463a9](https://github.com/materializecss/materialize/commit/1a4463a9d476872e30e03fe9590ab5b256d17e07), [015d0c32](https://github.com/materializecss/materialize/commit/015d0c32123795d94e8b9c265936dcf170d52682))
- Made the search results on the docs prettier ([e8871c20](https://github.com/materializecss/materialize/commit/e8871c2065ac5d2f20b01afebd18a9687a14e9ec), [2543a1ae](https://github.com/materializecss/materialize/commit/2543a1ae203066654300fb2a6ecf4b83e90d708c), [b9dfeceb](https://github.com/materializecss/materialize/commit/b9dfeceb4d7f74da7ad2ca5b1b700ea886b26915), [60297e1f](https://github.com/materializecss/materialize/commit/60297e1f281f3c8a645eb044881f942df076911a))
- Use jsDelivr ([99ddf250](https://github.com/materializecss/materialize/commit/99ddf2506141e326b93bad5b6cd17635e4aa8d9f), [57e53568](https://github.com/materializecss/materialize/commit/57e535688518ca52252dbb49494262ae502bd636))
- Updated waves.js ([fce7b8be](https://github.com/materializecss/materialize/commit/fce7b8be7b94cb8d0792f560694aa72cc12abcdb))

### Deprecated

- As part of the XSS fixes, html data for both tooltips and toasts is highly discouraged. The `html` option is now deprecated and usage of of `text` is recommended. If you really need to use HTML, use `unsafeHTML` and make sure to **sanitize any user input**.
- Similarly, HTML is disabled by default for autocomplete components. To re-enable this `allowUnsafeHTML` must be set. Once again be sure to **sanitize any user input**.

### Fixed
- Fix breakpoint issue and incorrect min-width size ([75af8680](https://github.com/materializecss/materialize/commit/75af8680f982715b921aec94f4edc68ffca332bb))
- Fixed toast tests ([1e6e9dca](https://github.com/materializecss/materialize/commit/1e6e9dca7e5cf4a650c95ff38f34003f6a35bf86))
- Fixed overflowed scroll sidenav on desktop ([27b87935](https://github.com/materializecss/materialize/commit/27b87935423f52462d7b4ef4bad9fa9c6f8e2e59))
- Fixed a bug in Dropdown when not using jQuery ([faa73a11](https://github.com/materializecss/materialize/commit/faa73a118813109b91062b4147d60f23d34a8f18))
- Fix for closing the modal ([68c12a3a](https://github.com/materializecss/materialize/commit/68c12a3af999cea7cd8096a699a02ee6a5854e5b))
- Fix chrome passive event warnings ([0b6b70c3](https://github.com/materializecss/materialize/commit/0b6b70c3544581fc467c509f173b937f5d036ec8), [3cbfb259](https://github.com/materializecss/materialize/commit/3cbfb259cd6911e1796f6460abcd921ccaef6ccd), [95580a52](https://github.com/materializecss/materialize/commit/95580a524199ca8774ccff87f37d13911b9626d4), [3afddefe](https://github.com/materializecss/materialize/commit/3afddefe2cadef09cb0221d9cdbbc61095f27b06))
- Fix disabled checked switch style ([28df51e4](https://github.com/materializecss/materialize/commit/28df51e475c7f8f2ca48b76a5456bb7711c3d991))
- Fix when using indented text for select inputs ([63d5502](https://github.com/materializecss/materialize/commit/63d5502eebbe821db21bb1fbba0dba98d3f58272))
- Fix for feature discovery target being misplaced ([ee5f767](https://github.com/materializecss/materialize/commit/ee5f7673dd3cfb890c9b643a49fc7ce9e71609e7))
- Other misc fixes for bugs and typos

### Security

- Fixed XSS vulnerabilities ([3aae4cc9](https://github.com/materializecss/materialize/commit/3aae4cc9bb2b58c337bf25d2f04f129a2a0fa78f))

#### Many other small changes have been made:
https://github.com/Dogfalo/materialize/compare/v1-dev...materializecss:v1-dev

#### Contributors
Many thanks to all the contributors that made this release possible.

@DanielRuf
@nekonenene
@Smankusors
@ChildishGiant
@dev10110
@WaeCo
@tomwjerry
@warrenrodrigues
@samschurter
@julienc91
@RaquelAM
@k2s
@stweil
@roiLeo
@nicknickel
@zn022285
@pwcreative
@june07
@doughballs
@dwu300
@tomelsj
@NoahvdAa
@bugy
@richarddewit
@dargmuesli
@christinavoudouris
