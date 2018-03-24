import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';


export default [
	// browser-friendly UMD build
	{
		input: 'js/index.js',
		output: {
      file:'bin/materialize.js',
			name: 'howLongUntilLunch',
			format: 'iife'
		},
		plugins: [

			babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      serve(),
		]
	}
];
