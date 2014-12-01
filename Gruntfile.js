module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
    
    
    
//  Git Info
//    gitinfo: {
//        options: {
//          
//        },
//        ...
//    },

//  Copy
    copy: {
      dist: { cwd: 'font', src: [ '**' ], dest: 'dist/font', expand: true },
    },
    
//  Sass
    sass: {                              // Task
      expanded: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {                         
          'dist/css/materialize.css': 'sass/materialize.scss',
        }
      },
      
      min: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {                         
          'dist/css/materialize.min.css': 'sass/materialize.scss',
        }
      }
    },
    
//  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ["js/jquery.easing.1.3.js",
             "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
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
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
             ],
        // the location of the resulting JS file
        dest: 'dist/js/materialize.js'
      }
    },


//  Uglify
    uglify: {
      options: {
              
        // the banner is inserted at the top of the output
//        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/materialize.min.js': ['dist/js/materialize.js']
        }
      },
      bin: {
        files: {
          'bin/materialize.js': ['dist/js/materialize.js']
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
          {expand: true, cwd: 'js/', src: ["jquery.easing.1.3.js",
             "velocity.min.js",
              "hammer.min.js",
              "jquery.hammer.js",
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
              "date_picker/picker.js",
              "date_picker/picker.date.js",
             ], dest: 'materialize-src/js/'},
        {expand: true, cwd: 'dist/js/', src: ['**/*'], dest: 'materialize-src/js/bin/'},
        {expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize-src/'}
        
        ]
      }
    },
                   
    
//  Clean
    clean: {
      build: {
        src: [ 'dist/' ]
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
          "about.html": "jade/about.jade",
          "getting_started.html": "jade/getting_started.jade",
          "sass.html": "jade/sass.jade",
          "components.html": "jade/components.jade",
          "javascript.html": "jade/javascript.jade",
          "mobile.html": "jade/mobile.jade",
          "parallax.html": "jade/parallax.jade"

        }
      }
    },               
                   
//  Watch Files
    watch: {
      jade: {
        files: ['jade/**/*'],
        tasks: ['pages'],
        options: {
          spawn: false,
        },
      },
                   
      js: {
        files: ["js/jquery.easing.1.3.js",
                "js/velocity.min.js",
                 "js/hammer.min.js",
                 "js/jquery.hammer.js",
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
                 "js/date_picker/picker.js",
                 "js/date_picker/picker.date.js",
             ],
        tasks: ['js_compile'],
        options: {
          spawn: false,
        },
      },
    },
                   
                   
//  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      monitor: {
        tasks: ["watch:jade", "watch:js"]
      },
    }

    
    
  });
 
  // load the tasks
//  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concurrent');

 
  // define the tasks
  grunt.registerTask('default', ['copy', 'sass:expanded', 'sass:min', 'concat', 'uglify:dist', 'compress:main', 'compress:src', 'clean']);
  
  grunt.registerTask('pages', ['jade']);
  grunt.registerTask('js_compile', ['concat:dist', 'uglify:bin', 'clean'])
  
  grunt.registerTask("monitor", ["concurrent:monitor"]);
};