'use strict';

module.exports = function (grunt) {
	var copy = {
		dist: {
			cwd: 'fonts',
			src: ['**'],
			dest: 'dist/fonts',
			expand: true
		},
	};
	return copy;
};