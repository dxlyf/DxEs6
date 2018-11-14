const path=require('path');
let root=path.resolve(__dirname);

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
export default {
  input: path.resolve(root,'lib/index.js'),
  output: {
    file: path.resolve(root, 'dist/art-template.js'),
    format: 'umd',
    name:'artTemplate',
    // globals:{
    //   fs: 'empty',
    //   path: 'empty',
    //   process: false
    // },
  
    // paths: {
    //   'html-minifier': 'node-noop',
    //   'fs':'node-noop',
    //   'path':'node-noop',
    //   'process':'node-noop',
    //   'os':'node-noop',
    //   'http':'node-noop',
    //   'https':'node-noop'
    // },
  },
  external:['fs','path','process','html-minifier'],
  plugins: [
    resolve(),
    commonjs({
    //  exclude:['fs','html-minifier']
    })
  ]
};

