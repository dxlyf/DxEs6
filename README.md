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


#### 安装开发依赖
npm install vue element-ui lodash -S