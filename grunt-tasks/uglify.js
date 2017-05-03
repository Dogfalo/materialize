'use strict';

module.exports = function (grunt) {
    return {
        options: {
            // the banner is inserted at the top of the output
            // banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
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
    }
};