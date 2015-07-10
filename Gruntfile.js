module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
//  Copy
    copy: {
      dist: { cwd: 'font', src: [ '**' ], dest: 'dist/font', expand: true },
    },

//  Sass
    sass: {                              // Task
      expanded: {                            // Target
        options: {                       // Target options
          outputStyle: 'expanded',
          sourcemap: false,
        },
        files: {
          'dist/css/materialize.css': 'sass/materialize.scss',
        }
      },

      min: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/css/materialize.min.css': 'sass/materialize.scss',
        }
      },

      // Compile ghpages css
      gh: {
        options: {
          style: 'compressed',
          sourcemap: false
        },
        files: {
          'css/ghpages-materialize.css': 'sass/ghpages-materialize.scss',
        }
      },

      // Compile ghpages css
      bin: {
        options: {
          style: 'expanded',
          sourcemap: false
        },
        files: {
          'bin/materialize.css': 'sass/materialize.scss',
        }
      }
    },

  // Browser Sync integration
    browserSync: {
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
    },

//  Concat
    concat: {
      options: {
        process: function(src, filepath) {
          var compiler = require('es6-module-clean-transpilation');
          return compiler({src: src, type: 'globals'});
        },
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
              "js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/global.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
              "js/character_counter.js",
             ],
        // the location of the resulting JS file
        dest: 'dist/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        src: [
              "js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/global.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
              "js/character_counter.js",
             ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      }
    },

//  Uglify
    uglify: {
      options: {
        // Use these options when debugging
        // mangle: false,
        // compress: false,
        // beautify: true

      },
      dist: {
        files: {
          'dist/js/materialize.min.js': ['dist/js/materialize.js']
        }
      },
      bin: {
        files: {
          'bin/materialize.js': ['temp/js/materialize.js']
        }
      }
    },


//  Compress
    compress: {
      main: {
        options: {
          archive: 'bin/materialize.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'materialize/'},
          { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize/'},
        ]
      },

      src: {
        options: {
          archive: 'bin/materialize-src.zip',
          level: 6
        },
        files:[
          {expand: true, cwd: 'font/', src: ['**/*'], dest: 'materialize-src/font/'},
          {expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'js/', src: [
              "jquery.easing.1.3.js",
              "animation.js",
              "velocity.min.js",
              "velocity-fix.js",
              "hammer.min.js",
              "jquery.hammer.js",
              "global.js",
              "collapsible.js",
              "dropdown.js",
              "leanModal.js",
              "materialbox.js",
              "parallax.js",
              "tabs.js",
              "tooltip.js",
              "waves.js",
              "toasts.js",
              "sideNav.js",
              "scrollspy.js",
              "forms.js",
              "slider.js",
              "cards.js",
              "pushpin.js",
              "buttons.js",
              "transitions.js",
              "scrollFire.js",
              "date_picker/picker.js",
              "date_picker/picker.date.js",
              "character_counter.js",
             ], dest: 'materialize-src/js/'},
        {expand: true, cwd: 'dist/js/', src: ['**/*'], dest: 'materialize-src/js/bin/'},
        {expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize-src/'}

        ]
      },

      starter_template: {
        options: {
          archive: 'templates/starter-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'starter-template/'},
          { expand: true, cwd: 'templates/starter-template/', src: ['index.html', 'LICENSE'], dest: 'starter-template/'},
          { expand: true, cwd: 'templates/starter-template/css', src: ['style.css'], dest: 'starter-template/css'},
          { expand: true, cwd: 'templates/starter-template/js', src: ['init.js'], dest: 'starter-template/js'}

        ]
      },

      parallax_template: {
        options: {
          archive: 'templates/parallax-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'parallax-template/'},
          { expand: true, cwd: 'templates/parallax-template/', src: ['index.html', 'LICENSE', 'background1.jpg', 'background2.jpg', 'background3.jpg'], dest: 'parallax-template/'},
          { expand: true, cwd: 'templates/parallax-template/css', src: ['style.css'], dest: 'parallax-template/css'},
          { expand: true, cwd: 'templates/parallax-template/js', src: ['init.js'], dest: 'parallax-template/js'}

        ]
      }

    },


//  Clean
   clean: {
     temp: {
       src: [ 'temp/' ]
     },
   },

//  Jade
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          "index.html": "jade/index.jade",
          "icons.html": "jade/icons.jade",
          "about.html": "jade/about.jade",
          "sass.html": "jade/sass.jade",
          "getting-started.html": "jade/getting-started.jade",
          "mobile.html": "jade/mobile.jade",
          "showcase.html": "jade/showcase.jade",
          "parallax.html": "jade/parallax.jade",
          "parallax-demo.html": "jade/parallax-demo.jade",
          "typography.html": "jade/typography.jade",
          "color.html": "jade/color.jade",
          "shadow.html": "jade/shadow.jade",
          "grid.html": "jade/grid.jade",
          "media-css.html": "jade/media-css.jade",
          "table.html": "jade/table.jade",
          "helpers.html": "jade/helpers.jade",
          "forms.html": "jade/forms.jade",
          "buttons.html": "jade/buttons.jade",
          "navbar.html": "jade/navbar.jade",
          "cards.html": "jade/cards.jade",
          "preloader.html": "jade/preloader.jade",
          "collections.html": "jade/collections.jade",
          "badges.html": "jade/badges.jade",
          "footer.html": "jade/footer.jade",
          "dialogs.html": "jade/dialogs.jade",
          "modals.html": "jade/modals.jade",
          "dropdown.html": "jade/dropdown.jade",
          "tabs.html": "jade/tabs.jade",
          "side-nav.html": "jade/sideNav.jade",
          "pushpin.html": "jade/pushpin.jade",
          "waves.html": "jade/waves.jade",
          "media.html": "jade/media.jade",
          "collapsible.html": "jade/collapsible.jade",
          "scrollfire.html": "jade/scrollFire.jade",
          "scrollspy.html": "jade/scrollspy.jade",
          "transitions.html": "jade/transitions.jade",
          "fullscreen-slider-demo.html": "jade/fullscreen-slider-demo.jade",
          "pagination.html": "jade/pagination.jade"


        }
      }
    },

//  Watch Files
    watch: {
      jade: {
        files: ['jade/**/*'],
        tasks: ['jade_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      js: {
        files: [ "js/**/*", "!js/init.js"],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      sass: {
        files: ['sass/**/*'],
        tasks: ['sass_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      }
    },


//  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10,
      },
      monitor: {
        tasks: ["watch:jade", "watch:js", "watch:sass", "notify:watching", 'server']
      },
    },


//  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: "Materialize", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      }
    },

    shell: {
      before_tests: {
        options: {
            stderr: false
        },
        command: 'rm -fr temp-js/; node node_modules/es6-module-clean-transpilation/transpiler.js -t globals -i js/ -o temp-js/'
      }
    },

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
      },

      // Removes console logs
      removelogging: {
          source: {
            src: ["js/**/*.js", "!js/velocity.min.js"],
            options: {
              // see below for options. this is optional.
            }
          }
      },
      // Testem
      testem: {
        'default': {
          src: [
            'bower_components/qunit/qunit/qunit.js',
            'bower_components/jquery/dist/jquery.min.js',
            'temp-js/jquery.easing.1.3.js',
            'temp-js/animation.js',
            'temp-js/velocity.min.js',
            'temp-js/velocity-fix.js',
            'temp-js/hammer.min.js',
            'temp-js/jquery.hammer.js',
            'temp-js/global.js',
            'temp-js/collapsible.js',
            'temp-js/dropdown.js',
            'temp-js/leanModal.js',
            'temp-js/materialbox.js',
            'temp-js/parallax.js',
            'temp-js/tabs.js',
            'temp-js/tooltip.js',
            'temp-js/waves.js',
            'temp-js/toasts.js',
            'temp-js/sideNav.js',
            'temp-js/scrollspy.js',
            'temp-js/forms.js',
            'temp-js/slider.js',
            'temp-js/cards.js',
            'temp-js/pushpin.js',
            'temp-js/buttons.js',
            'temp-js/transitions.js',
            'temp-js/scrollFire.js',
            'temp-js/date_picker/picker.js',
            'temp-js/date_picker/picker.date.js',
            'temp-js/character_counter.js',
            'tests/setup.js',
            'tests/helpers/**/*.js',
            'tests/**/*-test.js'
          ],
          options: {
            framework: "qunit",
            test_page: 'tests/index.mustache?hidepassed',
            launch_in_dev: ['PhantomJS', 'Chrome', 'Firefox'],
            after_tests: "rm -fr temp-js/"
          }
        }
      }

  });

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-testem');
  // define the tasks
  grunt.registerTask(
    'release',[
      'lint',
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
  grunt.registerTask('test', ['shell:before_tests', 'testem:default']);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('lint', ['removelogging:source']);
  grunt.registerTask("monitor", ["concurrent:monitor"]);
};

