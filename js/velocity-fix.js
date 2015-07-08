import v from 'velocity.min.js';

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}

export default Vel;
