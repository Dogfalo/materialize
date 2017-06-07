// Check for jQuery.
if (typeof(jQuery) === 'undefined') {
  //var jQuery;
  // Check if require is a defined function.
  if (typeof(require) === 'function') {
    window.jQuery = window.$ = require('jquery');
  // Else use the dollar sign alias.
  } else {
    window.jQuery = $;
  }
}
