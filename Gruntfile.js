module.exports = function(grunt) {
  let concatFile = 'temp/js/materialize_concat.js.map';

  // configure the tasks
  let config = {
    //  Jasmine
    jasmine: {
      components: {
        src: ['bin/materialize.js'],
        options: {
          vendor: [
            'node_modules/jquery/dist/jquery.min.js'
          ],
          styles: 'bin/materialize.css',
          specs: 'tests/spec/**/*Spec.js',
          helpers: 'tests/spec/helper.js',
          keepRunner: true,
          page: {
            viewportSize: {
                width: 1400,
                height: 735
            }
          },
          sandboxArgs: {
            args: ['--headless', '--no-sandbox']
          },
        }
      }
    },

    //  Sass
    sass: {
      // Task
      expanded: {
        // Target options
        options: {
          outputStyle: 'expanded',
          sourcemap: false
        },
        files: {
          'dist/css/materialize.css': 'sass/materialize.scss'
        }
      },

      min: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/css/materialize.min.css': 'sass/materialize.scss'
        }
      },

      // Compile ghpages css
      gh: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'docs/css/ghpages-materialize.css': 'sass/ghpages-materialize.scss'
        }
      },

      // Compile bin css
      bin: {
        options: {
          outputStyle: 'expanded',
          sourcemap: false
        },
        files: {
          'bin/materialize.css': 'sass/materialize.scss'
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
              'Safari >= 8'
            ]
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
        src: 'docs/css/ghpages-materialize.css'
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
          'transform-es2015-object-super',
          'babel-plugin-transform-object-rest-spread'
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
      bsFiles: ['bin/*', 'css/ghpages-materialize.css', '!**/node_modules/**/*'],
      options: {
        server: {
          baseDir: './' // make server from root dir
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
          'js/cash.js',
          'js/component.js',
          'js/global.js',
          'js/anime.min.js',
          'js/collapsible.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/materialbox.js',
          'js/parallax.js',
          'js/tabs.js',
          'js/tooltip.js',
          'js/waves.js',
          'js/toasts.js',
          'js/sidenav.js',
          'js/scrollspy.js',
          'js/autocomplete.js',
          'js/forms.js',
          'js/slider.js',
          'js/cards.js',
          'js/chips.js',
          'js/pushpin.js',
          'js/buttons.js',
          'js/datepicker.js',
          'js/timepicker.js',
          'js/characterCounter.js',
          'js/carousel.js',
          'js/tapTarget.js',
          'js/select.js',
          'js/range.js'
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
          'js/cash.js',
          'js/component.js',
          'js/global.js',
          'js/anime.min.js',
          'js/collapsible.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/materialbox.js',
          'js/parallax.js',
          'js/tabs.js',
          'js/tooltip.js',
          'js/waves.js',
          'js/toasts.js',
          'js/sidenav.js',
          'js/scrollspy.js',
          'js/autocomplete.js',
          'js/forms.js',
          'js/slider.js',
          'js/cards.js',
          'js/chips.js',
          'js/pushpin.js',
          'js/buttons.js',
          'js/datepicker.js',
          'js/timepicker.js',
          'js/characterCounter.js',
          'js/carousel.js',
          'js/tapTarget.js',
          'js/select.js',
          'js/range.js'
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize_concat.js'
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
        files: [
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'materialize/' },
          { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize/' }
        ]
      },

      src: {
        options: {
          archive: 'bin/materialize-src.zip',
          level: 6
        },
        files: [
          { expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/' },
          { expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/' },
          {
            expand: true,
            cwd: 'js/',
            src: [
              'anime.min.js',
              'cash.js',
              'component.js',
              'global.js',
              'collapsible.js',
              'dropdown.js',
              'modal.js',
              'materialbox.js',
              'parallax.js',
              'tabs.js',
              'tooltip.js',
              'waves.js',
              'toasts.js',
              'sidenav.js',
              'scrollspy.js',
              'autocomplete.js',
              'forms.js',
              'slider.js',
              'cards.js',
              'chips.js',
              'pushpin.js',
              'buttons.js',
              'datepicker.js',
              'timepicker.js',
              'characterCounter.js',
              'carousel.js',
              'tapTarget.js',
              'select.js',
              'range.js'
            ],
            dest: 'materialize-src/js/'
          },
          { expand: true, cwd: 'dist/js/', src: ['**/*'], dest: 'materialize-src/js/bin/' },
          { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize-src/' }
        ]
      },

      starter_template: {
        options: {
          archive: 'templates/starter-template.zip',
          level: 6
        },
        files: [
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'starter-template/' },
          {
            expand: true,
            cwd: 'templates/starter-template/',
            src: ['index.html', 'LICENSE'],
            dest: 'starter-template/'
          },
          {
            expand: true,
            cwd: 'templates/starter-template/css',
            src: ['style.css'],
            dest: 'starter-template/css'
          },
          {
            expand: true,
            cwd: 'templates/starter-template/js',
            src: ['init.js'],
            dest: 'starter-template/js'
          }
        ]
      },

      parallax_template: {
        options: {
          archive: 'templates/parallax-template.zip',
          level: 6
        },
        files: [
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'parallax-template/' },
          {
            expand: true,
            cwd: 'templates/parallax-template/',
            src: ['index.html', 'LICENSE', 'background1.jpg', 'background2.jpg', 'background3.jpg'],
            dest: 'parallax-template/'
          },
          {
            expand: true,
            cwd: 'templates/parallax-template/css',
            src: ['style.css'],
            dest: 'parallax-template/css'
          },
          {
            expand: true,
            cwd: 'templates/parallax-template/js',
            src: ['init.js'],
            dest: 'parallax-template/js'
          }
        ]
      }
    },

    //  Clean
    clean: {
      temp: {
        src: ['temp/']
      }
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
          'docs/index.html': 'jade/index.jade',
          'docs/icons.html': 'jade/icons.jade',
          'docs/about.html': 'jade/about.jade',
          'docs/sass.html': 'jade/sass.jade',
          'docs/getting-started.html': 'jade/getting-started.jade',
          'docs/mobile.html': 'jade/mobile.jade',
          'docs/parallax.html': 'jade/parallax.jade',
          'docs/parallax-demo.html': 'jade/parallax-demo.jade',
          'docs/typography.html': 'jade/typography.jade',
          'docs/color.html': 'jade/color.jade',
          'docs/shadow.html': 'jade/shadow.jade',
          'docs/grid.html': 'jade/grid.jade',
          'docs/media-css.html': 'jade/media-css.jade',
          'docs/table.html': 'jade/table.jade',
          'docs/helpers.html': 'jade/helpers.jade',
          'docs/buttons.html': 'jade/buttons.jade',
          'docs/navbar.html': 'jade/navbar.jade',
          'docs/cards.html': 'jade/cards.jade',
          'docs/preloader.html': 'jade/preloader.jade',
          'docs/collections.html': 'jade/collections.jade',
          'docs/badges.html': 'jade/badges.jade',
          'docs/footer.html': 'jade/footer.jade',
          'docs/modals.html': 'jade/modals.jade',
          'docs/dropdown.html': 'jade/dropdown.jade',
          'docs/tabs.html': 'jade/tabs.jade',
          'docs/toasts.html': 'jade/toasts.jade',
          'docs/tooltips.html': 'jade/tooltips.jade',
          'docs/sidenav.html': 'jade/sidenav.jade',
          'docs/pushpin.html': 'jade/pushpin.jade',
          'docs/waves.html': 'jade/waves.jade',
          'docs/media.html': 'jade/media.jade',
          'docs/collapsible.html': 'jade/collapsible.jade',
          'docs/scrollspy.html': 'jade/scrollspy.jade',
          'docs/fullscreen-slider-demo.html': 'jade/fullscreen-slider-demo.jade',
          'docs/pagination.html': 'jade/pagination.jade',
          'docs/breadcrumbs.html': 'jade/breadcrumbs.jade',
          'docs/carousel.html': 'jade/carousel.jade',
          'docs/feature-discovery.html': 'jade/feature-discovery.jade',
          'docs/pulse.html': 'jade/pulse.jade',
          'docs/pushpin-demo.html': 'jade/pushpin-demo.jade',
          'docs/css-transitions.html': 'jade/css-transitions.jade',
          'docs/404.html': 'jade/404.jade',
          'docs/autocomplete.html': 'jade/autocomplete.jade',
          'docs/checkboxes.html': 'jade/checkboxes.jade',
          'docs/chips.html': 'jade/chips.jade',
          'docs/pickers.html': 'jade/pickers.jade',
          'docs/radio-buttons.html': 'jade/radio-buttons.jade',
          'docs/range.html': 'jade/range.jade',
          'docs/select.html': 'jade/select.jade',
          'docs/switches.html': 'jade/switches.jade',
          'docs/text-inputs.html': 'jade/text-inputs.jade',
          'docs/floating-action-button.html': 'jade/floating-action-button.jade',
          'docs/auto-init.html': 'jade/auto-init.jade'
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
          spawn: false
        }
      },

      js: {
        files: ['js/**/*', '!js/init.js'],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false
        }
      },

      sass: {
        files: ['sass/**/*'],
        tasks: ['sass_compile'],
        options: {
          interrupt: false,
          spawn: false
        }
      }
    },

    //  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10
      },
      monitor: {
        tasks: [
          'jade_compile',
          'sass_compile',
          'js_compile',
          'watch:jade',
          'watch:js',
          'watch:sass',
          'notify:watching',
          'server'
        ]
      }
    },

    //  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: 'Materialize', // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: 'Materialize',
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: 'Materialize',
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: 'Materialize',
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: 'Materialize',
          success: true,
          duration: 1
        }
      }
    },

    // Replace text to update the version string
    replace: {
      version: {
        src: ['bower.json', 'package.js', 'jade/**/*.html'],
        overwrite: true,
        replacements: [
          {
            from: grunt.option('oldver'),
            to: grunt.option('newver')
          }
        ]
      },
      package_json: {
        src: ['package.json'],
        overwrite: true,
        replacements: [
          {
            from: '"version": "' + grunt.option('oldver'),
            to: '"version": "' + grunt.option('newver')
          }
        ]
      },
      docs: {
        src: ['.gitignore'],
        overwrite: true,
        replacements: [
          {
            from: '/docs/*.html',
            to: ''
          }
        ]
      }
    },

    // Create Version Header for files
    usebanner: {
      release: {
        options: {
          position: 'top',
          banner:
            '/*!\n * Materialize v' +
            grunt.option('newver') +
            ' (https://materializecss.github.io/materialize)\n * Copyright 2014-2021 Materialize\n * MIT License (https://raw.githubusercontent.com/materializecss/materialize/master/LICENSE)\n */',
          linebreak: true
        },
        files: {
          src: ['dist/css/*.css', 'dist/js/*.js']
        }
      }
    },

    // Rename files
    rename: {
      rename_src: {
        src: 'bin/materialize-src' + '.zip',
        dest: 'bin/materialize-src-v' + grunt.option('newver') + '.zip',
        options: {
          ignore: true
        }
      },
      rename_compiled: {
        src: 'bin/materialize' + '.zip',
        dest: 'bin/materialize-v' + grunt.option('newver') + '.zip',
        options: {
          ignore: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          protocol: 'http',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next){
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Credentials', true);
              res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
              next();
            });
            return middlewares
          }
        }
      }
    },

    copy: {
      docs: {
        src: 'bin/materialize.js', dest: 'docs/js/materialize.js'
      }
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // define the tasks
  grunt.registerTask('release', [
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
    'replace:package_json',
    'rename:rename_src',
    'rename:rename_compiled',
    'clean:temp'
  ]);

  grunt.task.registerTask('configureBabel', 'configures babel options', function() {
    config.babel.bin.options.inputSourceMap = grunt.file.readJSON(concatFile);
  });

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:temp', 'configureBabel', 'babel:bin', 'clean:temp']);
  grunt.registerTask('sass_compile', [
    'sass:gh',
    'sass:bin',
    'postcss:gh',
    'postcss:bin',
    'notify:sass_compile'
  ]);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('monitor', ['concurrent:monitor']);
  grunt.registerTask('travis', ['js_compile', 'sass_compile', 'connect', 'jasmine']);
  grunt.registerTask('jas_test', ['connect', 'jasmine']);
  grunt.registerTask('test_repeat', function(){
    const tasks = ['connect'];
    const n = 30;
    for (let i = 0; i < n; i++) {
      tasks.push('jasmine');
    }

    grunt.task.run(tasks);

  });
  grunt.registerTask('docs', ['js_compile', 'copy:docs', 'sass:gh',  'postcss:gh', 'jade', 'replace:docs']);
};
