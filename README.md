# DxEs6
## ES6 开发编译环境
- [webpack plugins](#innerPlugin)
- [wepack loader](#loader)
### 安装编译环境  [webpack](https://doc.webpack-china.org/)
npm install webpack  --save-dev  [编译](https://www.npmjs.com/package/webpack)
npm install webpack-merge  --save-dev  [配置合并](https://www.npmjs.com/package/webpack-merge)   
 

        const MinifyPlugin = require("babel-minify-webpack-plugin");
        module.exports = {
        entry: //...,
        output: //...,
        plugins: [
            new MinifyPlugin(minifyOpts, pluginOpts)
        ]
        }

#### webpack NPM插件
- npm install babel-minify-webpack-plugin --save-dev   [压缩代码](https://github.com/webpack-contrib/babel-minify-webpack-plugin)     
- npm install clean-webpack-plugin --save-dev   清除文件夹    
- npm install --save-dev html-webpack-plugin    创建HTML文件   
- npm install --save-dev express webpack-dev-middleware  创建热插件       
- npm install --save-dev extract-text-webpack-plugin 提取外部css   
#### webpack 内部插件 {#innerPlugin}
插件 | 描术
-|-
webpack.optimize.CommonsChunkPlugin  | 创建 公共js 
BabelMinifyWebpackPlugin | 使用 babel-minify进行压缩
BannerPlugin | 在每个生成的 chunk 顶部添加 banner
CommonsChunkPlugin | 提取 chunks 之间共享的通用模块
ComponentWebpackPlugin | 通过 webpack 使用组件
CompressionWebpackPlugin | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
ContextReplacementPlugin | 重写 require 表达式的推断上下文
DefinePlugin | 允许在编译时(compile time)配置的全局常量
DllPlugin | 为了极大减少构建时间，进行分离打包
EnvironmentPlugin | DefinePlugin  中 process.env 键的简写方式。
ExtractTextWebpackPlugin | 从 bundle 中提取文本（CSS）到单独的文件
HotModuleReplacementPlugin | 启用模块热替换(Enable Hot Module Replacement - HMR)
HtmlWebpackPlugin | 简单创建 HTML 文件，用于服务器访问
I18nWebpackPlugin | 为 bundle 增加国际化支持
IgnorePlugin | 从 bundle 中排除某些模块
LimitChunkCountPlugin | 设置 chunk 的最小/最大限制，以微调和控制 chunk
LoaderOptionsPlugin | 用于从 webpack 1 迁移到 webpack 2
MinChunkSizePlugin | 确保 chunk 大小超过指定限制
NoEmitOnErrorsPlugin | 在输出阶段时，遇到编译错误跳过
NormalModuleReplacementPlugin | 替换与正则表达式匹配的资源
NpmInstallWebpackPlugin | 在开发时自动安装缺少的依赖
ProvidePlugin | 不必通过 import/require 使用模块
SourceMapDevToolPlugin | 对 source map 进行更细粒度的控制
UglifyjsWebpackPlugin | 可以控制项目中 UglifyJS 的版本
ZopfliWebpackPlugin | 通过 node-zopfli 将资源预先压缩的版本
```
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

自动加载模块，而不必到处 import 或 require 。        
webpack.ProvidePlugin    
[压缩js](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin)     
webpack.optimize.UglifyJsPlugin        
npm i  --save-dev uglifyjs-webpack-plugin            
npm install babel-minify-webpack-plugin --save-dev   
```


### loader 加载器 {#loader}  
#### 文件
- raw-loader 加载文件原始内容（utf-8）
- val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
- url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
- file-loader 将文件发送到输出文件夹，并返回（相对）URL 

#### JSON
- json-loader 加载 JSON 文件（默认包含）
- json5-loader 加载和转译 JSON 5 文件
- cson-loader 加载和转译 CSON 文件

#### 转换编译(Transpiling)
- script-loader 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
- babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
- buble-loader 使用 Bublé 加载 ES2015+ 代码，并且将代码转译为 ES5
- traceur-loader 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5
- ts-loader 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+
- coffee-loader 像 JavaScript 一样加载 CoffeeScript

#### 模板(Templating)
- html-loader 导出 HTML 为字符串，需要引用静态资源
- pug-loader 加载 Pug 模板并返回一个函数
- jade-loader 加载 Jade 模板并返回一个函数
- markdown-loader 将 Markdown 转译为 HTML
- react-markdown-loader 使用 markdown-parse parser(解析器) 将 Markdown 编译为 - React 组件
- posthtml-loader 使用 PostHTML 加载并转换 HTML 文件
- handlebars-loader 将 Handlebars 转移为 HTML
- markup-inline-loader 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 - CSS 动画应用于 SVG 时非常有用。

#### 样式
- style-loader 将模块的导出作为样式添加到 DOM 中
- css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
- less-loader 加载和转译 LESS 文件
- sass-loader 加载和转译 SASS/SCSS 文件
- postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
- stylus-loader 加载和转译 Stylus 文件

#### 清理和测试(Linting && Testing)
- mocha-loader 使用 mocha 测试（浏览器/NodeJS）
- eslint-loader PreLoader，使用 ESLint 清理代码
- jshint-loader PreLoader，使用 JSHint 清理代码
- jscs-loader PreLoader，使用 JSCS 检查代码样式
- coverjs-loader PreLoader，使用 CoverJS 确定测试覆盖率

#### 框架(Frameworks)
- vue-loader 加载和转译 Vue 组件
- polymer-loader 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件
- angular2-template-loader 加载和转译 Angular 组件



#### 工具
创建jsx 解析   
npm install --save-dev @babel/plugin-syntax-jsx
#### 测试插件

#### 安装es6编译插件 
npm install --save-dev babel-loader babel-core 创建.babelrc配置文件 Env预设
npm install babel-preset-env --save-dev
```
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
```
没有任何配置选项，babel-preset-env与babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。
##### babel-core 
```
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
```

##### 安装babel-es2015 
[es2015](https://babeljs.cn/docs/plugins/preset-es2015/)     
npm install --save-dev babel-preset-es2015     

##### 填充  
es6语法填充它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 babel-node 时自动加载。
这意味着你可以使用新的内置对象比如 Promise 或者 WeakMap, 静态方法比如 Array.from 或者 Object.assign, 实例方法比如 Array.prototype.includes 和生成器函数（提供给你使用 regenerator 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 String 一样。     
npm install --save babel-polyfill 

##### flow 类型转换  
npm install --save-dev babel-preset-flow  
npm install --save-dev flow-bin
##### jsx 解析和转换  
npm install --save-dev babel-plugin-syntax-jsx 解析      
npm install --save-dev babel-plugin-transform-react-jsx 转换   

##### object rest 语法解构
npm install --save-dev babel-plugin-transform-object-rest-spread 转换   
npm install --save-dev babel-plugin-syntax-object-rest-spread 解析  

##### ES2015 转换插件
npm install --save-dev babel-plugin-transform-es2015-typeof-symbol   

##### 运行时转换js语法    
在大多数情况下，您应该将其babel-plugin-transform-runtime作为开发依赖项（with --save-dev）进行安装。  
 npm install --save-dev babel-plugin-transform-runtime   

#### 安装开发依赖
npm install vue element-ui lodash vue jquery -S

#### 类属性声明定义转换
npm install --save-dev babel-plugin-transform-class-properties  转换          
npm install --save-dev babel-plugin-syntax-class-properties   解析    
 ```     
class Bork {
//Property initializer syntax
instanceProperty = "bork";
boundFunction = () => {
return this.instanceProperty;
}

//Static class properties
static staticProperty = "babelIsCool";
static staticFunction = function() {
return Bork.staticProperty;
}
}
```
### vs code 调试  "Control+Space"   
```
以下属性对于每个启动配置都是必需的：

type - 用于此启动配置的调试器类型。每安装调试扩展引入一个类型，例如，node对于内置的节点调试器，或php与go对PHP和去扩展。
request - 此启动配置的请求类型。目前支持的是launch和attach。
name - 出现在Debug启动配置下拉列表中的友好名称。
以下是可用于所有启动配置的一些可选属性：

preLaunchTask- 要在调试会话开始之前启动任务，请将此属性设置为tasks.json（位于工作区.vscode文件夹下）中指定的任务的名称。
internalConsoleOptions - 在调试会话期间控制调试控制台面板的可见性
debugServer- 仅限调试扩展作者：连接到指定的端口，而不是启动调试适配器
许多调试器支持以下一些属性：

program - 启动调试器时运行的可执行文件或文件
args - 传递给程序进行调试的参数
env - 环境变量
cwd - 用于查找依赖关系和其他文件的当前工作目录
port - 连接到正在运行的进程时的端口
stopOnEntry - 节目启动时立即中断
console-要使用什么样的主机，例如internalConsole，integratedTerminal，externalTerminal。

VS Code支持字符串中的变量替换，launch.json并具有以下预定义变量：

$ {workspaceFolder} - 在VS Code中打开的文件夹的路径
$ {workspaceFolderBasename} - VS代码中打开的文件夹的名称，不带任何斜杠（/）
$ {file} - 当前打开的文件
$ {relativeFile} - 当前打开的文件相对于workspaceFolder
$ {fileBasename} - 当前打开的文件的基本名称
$ {fileBasenameNoExtension} - 当前打开的文件的基本名称，没有文件扩展名
$ {fileDirname} - 当前打开的文件的dirname
$ {fileExtname} - 当前打开的文件的扩展名
$ {cwd} - 启动时任务运行者的当前工作目录
$ {lineNumber} - 活动文件中当前选定的行号
您也可以通过$ {env：Name}语法（例如，$ {env：PATH}）来引用环境变量。确保匹配环境变量名称的外壳，例如${env:Path}在Windows上。  
{
"type": "node",
"request": "launch",
"name": "Launch Program",
"program": "${workspaceFolder}/app.js",
"cwd": "${workspaceFolder}",
"args": [ "${env:USERNAME}" ]
}
                启动配置属性
类型launch和启动配置支持以下属性attach：

protocol - 调试协议使用。请参阅上面的“支持的类似节点的运行时”一节。
port - 调试端口使用。请参阅“附加到Node.js”和“远程调试Node.js”部分。
address - 调试端口的TCP / IP地址。请参阅“附加到Node.js”和“远程调试Node.js”部分。
restart - 终止时重启会话。请参见“自动重新启动调试会话”一节。
timeout - 重新启动一个会话后，放弃这个毫秒数。请参阅“附加到Node.js”一节。
stopOnEntry - 当程序启动时立即中断。
localRoot - VS Code的根目录。请参阅下面的“远程调试Node.js”部分。
remoteRoot - 节点的根目录。请参阅下面的“远程调试Node.js”部分。
sourceMaps- 通过设置它来启用源地图true。请参阅“源地图”部分。
outFiles - 在JavaScript文件中查找的glob模式数组。请参阅“源地图”部分。
smartStep - 尝试自动跨越不映射到源文件的代码。请参见“智能步进”一节。
skipFiles - 自动跳过这些glob模式覆盖的文件。请参阅“跳过无趣代码”一节。
trace - 启用诊断输出。设置"all"为详细输出。
这些属性仅适用于请求类型的启动配置launch：

program - 调试Node.js程序的绝对路径。
args - 传递给程序进行调试的参数。这个属性的类型是数组，需要单独的参数作为数组元素。
cwd - 启动程序在这个目录下进行调试。
runtimeExecutable - 要使用的运行时可执行文件的绝对路径。默认是node。请参阅'启动npm'和其他工具的配置支持'一节。
runtimeArgs - 传递给运行时可执行文件的可选参数。
env - 可选的环境变量。该属性需要环境变量作为字符串类型键/值对的列表。
envFile - 包含环境变量定义的文件的可选路径。
console-种控制台的启动程序，例如internalConsole，integratedTerminal，externalTerminal。请参阅下面的“节点控制台”一节。
该属性仅适用于请求类型的启动配置attach：

processId - 调试器在发送USR1信号后尝试附加到这个过程。通过这个设置，调试器可以附加到一个已经运行的进程，这个进程在调试模式下没有启动。当使用该processId属性时，调试端口将根据node.js版本（和使用的协议）自动确定，并且不能被明确配置。所以不要指定一个port属性。
```

### Typescript语法编译
npm install --save-dev typescript ts-loader
tsc --init **生成typescript.json**

### gulp 打包
npm install --save-dev gulp