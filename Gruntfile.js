module.exports = function(grunt) {

  var configs = require('load-grunt-config')(grunt, {
    configPath: __dirname + '/grunt-tasks',
    data: {
      pkg: grunt.file.readJSON("package.json")
    }
  });

  // configure the tasks
  grunt.initConfig({
    // Text Replace
    replace: {
      version: { // Does not edit README.md
        src: [
          'bower.json',
          'package.json',
          'package.js',
          'jade/**/*.html'
        ],
        overwrite: true,
        replacements: [{
          from: grunt.option( "oldver" ),
          to: grunt.option( "newver" )
        }]
      },
      readme: { // Changes README.md
        src: [
          'README.md'
        ],
        overwrite: true,
        replacements: [{
          from: 'Current Version : v'+grunt.option( "oldver" ),
          to: 'Current Version : v'+grunt.option( "newver" )
        }]
      },
    },

    // Create Version Header for files
    usebanner: {
        release: {
          options: {
            position: 'top',
            banner: "/*!\n * Materialize v"+ grunt.option( "newver" ) +" (http://materializecss.com)\n * Copyright 2014-2015 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */",
            linebreak: true
          },
          files: {
            src: [ 'dist/css/*.css', 'dist/js/*.js']
          }
        }
      },

      // Rename files
      rename: {
          rename_src: {
              src: 'bin/materialize-src'+'.zip',
              dest: 'bin/materialize-src-v'+grunt.option( "newver" )+'.zip',
              options: {
                ignore: true
              }
          },
          rename_compiled: {
              src: 'bin/materialize'+'.zip',
              dest: 'bin/materialize-v'+grunt.option( "newver" )+'.zip',
              options: {
                ignore: true
              }
          },
      }

  });

  // load the tasks
//  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename');

  // define the tasks
  grunt.registerTask(
    'release',[
      'copy',
      'sass:expanded',
      'sass:min',
      'concat:dist',
      'uglify:dist',
      'usebanner:release',
      'compress:main',
      'compress:src',
      'compress:starter_template',
      'compress:parallax_template',
      'replace:version',
      'replace:readme',
      'rename:rename_src',
      'rename:rename_compiled'
    ]
  );

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:temp', 'uglify:bin', 'notify:js_compile', 'clean:temp']);
  grunt.registerTask('sass_compile', ['sass:gh', 'sass:bin', 'notify:sass_compile']);
  grunt.registerTask('start_server', ['connect:server', 'notify:server']);

  grunt.registerTask("monitor", ["concurrent:monitor"]);
};
