'use strict';

module.exports = function (grunt) {
	return {
		dist: {
			cwd: 'font',
			src: ['**'],
			dest: 'dist/font',
			expand: true
		},
	};
};