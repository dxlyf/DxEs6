const path=require('path');
let root=path.resolve(__dirname);

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from  'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import builtins from 'rollup-plugin-node-builtins';
export default {
  input: path.resolve(root,'lib/index.js'),
  output: {
    file: path.resolve(root, 'dist/htmlparser2.js'),
    format: 'umd',
    name:'Htmlparser2',
    sourcemap:false,
    //exports:"__moduleExports",
    // globals:{
    //   'string_decoder':'sd'
    // }
  },
 // external:['string_decoder','events','buffer','util','stream'],

  plugins: [
    builtins(),
    resolve({
      // module:false,
      // jsnext: true,
      // main:false,
      // preferBuiltins: true,  // Default: 
      // // ���Զ���ѡ��ݸ��������
      // customResolveOptions: {
      //   moduleDirectory: 'node_modules'
      // }
    }),
    commonjs({
      include:[],
      sourceMap:false,
     // include: ['./lib/**','node_modules/events/'], 
    //  include: 'node_modules/**',  // Default: undefined
    //  exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      namedExports:{
         './lib/index.js':['__moduleExports']
      // 'node_modules/readable-stream/readable.js':['__moduleExports']
      }
    }),
    json()
  ]
};

/**
 * 
 * �������ʹ��Rollup�������ļ����ǵ��������������--config����-c @@2
 * // rollup.config.js
export default {
  // ����ѡ��
  input,     // ����
  external,
  plugins,

  // ����ѡ��
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // ���� (���Ҫ��������������һ������)
    // ����ѡ��
    file,    // ����
    format,  // ����
    name,
    globals,

    // ����ѡ��
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // ��Σѡ��
    exports,
    amd,
    indent
    strict
  },
};
 * 
*/