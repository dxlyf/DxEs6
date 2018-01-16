const path=require('path');
let root=path.resolve(__dirname,'../../');
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: path.resolve(root,'node_modules/lodash/template.js'),
  output: {
    file: path.resolve(root, 'dist/lodash-template.js'),
    format: 'umd'
  },
  name:'tempalte',
  plugins: [
    resolve(),
    commonjs()
  ]
};