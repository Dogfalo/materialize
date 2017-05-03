'use strict';
//  Concurrent

module.exports = function (grunt) {
    return {
        options: {
            logConcurrentOutput: true,
            limit: 10,
        },
        monitor: {
            tasks: ["jade_compile", "sass_compile", "js_compile",
                "watch:jade", "watch:js", "watch:sass",
                "notify:watching", 'server']
        },
    }
};