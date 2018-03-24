import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync'


export default [
	// browser-friendly UMD build
	{
		input: 'js/index.js',
		output: {
      file:'bin/materialize.js',
			name: 'M',
			format: 'umd'
		},
		plugins: [

			babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      browsersync({
        server: {baseDir: './'},
        port: 8000,
        open: false
      })
		]
	}
];
