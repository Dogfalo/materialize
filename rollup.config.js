import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
  // browser-friendly UMD build
  {
    input: 'js/index.js',
    output: {
      file: 'bin/materialize.js',
      name: 'M',
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      uglify()
    ]
  }
];
