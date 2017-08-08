// Check for jQuery.
if (typeof(jQuery) === 'undefined') {

  var jQuery;
  // Projects with zone.js will only have jQuery in the window object
  if (typeof(window.jQuery) !== 'undefined') {
    jQuery = $ = window.jQuery;
  }
  // Check if require is a defined function.
  else if (typeof(require) === 'function') {
    jQuery = $ = require('jquery');
  // Else use the dollar sign alias.
  } else {
    jQuery = $;
  }
}
