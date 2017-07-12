'use strict';

module.exports = function (grunt) {
    return {
        server: {
            options: {
                port: 8000,
                useAvailablePort: true,
                hostname: '*',
                keepalive: true
            }
        }
    }
};