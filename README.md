# DxEs6
## ES6 开发编译环境
### 安装编译环境
#### 打包插件webpack
npm install --save-dev webpack  
配置合并  
npm install --save-dev webpack-merge     
[压缩代码](https://github.com/webpack-contrib/babel-minify-webpack-plugin)   
npm install babel-minify-webpack-plugin --save-dev   

        const MinifyPlugin = require("babel-minify-webpack-plugin");
        module.exports = {
        entry: //...,
        output: //...,
        plugins: [
            new MinifyPlugin(minifyOpts, pluginOpts)
        ]
        }

**插件** 
清除文件夹         
npm install clean-webpack-plugin --save-dev   
创建HTML文件      
npm install --save-dev html-webpack-plugin    
创建热插件   
npm install --save-dev express webpack-dev-middleware     
创建css 加载
npm install --save-dev style-loader css-loader     
创建 公共js 

            {
        name: string, // or
        names: string[],
        // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
        // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
        // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
        // 否则 `options.filename` 会用于作为 chunk 名。
        // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
        // chunk name here instead of omitting the `option.name`.

        filename: string,
        // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
        // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
        // This option is not permitted if you're using `options.async` as well, see below for more details.

        minChunks: number|Infinity|function(module, count) -> boolean,
        // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
        // 数量必须大于等于2，或者少于等于 chunks的数量
        // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
        // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

        chunks: string[],
        // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
        // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。


        children: boolean,
        // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择

        deepChildren: boolean,
        // If `true` all descendants of the commons chunk are selected

        async: boolean|string,
        // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
        // 它会与 `options.chunks` 并行被加载。
        // Instead of using `option.filename`, it is possible to change the name of the output file by providing
        // the desired string here instead of `true`.

        minSize: number,
        // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。

**loader 加载器**
创建jsx 解析   
npm install --save-dev @babel/plugin-syntax-jsx

#### 安装es6编译插件
npm install --save-dev babel-loader babel-core
创建.babelrc配置文件 Env预设
npm install babel-preset-env --save-dev

        {
        "presets": ["env",{
        "targets":{
            "chrome":52
        },
              "modules": 'commonjs',
               "useBuiltIns": false,
               "debug": true
              }],
              "plugins": [],
              "ignore": []
        }
没有任何配置选项，babel-preset-env与babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。
##### babel-core 

        可选参数	默认值	描述
        ast	true	返回值对象中包含 AST
        auxiliaryCommentAfter	null	在所有非用户编写代码后附加注释。
        auxiliaryCommentBefore	null	在所有非用户编写代码前附加注释。
        babelrc	true	指定是否使用 .babelrc 和 babelignore 文件。 使用 CLI 工具时不能使用该选项，请使用 --no-babelrc 代替。
        code	true	是否启用代码生成选项。
        comments	true	生成的代码中是否添加注释。
        compact	"auto"	不要包含多余的空格符和换行符。设置为 "auto" 时，当输入大小 > 500KB 时，compact会被设置为 true。
        env	{}	这是表示不同环境的键的对象。例如，当环境变量 BABEL_ENV 设置为 "production" 时，可以像这样设置 { env: { production: { /* specific options */ } } }。如果 BABEL_ENV 未设置，那么 NODE_ENV 将被启用，如果 NODE_ENV 也未被设置，则默认为 "development" 环境。
        extends	null	扩展 .babelrc 文件的路径
        filename	"unknown"	使用错误的文件名等。
        filenameRelative	(filename)	相对于 sourceRoot 的文件名。
        generatorOpts	{}	包含要传递给 babel 代码生成器(babel-generator)的选项对象。
        getModuleId	null	指定一个自定义回调来生成模块 ID 。调用方式为 getModuleId(moduleName)。如果返回值为 falsy ，则说明生成的模块 ID 被使用。
        highlightCode	true	ANSI 错误语法高亮显示。
        ignore	null	与 only 选项相对。如果只指定 only，则 ignore 则被忽略。
        inputSourceMap	null	输出的 source map 将基于该 source map 对象。
        minified	false	保证输出最小化(不输出代码块最后一个分号，输出文字为字符串而不是转义字符串，安全情况下 new 后的 () 会被去除)
        moduleId	null	指定模块 ID 的自定义名称。
        moduleIds	false	如果值为 true，为模块添加一个明确的 ID 。默认情况下，所有模块都是匿名的。(不适用于 common 模块)
        moduleRoot	(sourceRoot)	AMD 模块格式化程序的可选前缀，可以被预先添加到模块定义的文件名当中。
        only	null	可填入一个 glob，正则表达式或者混合数组，只编译匹配到的路径。也可以是包含明确匹配路径的数组。在尝试编译非匹配的文件时，它将原样返回。
        parserOpts	{}	需要传递给 babel 解析器，babylon 的选项对象
        plugins	[]	需要加载和使用的 plugin 列表。
        presets	[]	需要加载和使用的 preset (一组 plugin ) 列表。
        retainLines	false	保留行号。这将导致代码变得很古怪，但对于不能使用 source map 的场景来说很方便。(注意: 这不会对列进行保留)
        resolveModuleSource	null	解析模块入口，例如 import "SOURCE"; 引入自定义值。具体调用为 resolveModuleSource(source, filename) 。
        shouldPrintComment	null	一个可选的回调，控制是否需要输出注释。具体调用为 shouldPrintComment(commentContents) 。 注意: 该选项使用时会覆盖 comment 选项。
        sourceFileName	(filenameRelative)	在返回的 source map 上设置 sources[0]。
        sourceMaps	false	如果为 true ，添加一个 map 属性在输出的返回值中。如果设置为 "inline" ，带有sourceMappingURL指令的注释被添加到返回代码的底部。如果设置为 "both" ，则会返回 map 属性并追加 source map 注释。它不会自己生成 sourcemap 文件！ 要想让 CLI 生成 sourcemap ，你必须给它传递 --source-maps 选项。
        sourceMapTarget	(filenameRelative)	在返回 souremap 时设置 file。
        sourceRoot	(moduleRoot)	所有 source 都是相对于 root 的。
        sourceType	"module"	设置 babel 解析代码的模式。可以设置为 “script” 或 “module” 。
        wrapPluginVisitorMethod	null	可用于包装访问者模式的可选回调。注意: 这对于自我检查这样的事是有必要的，并且不需要实现任何方法。具体调用为 wrapPluginVisitorMethod(pluginAlias, visitorType, callback) 。

##### 填充  
es6语法填充它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 babel-node 时自动加载。
这意味着你可以使用新的内置对象比如 Promise 或者 WeakMap, 静态方法比如 Array.from 或者 Object.assign, 实例方法比如 Array.prototype.includes 和生成器函数（提供给你使用 regenerator 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 String 一样。    
npm install --save babel-polyfill

##### jsx 解析和转换  
npm install --save-dev babel-plugin-syntax-jsx 解析      
npm install --save-dev babel-plugin-transform-react-jsx 转换    

##### 插件    
在大多数情况下，您应该将其babel-plugin-transform-runtime作为开发依赖项（with --save-dev）进行安装。  
 npm install --save-dev babel-plugin-transform-runtime   

#### 安装开发依赖
npm install vue element-ui lodash -S