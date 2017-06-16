'use strict';
//removelogging Removes console logs
module.exports = function (grunt) {
  // Removes console logs
  var removelogging = {
    source: {
      src: ["js/**/*.js", "!js/velocity.min.js"],
      options: {
        // see below for options. this is optional.
      }
    }
  };
  return removelogging;
};