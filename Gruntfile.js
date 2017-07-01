module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
    //  Copy
    copy: {
      dist: { cwd: 'fonts', src: [ '**' ], dest: 'dist/fonts', expand: true },
    },

    //  Jasmine
    jasmine: {
      components: {
        src: [
          'bin/materialize.js'
        ],
        options: {
          vendor: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
          ],
          styles: 'bin/materialize.css',
          specs: 'tests/spec/**/*Spec.js',
          helpers: 'tests/spec/helper.js',
          keepRunner : true,
          //helpers: 'test/spec/*.js'
        }
      }
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
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'docs/assets/css/ghpages-materialize.css': 'docs/assets/scss/ghpages-materialize.scss',
        }
      },

      // Compile bin css
      bin: {
        options: {
          outputStyle: 'expanded',
          sourcemap: false
        },
        files: {
          'bin/materialize.css': 'sass/materialize.scss',
        }
      }
    },

    // PostCss Autoprefixer
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 2 versions',
              'Chrome >= 30',
              'Firefox >= 30',
              'ie >= 10',
              'Safari >= 8']
          })
        ]
      },
      expanded: {
        src: 'dist/css/materialize.css'
      },
      min: {
        src: 'dist/css/materialize.min.css'
      },
      gh: {
        src: 'docs/assets/css/ghpages-materialize.css'
      },
      bin: {
        src: 'bin/materialize.css'
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
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
          "js/initial.js",
          "js/jquery.easing.1.4.js",
          "js/animation.js",
          "js/velocity.min.js",
          "js/hammer.min.js",
          "js/jquery.hammer.js",
          "js/global.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
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
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/transitions.js",
          "js/scrollFire.js",
          "js/date_picker/picker.js",
          "js/date_picker/picker.date.js",
          "js/date_picker/picker.time.js",
          "js/character_counter.js",
          "js/carousel.js",
          "js/tapTarget.js",
        ],
        // the location of the resulting JS file
        dest: 'dist/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        src: [
          "js/initial.js",
          "js/jquery.easing.1.4.js",
          "js/animation.js",
          "js/velocity.min.js",
          "js/hammer.min.js",
          "js/jquery.hammer.js",
          "js/global.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
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
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/transitions.js",
          "js/scrollFire.js",
          "js/date_picker/picker.js",
          "js/date_picker/picker.date.js",
          "js/date_picker/picker.time.js",
          "js/character_counter.js",
          "js/carousel.js",
          "js/tapTarget.js",
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
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
      },
      extras: {
        files: {
          'extras/noUiSlider/nouislider.min.js': ['extras/noUiSlider/nouislider.js']
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
          {expand: true, cwd: 'fonts/', src: ['**/*'], dest: 'materialize-src/fonts/'},
          {expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'js/', src: [
            "initial.js",
            "jquery.easing.1.4.js",
            "animation.js",
            "velocity.min.js",
            "hammer.min.js",
            "jquery.hammer.js",
            "global.js",
            "collapsible.js",
            "dropdown.js",
            "modal.js",
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
            "chips.js",
            "pushpin.js",
            "buttons.js",
            "transitions.js",
            "scrollFire.js",
            "date_picker/picker.js",
            "date_picker/picker.date.js",
            "date_picker/picker.time.js",
            "character_counter.js",
            "carousel.js",
            "tapTarget.js",
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
          "index.html": "docs/index.jade",
          "icons.html": "docs/icons.jade",
          "about.html": "docs/about.jade",
          "sass.html": "docs/sass.jade",
          "getting-started.html": "docs/getting-started.jade",
          "mobile.html": "docs/mobile.jade",
          "showcase.html": "docs/showcase.jade",
          "parallax.html": "docs/parallax.jade",
          "parallax-demo.html": "docs/parallax-demo.jade",
          "typography.html": "docs/typography.jade",
          "color.html": "docs/color.jade",
          "shadow.html": "docs/shadow.jade",
          "grid.html": "docs/grid.jade",
          "media-css.html": "docs/media-css.jade",
          "table.html": "docs/table.jade",
          "helpers.html": "docs/helpers.jade",
          "forms.html": "docs/forms.jade",
          "buttons.html": "docs/buttons.jade",
          "navbar.html": "docs/navbar.jade",
          "cards.html": "docs/cards.jade",
          "preloader.html": "docs/preloader.jade",
          "collections.html": "docs/collections.jade",
          "badges.html": "docs/badges.jade",
          "footer.html": "docs/footer.jade",
          "dialogs.html": "docs/dialogs.jade",
          "modals.html": "docs/modals.jade",
          "dropdown.html": "docs/dropdown.jade",
          "tabs.html": "docs/tabs.jade",
          "side-nav.html": "docs/sideNav.jade",
          "pushpin.html": "docs/pushpin.jade",
          "waves.html": "docs/waves.jade",
          "media.html": "docs/media.jade",
          "collapsible.html": "docs/collapsible.jade",
          "chips.html": "docs/chips.jade",
          "scrollfire.html": "docs/scrollFire.jade",
          "scrollspy.html": "docs/scrollspy.jade",
          "transitions.html": "docs/transitions.jade",
          "fullscreen-slider-demo.html": "docs/fullscreen-slider-demo.jade",
          "pagination.html": "docs/pagination.jade",
          "breadcrumbs.html": "docs/breadcrumbs.jade",
          "carousel.html": "docs/carousel.jade",
          "feature-discovery.html": "docs/feature-discovery.jade",
          "pulse.html": "docs/pulse.jade",
          "pushpin-demo.html": "docs/pushpin-demo.jade",
          "css-transitions.html": "docs/css-transitions.jade",
          "themes.html": "docs/themes.jade",
          "404.html": "docs/404.jade",

        }
      }
    },

    //  Watch Files
    watch: {
      jade: {
        files: ['docs/**/*'],
        tasks: ['jade_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      js: {
        files: [ "js/**/*" ],
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
      },

      gh: {
        files: ['docs/assets/scss/**/*'],
        tasks: ['gh_compile'],
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
        tasks: ["jade_compile", "sass_compile", "js_compile",
                "gh_compile", "watch:gh", "watch:jade",
                "watch:js", "watch:sass", "notify:watching",
                "server"]
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

      gh_compile: {
        options: {
          enabled: true,
          message: 'Docs Sass Compiled!',
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

    // Text Replace
    replace: {
      version: { // Does not edit README.md
        src: [
          'bower.json',
          'package.json',
          'package.js',
          'docs/**/*.html'
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
          banner: "/*!\n * Materialize v"+ grunt.option( "newver" ) +" (http://materializecss.com)\n * Copyright 2014-2017 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */",
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
  });

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
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
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename-util');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-postcss');
  // define the tasks
  grunt.registerTask(
    'release',[
      'lint',
      'copy',
      'sass:expanded',
      'sass:min',
      'postcss:expanded',
      'postcss:min',
      'concat:dist',
      'uglify:dist',
      'uglify:extras',
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
  grunt.registerTask('sass_compile', ['sass:bin', 'postcss:bin', 'notify:sass_compile']);
  grunt.registerTask('gh_compile', ['sass:gh', 'postcss:gh', 'notify:gh_compile']);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('lint', ['removelogging:source']);
  grunt.registerTask('monitor', ["concurrent:monitor"]);
  grunt.registerTask('travis', ['js_compile', 'sass_compile', 'jasmine']);
};
