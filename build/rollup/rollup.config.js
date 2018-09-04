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
      // // 将自定义选项传递给解析插件
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
 * 如果你想使用Rollup的配置文件，记得在命令行里加上--config或者-c @@2
 * // rollup.config.js
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};
 * 
*/