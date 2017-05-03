'use strict';

module.exports = function (grunt) {
	return {
		dist: {
			cwd: 'fonts',
			src: ['**'],
			dest: 'dist/fonts',
			expand: true
		},
	};
};