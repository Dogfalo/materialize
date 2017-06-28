"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var TextInput = exports.TextInput = function TextInput(props) {
  return _react2.default.createElement(
    "div",
    { className: "input-field" },
    _react2.default.createElement("input", { id: "first_name", type: "text", onChange: props.onChange || noop,
      className: "validate", defaultValue: props.value }),
    _react2.default.createElement(
      "label",
      { htmlFor: "first_name" },
      props.label
    )
  );
};