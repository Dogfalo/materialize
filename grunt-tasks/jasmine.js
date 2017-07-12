'use strict';

module.exports = function (grunt) {
    var jasmine = {
        components: {
            src: [
                'bin/materialize.js'
            ],
            options: {
                vendor: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                ],
                styles: 'bin/materialize.css',
                specs: 'tests/spec/**/*Spec.js',
                helpers: 'tests/spec/helper.js',
                keepRunner: true,
                //helpers: 'test/spec/*.js'
            }
        }
    };
    return jasmine;
};