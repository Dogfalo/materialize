'use strict';
// Create Version Header for files
module.exports = function (grunt) {
  // Create Version Header for files
  var usebanner = {
    release: {
      options: {
        position: 'top',
        banner: "/*!\n * Materialize v" + grunt.option("newver") + " (http://materializecss.com)\n * Copyright 2014-2017 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */",
        linebreak: true
      },
      files: {
        src: ['dist/css/*.css', 'dist/js/*.js']
      }
    }
  };
  return usebanner
};