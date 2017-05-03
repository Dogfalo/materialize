module.exports = function(grunt) {

  var configs = require('load-grunt-config')(grunt, {
    configPath: __dirname + '/grunt-tasks',
    data: {
      pkg: grunt.file.readJSON("package.json")
    }
  });

  // configure the tasks
  grunt.initConfig({
     
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
