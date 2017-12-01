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

