'use strict';
// PostCss Autoprefixer
module.exports = function (grunt) {
    var postcss = {
        options: {
            processors: [
                require('autoprefixer')({
                    browsers: [
                        'last 2 versions',
                        'Chrome >= 30',
                        'Firefox >= 30',
                        'ie >= 10',
                        'Safari >= 8']
                })
            ]
        },
        expanded: {
            src: 'dist/css/materialize.css'
        },
        min: {
            src: 'dist/css/materialize.min.css'
        },
        gh: {
            src: 'css/ghpages-materialize.css'
        },
        bin: {
            src: 'bin/materialize.css'
        }
    };
    
    return postcss;
};