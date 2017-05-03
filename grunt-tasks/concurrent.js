'use strict';

module.exports = function (grunt) {
    return {
        options: {
            logConcurrentOutput: true
        },
        monitor: {
            tasks: ["watch:jade", "watch:js", "watch:sass", "notify:watching", 'connect:server', 'notify:server']
        },
    }
};