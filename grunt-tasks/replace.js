'use strict';
//TEXT replace

module.exports = function (grunt) {
    return {
        version: { // Does not edit README.md
            src: [
                'bower.json',
                'package.json',
                'package.js',
                'jade/**/*.html'
            ],
            overwrite: true,
            replacements: [{
                from: grunt.option("oldver"),
                to: grunt.option("newver")
            }]
        },
        readme: { // Changes README.md
            src: [
                'README.md'
            ],
            overwrite: true,
            replacements: [{
                from: 'Current Version : v' + grunt.option("oldver"),
                to: 'Current Version : v' + grunt.option("newver")
            }]
        },
    }Î
};