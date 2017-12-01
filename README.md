# DxEs6
## ES6 开发编译环境
### 安装编译环境
#### 打包插件webpack
npm install --save-dev webpack
#### 安装es6编译插件
npm install --save-dev babel-loader babel-core
创建.babelrc配置文件 Env预设
npm install babel-preset-env --save-dev

        {
         "presets": ["env"]
        }
没有任何配置选项，babel-preset-env与babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。