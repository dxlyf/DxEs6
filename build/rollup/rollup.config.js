const path=require('path');
let root=path.resolve(__dirname);

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: path.resolve(root,'index.js'),
  output: {
    file: path.resolve(root, 'dist/virtual-dom2.js'),
    format: 'umd'
  },
  name:'virtualDom',
  plugins: [
    resolve(),
    commonjs()
  ]
};

const path=require('path');
let root=path.resolve(__dirname);

import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: path.resolve(root,'src/snabbdom.bundle.ts'),
  output: {
    file: path.resolve(root, 'dist/snabbdom-rollup.js'),
    format: 'iife',
  //  outro:'window.snabbdom=snabbdomBundle',
    interop:true,
  //  exports:"none"
  },

  name:'snabbdom',
  plugins: [
    typescript()
  ]
};