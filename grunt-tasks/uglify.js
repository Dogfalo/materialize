'use strict';
//UGLIFY

module.exports = function (grunt) {
    return {
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
    }
};