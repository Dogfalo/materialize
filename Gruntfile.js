const sass = require('sass');

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
          version: '3.8.0',
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

      // Global options
      options: {
        implementation: sass
      },

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

    //  Pug
    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'docs/index.html': 'pug/index.pug',
          'docs/icons.html': 'pug/icons.pug',
          'docs/about.html': 'pug/about.pug',
          'docs/sass.html': 'pug/sass.pug',
          'docs/getting-started.html': 'pug/getting-started.pug',
          'docs/mobile.html': 'pug/mobile.pug',
          'docs/parallax.html': 'pug/parallax.pug',
          'docs/parallax-demo.html': 'pug/parallax-demo.pug',
          'docs/typography.html': 'pug/typography.pug',
          'docs/color.html': 'pug/color.pug',
          'docs/shadow.html': 'pug/shadow.pug',
          'docs/grid.html': 'pug/grid.pug',
          'docs/media-css.html': 'pug/media-css.pug',
          'docs/table.html': 'pug/table.pug',
          'docs/helpers.html': 'pug/helpers.pug',
          'docs/buttons.html': 'pug/buttons.pug',
          'docs/navbar.html': 'pug/navbar.pug',
          'docs/cards.html': 'pug/cards.pug',
          'docs/preloader.html': 'pug/preloader.pug',
          'docs/collections.html': 'pug/collections.pug',
          'docs/badges.html': 'pug/badges.pug',
          'docs/footer.html': 'pug/footer.pug',
          'docs/modals.html': 'pug/modals.pug',
          'docs/dropdown.html': 'pug/dropdown.pug',
          'docs/tabs.html': 'pug/tabs.pug',
          'docs/toasts.html': 'pug/toasts.pug',
          'docs/tooltips.html': 'pug/tooltips.pug',
          'docs/sidenav.html': 'pug/sidenav.pug',
          'docs/pushpin.html': 'pug/pushpin.pug',
          'docs/waves.html': 'pug/waves.pug',
          'docs/media.html': 'pug/media.pug',
          'docs/collapsible.html': 'pug/collapsible.pug',
          'docs/scrollspy.html': 'pug/scrollspy.pug',
          'docs/fullscreen-slider-demo.html': 'pug/fullscreen-slider-demo.pug',
          'docs/pagination.html': 'pug/pagination.pug',
          'docs/breadcrumbs.html': 'pug/breadcrumbs.pug',
          'docs/carousel.html': 'pug/carousel.pug',
          'docs/feature-discovery.html': 'pug/feature-discovery.pug',
          'docs/pulse.html': 'pug/pulse.pug',
          'docs/pushpin-demo.html': 'pug/pushpin-demo.pug',
          'docs/css-transitions.html': 'pug/css-transitions.pug',
          'docs/404.html': 'pug/404.pug',
          'docs/autocomplete.html': 'pug/autocomplete.pug',
          'docs/checkboxes.html': 'pug/checkboxes.pug',
          'docs/chips.html': 'pug/chips.pug',
          'docs/pickers.html': 'pug/pickers.pug',
          'docs/radio-buttons.html': 'pug/radio-buttons.pug',
          'docs/range.html': 'pug/range.pug',
          'docs/select.html': 'pug/select.pug',
          'docs/switches.html': 'pug/switches.pug',
          'docs/text-inputs.html': 'pug/text-inputs.pug',
          'docs/floating-action-button.html': 'pug/floating-action-button.pug',
          'docs/auto-init.html': 'pug/auto-init.pug'
        }
      }
    },

    //  Watch Files
    watch: {
      pug: {
        files: ['pug/**/*'],
        tasks: ['pug_compile'],
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
          'pug_compile',
          'sass_compile',
          'js_compile',
          'watch:pug',
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

      pug_compile: {
        options: {
          enabled: true,
          message: 'Pug Compiled!',
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
        src: ['bower.json', 'package.js', 'pug/**/*.html'],
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
            return middlewares;
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
  grunt.loadNpmTasks('grunt-contrib-pug');
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

  grunt.registerTask('pug_compile', ['pug', 'notify:pug_compile']);
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
  grunt.registerTask('docs', ['js_compile', 'copy:docs', 'sass:gh',  'postcss:gh', 'pug', 'replace:docs']);
};
