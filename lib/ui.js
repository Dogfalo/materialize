'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeUI = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _forms = require('./ui/forms');

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializeUI = exports.initializeUI = function initializeUI() {
  (0, _forms2.default)(_jquery2.default);
};

