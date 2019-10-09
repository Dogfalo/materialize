import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';

export default [
  // browser-friendly UMD build
  {
    input: 'js/index.js',
    output: {
      file: 'bin/materialize.js',
      name: 'M',
      format: 'umd',
      globals: {
        window: 'window'
      }
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
      // minify({
      //   // Options for babel-minify.
      // })
    ]
  }
];
