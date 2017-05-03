'use strict';
// Rename files

module.exports = function (grunt) {
    return {
        rename_src: {
            src: 'bin/materialize-src' + '.zip',
            dest: 'bin/materialize-src-v' + grunt.option("newver") + '.zip',
            options: {
                ignore: true
            }
        },
        rename_compiled: {
            src: 'bin/materialize' + '.zip',
            dest: 'bin/materialize-v' + grunt.option("newver") + '.zip',
            options: {
                ignore: true
            }
        },
    }
};