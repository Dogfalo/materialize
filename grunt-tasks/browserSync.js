'use strict';
// Browser Sync integration

module.exports = function (grunt) {
  var browserSync = {
    bsFiles: ["bin/*.js", "bin/*.css", "!**/node_modules/**/*"],
    options: {
      server: {
        baseDir: "./" // make server from root dir
      },
      port: 8000,
      ui: {
        port: 8080,
        weinre: {
          port: 9090
        }
      },
      open: false
    }
  };
  return browserSync;
};