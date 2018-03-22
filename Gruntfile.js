module.exports = function(grunt) {

  var concatFile = 'temp/js/materialize_concat.js.map';

  // configure the tasks
  var config = {

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
          'css/ghpages-materialize.css': 'sass/ghpages-materialize.scss',
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
        src: 'css/ghpages-materialize.css'
      },
      bin: {
        src: 'bin/materialize.css'
      }
    },

    babel: {
		  options: {
			  sourceMap: false,
			  plugins: [
          'transform-es2015-arrow-functions',
          'transform-es2015-block-scoping',
          'transform-es2015-classes',
          'transform-es2015-template-literals',
          'transform-es2015-object-super'
        ]
		  },
		  bin: {
        options: {
          sourceMap: true
        },
			  files: {
				  'bin/materialize.js': 'temp/js/materialize_concat.js'
			  }
		  },
      dist: {
        files: {
          'dist/js/materialize.js': 'temp/js/materialize.js'
        }
      }
	  },

    // Browser Sync integration
    browserSync: {
      bsFiles: ["bin/*", "css/ghpages-materialize.css", "!**/node_modules/**/*"],
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
          "js/cash.js",
          "js/component.js",
          "js/global.js",
          "js/anime.min.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
          "js/materialbox.js",
          "js/parallax.js",
          "js/tabs.js",
          "js/tooltip.js",
          "js/waves.js",
          "js/toasts.js",
          "js/sidenav.js",
          "js/scrollspy.js",
          "js/autocomplete.js",
          "js/forms.js",
          "js/slider.js",
          "js/cards.js",
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/datepicker.js",
          "js/timepicker.js",
          "js/characterCounter.js",
          "js/carousel.js",
          "js/tapTarget.js",
          "js/select.js",
          "js/range.js",
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        options: {
          sourceMap: true,
          sourceMapStyle: 'link'
        },
        src: [
          "js/cash.js",
          "js/component.js",
          "js/global.js",
          "js/anime.min.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
          "js/materialbox.js",
          "js/parallax.js",
          "js/tabs.js",
          "js/tooltip.js",
          "js/waves.js",
          "js/toasts.js",
          "js/sidenav.js",
          "js/scrollspy.js",
          "js/autocomplete.js",
          "js/forms.js",
          "js/slider.js",
          "js/cards.js",
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/datepicker.js",
          "js/timepicker.js",
          "js/characterCounter.js",
          "js/carousel.js",
          "js/tapTarget.js",
          "js/select.js",
          "js/range.js",
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize_concat.js'
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
          'bin/materialize.min.js': ['bin/materialize.js']
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
          {expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'js/', src: [
            "anime.min.js",
            "cash.js",
            "component.js",
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
            "sidenav.js",
            "scrollspy.js",
            "autocomplete.js",
            "forms.js",
            "slider.js",
            "cards.js",
            "chips.js",
            "pushpin.js",
            "buttons.js",
            "datepicker.js",
            "timepicker.js",
            "characterCounter.js",
            "carousel.js",
            "tapTarget.js",
            "select.js",
            "range.js",
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
          "buttons.html": "jade/buttons.jade",
          "navbar.html": "jade/navbar.jade",
          "cards.html": "jade/cards.jade",
          "preloader.html": "jade/preloader.jade",
          "collections.html": "jade/collections.jade",
          "badges.html": "jade/badges.jade",
          "footer.html": "jade/footer.jade",
          "modals.html": "jade/modals.jade",
          "dropdown.html": "jade/dropdown.jade",
          "tabs.html": "jade/tabs.jade",
          "toasts.html": "jade/toasts.jade",
          "tooltips.html": "jade/tooltips.jade",
          "sidenav.html": "jade/sidenav.jade",
          "pushpin.html": "jade/pushpin.jade",
          "waves.html": "jade/waves.jade",
          "media.html": "jade/media.jade",
          "collapsible.html": "jade/collapsible.jade",
          "scrollspy.html": "jade/scrollspy.jade",
          "fullscreen-slider-demo.html": "jade/fullscreen-slider-demo.jade",
          "pagination.html": "jade/pagination.jade",
          "breadcrumbs.html": "jade/breadcrumbs.jade",
          "carousel.html": "jade/carousel.jade",
          "feature-discovery.html": "jade/feature-discovery.jade",
          "pulse.html": "jade/pulse.jade",
          "pushpin-demo.html": "jade/pushpin-demo.jade",
          "css-transitions.html": "jade/css-transitions.jade",
          "themes.html": "jade/themes.jade",
          "404.html": "jade/404.jade",
          "autocomplete.html": "jade/autocomplete.jade",
          "checkboxes.html": "jade/checkboxes.jade",
          "chips.html": "jade/chips.jade",
          "pickers.html": "jade/pickers.jade",
          "radio-buttons.html": "jade/radio-buttons.jade",
          "range.html": "jade/range.jade",
          "select.html": "jade/select.jade",
          "switches.html": "jade/switches.jade",
          "text-inputs.html": "jade/text-inputs.jade",
          "support-us.html": "jade/support-us.jade",
          "floating-action-button.html": "jade/floating-action-button.jade",
          "auto-init.html": "jade/auto-init.jade"
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
        tasks: ["jade_compile", "sass_compile", "js_compile",
                "watch:jade", "watch:js", "watch:sass",
                "notify:watching", 'server']
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
    }
  };

  grunt.initConfig(config);

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');


  // define the tasks
  grunt.registerTask(
    'release',[
      'sass:expanded',
      'sass:min',
      'postcss:expanded',
      'postcss:min',
      'concat:dist',
      'babel:dist',
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
      'rename:rename_compiled',
      'clean:temp'
    ]
  );

  grunt.task.registerTask("configureBabel", "configures babel options", function() {
    config.babel.bin.options.inputSourceMap = grunt.file.readJSON(concatFile);
  });

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:temp', 'configureBabel', 'babel:bin', 'clean:temp']);
  grunt.registerTask('sass_compile', ['sass:gh', 'sass:bin', 'postcss:gh', 'postcss:bin', 'notify:sass_compile']);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('monitor', ["concurrent:monitor"]);
  grunt.registerTask('travis', ['js_compile', 'sass_compile', 'jasmine']);
};
