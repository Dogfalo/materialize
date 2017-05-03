'use strict';

module.exports = function (grunt) {
    return {
        jade: {
            files: ['jade/**/*'],
            tasks: ['jade_compile'],
            options: {
                interrupt: false,
                spawn: false,
            },
        },

        js: {
            files: ["js/**/*", "!js/init.js"],
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
    }
};