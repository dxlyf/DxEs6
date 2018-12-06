const path=require('path');
let root=path.resolve(__dirname);
// rollup -i 
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from  'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import builtins from 'rollup-plugin-node-builtins';
import { uglify } from "rollup-plugin-uglify";
import globals from 'rollup-plugin-node-globals';
export default {
  input: path.resolve(root,'lib/index.js'),
  output: {
    file: path.resolve(root, 'dist/htmlparser2.js'),
    format: 'umd',
    name:'HtmlParser2',
    sourcemap:false,
    context:'window',
   // intro:'var global=window,process={};',
   // outro:'lib_1=lib;'
    /** 
     * legacy
为了增加对诸如IE8之类的旧版环境的支持，通过剥离更多可能无法正常工作的现代化的代码，其代价是偏离ES6模块环境所需的精确规范。

exports
String 使用什么导出模式。默认为auto，它根据entry模块导出的内容猜测你的意图：

default – 如果你使用 export default ... 仅仅导出一个东西，那适合用这个
named – 如果你导出多个东西，适合用这个
none – 如果你不导出任何内容 (例如，你正在构建应用程序，而不是库)，则适合用这个
default 和 named之间的区别会影响其他人如何使用文件束(bundle)。如果您使用default，则Common
     * */
    exports:"named"
    // globals:{
    //   'global':'sd'
    // }
  },
  //external:['process'],

  plugins: [
    // {
    //   transform(s,id){
    //     console.log(s);
    //   },
    //   resolveId:function(importee, importer){
       
    //   }
    // },
    builtins(),
    globals(),
    // alias({
    //   '__moduleExports':'$'
    // }),
    resolve({
      //browser :true,
      preferBuiltins:true
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
   //   include:[''],
    //  sourceMap:true,
    // include: ['./lib/*.js','node_modules/**/*.js'], 
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

命令行的参数(Command line flags)
配置文件中的许多选项和命令行的参数是等价的。如果你使用这里的参数，那么将重写配置文件。想了解更多的话，仔细查阅这个包办大量选项的清单

-i, --input                 要打包的文件（必须）
-o, --output.file           输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --output.format [es]    输出的文件类型 (amd, cjs, es, iife, umd)
-e, --external              将模块ID的逗号分隔列表排除
-g, --globals               以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name                  生成UMD模块的名字
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）
 * 
*/