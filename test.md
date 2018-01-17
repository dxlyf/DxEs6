# 测试
- [karma](#karma-测试)

## karma 测试
一个简单的工具，允许您在多个真实的浏览器中执行JavaScript代码 。
Karma的主要目的是使测试驱动的开发变得简单，快速和有趣。
## 我应该什么时候使用karma？
- 你想在真实的浏览器中测试代码。
- 你想在多个浏览器（桌面，手机，平板电脑等）测试代码。
- 你想在开发过程中在本地执行你的测试。
- 您想要在持续集成服务器上执行测试。
- 你想在每次保存时执行你的测试。
- 你爱你的终端。
- 你不希望你的（测试）生活吸吮。
- 你想使用伊斯坦布尔自动生成覆盖率报告。
- 你想为你的源文件使用RequireJS。

## 但是我仍然想使用_insert测试库_

Karma不是一个测试框架，也不是一个断言库。
Karma只是启动一个HTTP服务器，并生成你可能已经从你最喜欢的测试框架知道的测试运行器HTML文件。
所以出于测试的目的，你可以使用任何你喜欢的东西。 已经有大部分常用测试框架的插件：

* [Jasmine]
* [Mocha]
* [QUnit]
* and [many others](https://www.npmjs.org/browse/keyword/karma-adapter)

如果你找不到适合自己喜欢的框架的适配器，不要担心，自己写。
这并不难，我们在这里帮助。


## 我可以使用哪些浏览器？
所有的主流浏览器都支持，如果你想知道更多请看
[浏览器]页面。
## 故障排除
See [FAQ](https://karma-runner.github.io/latest/intro/faq.html).


## 安装
#### 安装Karma和插件
推荐的方法是在项目目录中本地安装Karma（以及您的项目所需的所有插件）。
```bash
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```
这将安装karma，karma-jasmine，karma-chrome-launcher和jasmine-core包到node_modules当前工作目录，也可以作为保存这些devDependencies的package.json，所以，任何其他开发项目工作会只有这样做npm install才能得到所有这些依赖安装。
```bash
# Run Karma:
$ ./node_modules/karma/bin/karma start
```
#### 命令行界面
键入./node_modules/karma/bin/karma start吮吸，所以你可能会发现karma-cli全球安装有用。如果要从命令行运行Windows上的Karma，则需要执行此操作。
```bash
$ npm install -g karma-cli
```
然后，你可以简单地karma从任何地方运行Karma ，它将始终运行本地版本。

[AngularJS]: https://angularjs.org/
[JSTD]: https://code.google.com/p/js-test-driver/
[Socket.io]: http://socket.io/
[Node.js]: http://nodejs.org/
[Jasmine]: https://github.com/karma-runner/karma-jasmine
[Mocha]: https://github.com/karma-runner/karma-mocha
[QUnit]: https://github.com/karma-runner/karma-qunit
[here]: https://www.youtube.com/watch?v=MVw8N3hTfCI
[Mailing List]: https://groups.google.com/forum/#!forum/karma-users
[Issue Tracker]: https://github.com/karma-runner/karma/issues
[@JsKarma]: https://twitter.com/JsKarma
[RequireJS]: http://requirejs.org/
[Istanbul]: https://github.com/gotwarlost/istanbul

[browsers]: https://karma-runner.github.io/latest/config/browsers.html
[documentation]: https://karma-runner.github.io