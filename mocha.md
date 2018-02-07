  
```js
  Usage: mocha [debug] [options] [files]


  Options:

    -V, --version                           输出版本号
    -A, --async-only                        强制所有测试采取callback (async) or return a promise
    -c, --colors                            强制启用颜色
    -C, --no-colors                         强制禁用颜色
    -G, --growl                             使咆哮的通知support
    -O, --reporter-options <k=v,k2=v2,...>  记者具体选项
    -R, --reporter <name>                   指定要使用的报表
    -S, --sort                              排序测试文件
    -b, --bail                              第一次测试失败后的保释金
    -d, --debug                             启用节点调试器，synonym for node --debug
    -g, --grep <pattern>                    只运行测试匹配<pattern>
    -f, --fgrep <string>                    只运行包含的测试<string>
    -gc, --expose-gc                        揭露GC延伸
    -i, --invert                            反转grep和fgrep一样matches
    -r, --require <name>                    要求给定模块
    -s, --slow <ms>                         “慢”测试门槛milliseconds [75]
    -t, --timeout <ms>                      设置测试用例超时milliseconds [2000]
    -u, --ui <name>                         指定用户界面（BDD |tdd|qunit|exports)
    -w, --watch                             查看更改文件
    --check-leaks                           检查全局变量leaks
    --full-trace                            显示完整堆栈跟踪
    --compilers <ext>:<module>,...          使用给定的模块compile files
    --debug-brk                             启用节点调试器breaking on the first line
    --globals <names>                       允许了comma-delimited global [names]
    --es_staging                            启用所有阶段特征
    --file <file>                           包含要运行的文件during the suite [file]
    --harmony<_classes,_generators,...>     所有节点——和谐*标志available
    --preserve-symlinks                     指示模块加载器to preserve symbolic links when resolving和缓存模块
    --icu-data-dir                          包括ICU数据
    --inline-diffs                          显示实际/预期differences inline within each string
    --inspect                               激活工具中铬
    --inspect-brk                           激活工具中铬and break on the first line
    --interfaces                            显示可用的接口
    --no-deprecation                        但是沉默
    --exit                                  强制关闭事件loop after test run: mocha will call process.exit
    --no-timeouts                           禁用超时了implicitly with --debug
    --no-warnings                           静默所有节点进程warnings
    --opts <path>                           指定的路径选择
    --perf-basic-prof                       使Linux仪性能(basic support)
    --napi-modules                          使纳皮峰实验modules
    --prof                                  日志统计分析information
    --log-timer-events                      时间事件包括external callbacks
    --recursive                             包括子目录
    --reporters                             显示可用的记者
    --retries <times>                       设置重试次数a failed test case
    --throw-deprecation                     随时抛出异常deprecated function is used
    --trace                                 跟踪函数调用
    --trace-deprecation                     显示堆栈跟踪deprecations
    --trace-warnings                        在节点上显示堆栈跟踪process warnings
    --use_strict                            严格执行模式
    --watch-extensions <ext>,...            额外的扩展monitor with --watch
    --delay                                 等待异步套件definition
    --allow-uncaught                        使未捕获的错误propagate
    --forbid-only                           仅用标记标记的原因to fail the suite
    --forbid-pending                        导致挂起的测试和测试marked with skip to fail the suite
    -h, --help                              输出使用信息


  Commands:
    //初始化>在<路径>初始化客户端摩卡设置>
    init <path>  initialize a client-side mocha setup at <path>
```
-w, --watch
执行对CWD中对JavaScript的更改的测试，最初执行一次。

--exit / --no-exit
在Mocha v4.0.0中更新

在版本4.0.0 之前，默认情况下，Mocha会在完成执行所有测试后强制自己的进程退出。这种行为使一系列潜在的问题成为可能; 它表示测试（或固定装置，线束，测试代码等），它们不能自行清理。最终，“脏”的测试可能（但不总是）导致误报或错误的结果。

如果一个服务器仍在监听端口，或者一个套接字仍然打开，那么“挂起”通常会显现出来。它也可能是一个失控的东西setInterval()，甚至是一个Promise没有实现的错误。

v4.0.0中的默认行为是--no-exit之前的行为--exit。

解决这个问题最简单的方法就是简单地通过--exit摩卡进程。它可以是耗时的调试，因为它是哪里的问题并不总是显而易见的，但它是建议这样做。

为了确保你的测试不会留下混乱，下面是一些开始的想法：

请参阅Node.js指南进行调试
使用新的async_hooksAPI（示例）
试试类似于为什么是节点运行
使用，.only直到你找到导致摩卡悬挂的测试
--compilers
在Mocha v4.0.0中更新

--compilers自Mocha v4.0.0起弃用。请参阅更多解释和解决方法。

CoffeeScript不再支持开箱即用。CS和类似的转换器可以通过映射文件扩展名（用于--watch）和模块名称来使用。例如--compilers coffee:coffee-scriptCoffeeScript 1.6或--compilers coffee:coffee-script/registerCoffeeScript 1.7+。

关于巴别
如果你的ES6模块有扩展名.js，你可以npm install --save-dev babel-register使用mocha --require babel-register; --compilers仅在需要指定文件扩展名时才是必需的。

-b, --bail
只对第一个例外感兴趣？使用--bail！

-d, --debug
启用节点的调试器支持，这将执行您的脚本，node debug <file ...>允许您逐句通过代码并打破debugger语句。需要注意的区别mocha debug和mocha --debug：mocha debug会火起来节点的内置调试客户端，mocha --debug将允许您使用不同的接口-如眨眼开发工具。意味着--no-timeouts。

--globals <names>
接受逗号分隔的接受的全局变量名称列表。例如，假设您的应用程序故意暴露了一个全局命名app和YUI，你可能需要添加--globals app,YUI。它也接受通配符。你可以做--globals '*bar'，它会匹配foobar，barbar等等。你也可以简单地通过'*'忽略所有全局变量。

通过使用此选项--check-leaks，您可以指定一个已知全局变量的白名单，这些全局变量将会泄漏到全局范围中。

--check-leaks
使用此选项可让Mocha检查运行测试时泄漏的全局变量。指定通过--globals选项可接受的全局变量（例如：）--check-leaks --globals jQuery,MyLib。

-r, --require <module-name>
该--require选项对于像should.js这样的库很有用，所以你可以简单地在每个测试文件--require should中手动调用require('should')。请注意，这可以很好地适用should于增加Object.prototype，但是如果你想访问一个模块的出口，你将不得不要求他们，例如var should = require('should')。此外，它可以用于相对路径，例如--require ./test/helper.js

-u, --ui <name>
该--ui选项可让您指定要使用的界面，默认为“bdd”。

-R, --reporter <name>
该--reporter选项允许您指定将使用的记者，默认为“规范”。这个标志也可能被用来利用第三方记者。例如，如果你npm install mocha-lcov-reporter可以这样做--reporter mocha-lcov-reporter。

-t, --timeout <ms>
指定测试用例超时，默认为2秒。要覆盖你可能传递超时在毫秒，或者一个s后缀的值，例如：--timeout 2s或者--timeout 2000是等价的。

--no-timeouts
禁用超时。相当于--timeout 0。

-s, --slow <ms>
指定“慢”测试阈值，默认为75ms。摩卡使用它来突出显示测试用例耗时过长。

--file <file>
在测试套件中添加一个你想要包含的文件。如果您有一些必须包含在测试套件中的通用设置代码，这是非常有用的。传递的文件不受任何其他标志的影响（--recursive或--sort没有影响）。接受多个--file标志以包含多个文件，标志的排列顺序是文件包含在测试套件中的顺序。也可以用在mocha.opts。

-g, --grep <pattern>
--grep指定的选项将触发摩卡只运行匹配给定pattern的内部编译为一个测试RegExp。

假设，例如，你有“api”相关的测试，以及“应用程序”相关的测试，如下面的代码片段所示; 人们可以使用--grep api或--grep app运行一个或另一个。套件或测试用例标题的其他部分也是如此，--grep users甚至是有效的--grep GET。
```js
describe('api', function() {
  describe('GET /api/users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});

describe('app', function() {
  describe('GET /users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});
```