const path=require('path');
let root=path.resolve(__dirname);

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from  'rollup-plugin-json';
export default {
  input: path.resolve(root,'index.js'),
  output: {
    file: path.resolve(root, 'dist/html2hscript.js'),
    format: 'umd',
    name:'Html2hscript'
  },
  plugins: [
    resolve(),
    commonjs(),
    json()
  ]
};

