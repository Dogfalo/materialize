'use strict';

module.exports = function (grunt) {
    var sass = {                              
        expanded: {                           
            options: {                       
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
    };

    return sass;
};