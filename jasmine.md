
使用Jasmine和节点
Jasmine节点包包含帮助程序代码，用于为基于节点的项目开发和运行Jasmine测试。

## 安装
你可以在你的项目中使用npm，本地安装Jasmine，全局使用CLI工具。
```bash
npm install jasmine

npm install -g jasmine
```
## 初始化一个项目
通过为你创建一个spec目录和配置json来为Jasmine初始化一个项目。
```bash
jasmine init
// 本地执行
node E:\fanyonglong2016\project\DxEs6\node_modules\jasmine\bin\jasmine.js init
```
## 生成示例
生成示例规范和源文件
```bash
jasmine examples
```
在这一点上，你应该能够编写你的第一个套件

## 组态
自定义spec/support/jasmine.json枚举您想要Jasmine跑步者包括的源文件和规格文件。您可以使用dir glob字符串。

spec_dir被用作所有的前缀spec_files和helpers。帮助者在规格之前执行。
```json
{
  // Spec directory path. Your spec_files must be relative to this path
  "spec_dir": "spec",
  // Array of filepaths (and globs) relative to spec_dir to include
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  // Array of filepaths (and globs) relative spec_dir to include before jasmine specs
  "helpers": [
    "helpers/**/*.js"
  ],
  // Stop execution of a spec after the first expectation failure in it
  stopSpecOnExpectationFailure: false,
  // Run specs in semi-random order
  random: false
}
```
## 运行测试
一旦你设置好了jasmine.json，你可以jasmine从你的项目的根目录开始Jasmine 。

将spec文件的相对路径传递给jasmine命令，以仅在单个文件中执行规范。
```bash
jasmine

jasmine spec/appSpec.js
```
## CLI选项
JASMINE_CONFIG_PATH=
指定配置文件的相对路径或绝对路径。可以用作选项或设置为环境变量。
```bash
JASMINE_CONFIG_PATH=spec/config/jasmine.json jasmine

jasmine JASMINE_CONFIG_PATH=spec/config/jasmine.json
```
----no-color
在规格输出中关闭颜色
```bash
jasmine --no-color
```
----filter=
只运行匹配给定字符串的规格
```
jasmine --filter="a spec name"
```
----stop-on-failure=[true|false]
设置为第一个期望失败后停止执行规范 true
```
jasmine --stop-on-failure=true
```
----random=[true|false]
告诉茉莉花以半随机顺序运行规格或不运行，重写 jasmine.json
```
jasmine --random=true
```
----seed=
设置随机化种子，如果随机化打开
```
jasmine --seed=4321
```
使用库
如果你想对配置进行更精细的控制，Jasmine也可以在你的项目中用作库。这允许您加载多个配置文件或以不同的方式控制您的配置。
```js
var Jasmine = require('jasmine');
var jasmine = new Jasmine();
```
从文件或对象加载配置。
```js
jasmine.loadConfigFile('spec/support/jasmine.json');

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        'appSpec.js',
        'requests/**/*[sS]pec.js',
        'utils/**/*[sS]pec.js'
    ],
    helpers: [
        'helpers/**/*.js'
    ]
});
```
## 自定义onComplete
可以选择指定自定义onComplete回调。回调被赋予了是否所有规格都通过了布尔值。这通常用于向像grunt这样的任务跑步者发送状态消息。
```js
jasmine.onComplete(function(passed) {
    if(passed) {
        console.log('All specs have passed');
    }
    else {
        console.log('At least one spec has failed');
    }
});
```
## 记者
如果没有添加其他记者，则包括ConsoleReporter。您可以使用配置默认的记者configureDefaultReporter。示例中显示了默认值。
```js
jasmine.configureDefaultReporter({
    // The `timer` passed to the reporter will determine the mechanism for seeing how long the suite takes to run.
    timer: new jasmine.jasmine.Timer(),
    // The `print` function passed the reporter will be called to print its results.
    print: function() {
        process.stdout.write(arguments);
    },
    // `showColors` determines whether or not the reporter should use ANSI color codes.
    showColors: true
});
```
您可以添加自定义记者addReporter。如果通过添加记者addReporter，则不会添加默认的ConsoleReporter。可以添加多个记者。
```js
var CustomReporter = require('./myCustomReporter');
var customReporter = new CustomReporter();

jasmine.addReporter(customReporter);
```
## 运行测试
调用execute将运行规格。
```js
jasmine.execute();
```
execute 可以有选择地调用一个spec文件路径列表来执行相对于你的项目根目录和一个字符串来过滤规格名称。
```js
jasmine.execute(['fooSpec.js'], 'a spec name');
```
一个简单的例子，使用库
```js
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.configureDefaultReporter({
    showColors: false
});
jasmine.execute();
```