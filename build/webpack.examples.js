const path = require('path');

/**
 * 
 * 
-d --debug --devtool cheap-module-eval-source-map --output-pathinfo
-p --optimize-minimize --define process.env.NODE_ENV="production", see building for production
*/

module.exports = {
  entry: "./app/entry", // string | object | array
  entry: ["./app/entry1", "./app/entry2"],
  entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  // 这里应用程序开始执行
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    /***
     * 模板	描述
      [hash]模块标识符(module identifier)的 hash
      [chunkhash]chunk 内容的 hash
      [name] 模块名称
      [id]模块标识符(module identifier)
      [query]模块的 query，例如，文件名 ? 后面的字符串
     * 
    */
    filename: "bundle.js", // string
    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
    filename: "[chunkhash].js", // 用于长效缓存
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    publicPath: "/assets/", // string
    publicPath: "",
    publicPath: "https://cdn.example.com/",
    // 输出解析文件的目录，url 相对于 HTML 页面

    library: "MyLibrary", // string,
    // 导出库(exported library)的名称

    libraryTarget: "umd", // 通用模块定义
    libraryTarget: "umd2", // 通用模块定义
    libraryTarget: "commonjs2", // exported with module.exports
    libraryTarget: "commonjs-module", // 使用 module.exports 导出
    libraryTarget: "commonjs", // 作为 exports 的属性导出
    libraryTarget: "amd", // 使用 AMD 定义方法来定义
    libraryTarget: "this", // 在 this 上设置属性
    libraryTarget: "var", // 变量定义于根作用域下
    libraryTarget: "assign", // 盲分配(blind assignment)
    libraryTarget: "window", // 在 window 对象上设置属性
    libraryTarget: "global", // property set to global object
    libraryTarget: "jsonp", // jsonp wrapper
    // 导出库(exported library)的类型

    /* 高级输出配置（点击显示） */

    pathinfo: true, // boolean
    // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。

    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)
    // 「附加分块(additional chunk)」的文件名模板

    jsonpFunction: "myWebpackJsonp", // string
    // 用于加载分块的 JSONP 函数名

    sourceMapFilename: "[file].map", // string
    sourceMapFilename: "sourcemaps/[file].map", // string
    // 「source map 位置」的文件名模板

    devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
    // 「devtool 中模块」的文件名模板

    devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
    // 「devtool 中模块」的文件名模板（用于冲突）

    umdNamedDefine: true, // boolean
    // 在 UMD 库中使用命名的 AMD 模块

    crossOriginLoading: "use-credentials", // 枚举
    crossOriginLoading: "anonymous",
    crossOriginLoading: false,
    // 指定运行时如何发出跨域请求问题

    /* 专家级输出配置（自行承担风险） */
  },

  module: {
    // 关于模块配置

    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {

        use: 'label-laoder'
        //use:[ "style-loader" ],
        //use:[{loader:'style-laoder',options:{}}]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include

        issuer: { test, include, exclude },
        // issuer 条件（导入源）

        enforce: "pre",
        enforce: "post",
        // 标识应用这些规则，即使规则覆盖（高级选项）

        loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。

        options: {
          presets: ["es2015"]
        },
        parser: {
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          system: false, // 禁用 SystemJS
          harmony: false, // 禁用 ES2015 Harmony import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          requireContext: false, // 禁用 require.context
          browserify: false, // 禁用特殊处理的 browserify bundle
          requireJs: false, // 禁用 requirejs.*
          node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
          node: {} // 在模块级别(module level)上重新配置 node 层(layer)
        }
        // loader 的可选项
      },

      {
        test: /\.html$/,
        test: "\.html$",
        use: [
          // 应用多个 loader 和选项
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },

      { oneOf: [ /* rules */] },
      // 只使用这些嵌套规则之一

      { rules: [ /* rules */] },
      // 使用所有这些嵌套规则（合并可用条件）

      { resource: { and: [ /* 条件 */] } },
      // 仅当所有条件都匹配时才匹配

      { resource: { or: [ /* 条件 */] } },
      { resource: [ /* 条件 */] },
      // 任意条件匹配时匹配（默认为数组）

      { resource: { not: true /* 条件 */ } }
      // 条件不匹配时匹配
    ],

    /* 高级模块配置（点击展示） */

    noParse: [
      /special-library\.js$/
    ],
    // 不解析这里的模块

    unknownContextRequest: ".",
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: ".",
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    // specifies default behavior for dynamic requests
  },

  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录

    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名

    alias: {
      // 模块别名列表

      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"

      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"

      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */
    alias: [
      {
        name: "module",
        // 旧的请求

        alias: "new-module",
        // 新的请求

        onlyModule: true
        // 如果为 true，只有 "module" 是别名
        // 如果为 false，"module/inner/path" 也是别名
      }
    ],

    /* 高级解析选项（点击展示） */

    symlinks: true,
    // 遵循符号链接(symlinks)到新位置

    descriptionFiles: ["package.json"],
    // 从 package 描述中读取的文件

    mainFields: ["main"],
    // 从描述文件中读取的属性
    // 当请求文件夹时

    aliasFields: ["browser"],
    // 从描述文件中读取的属性
    // 以对此 package 的请求起别名

    enforceExtension: false,
    // 如果为 true，请求必不包括扩展名
    // 如果为 false，请求可以包括扩展名

    moduleExtensions: ["-module"],
    enforceModuleExtension: false,
    // 类似 extensions/enforceExtension，但是用模块名替换文件

    unsafeCache: true,
    unsafeCache: {},
    // 为解析的请求启用缓存
    // 这是不安全，因为文件夹结构可能会改动
    // 但是性能改善是很大的

    cachePredicate: (path, request) => true,
    // predicate function which selects requests for caching

    plugins: [
      // ...
    ]
    // 应用于解析器的附加插件
  },

  performance: {
    hints: "warning", // 枚举
    hints: "error", // 性能提示中抛出错误
    hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  /*
  注意不同devtool设置的性能差异。
  "eval" 具有最佳性能，但不协助您编译代码。
  该cheap-source-map变种是更好的性能，如果你能略差映射品质生活。
  eval-source-map为增量构建使用变体。
  =>在大多数情况下cheap-module-eval-source-map是最好的选择。
  */
  devtool: "source-map", // enum
  devtool: "inline-source-map", // 嵌入到源文件中
  devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
  devtool: "hidden-source-map", // SourceMap 不在源文件中引用
  devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
  devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
  devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  target: "web", // 枚举
  target: "webworker", // WebWorker
  target: "node", // node.js 通过 require
  target: "async-node", // Node.js 通过 fs and vm
  target: "node-webkit", // nw.js
  target: "electron-main", // electron，主进程(main process)
  target: "electron-renderer", // electron，渲染进程(renderer process)
  target: (compiler) => { /* ... */ }, // 自定义
  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

  externals: ["react", /^@angular\//],
  externals: "react", // string（精确匹配）
  externals: /^[a-z\-]+($|\/)/, // 正则
  externals: { // 对象
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  externals: (request) => { /* ... */ return "commonjs " + request },
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  stats: "errors-only",
  stats: { //object
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
    // ...
  },
  // 精确控制要显示的 bundle 信息

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...

    hot: false，//启用热模块更换。
    hotOnly: false，//启用热更换模块而不刷新页面作为后备。
    lazy: false，//禁用watch模式并仅在请求时重新编译bundle。
    bonjour: false，//发布ZeroConf DNS服务
    host: ，//服务器监听的主机。
    allowedHosts: ，//指定哪些主机被允许访问dev服务器。
    filename: false，//为了触发重新编译需要被请求的文件名（只在懒惰模式下）。

    /*[
      {
        "instanceof": "RegExp"
      },
      {
        "type": "string"
      }
    ]*/
    publicPath: ，//网址文件所在的URL路径。
    port: false，//服务器侦听的端口。

    /*[
      {
        "type": "number"
      },
      {
        "type": "string"
      }
    ]*/
    socket: ，//用于监听的Unix套接字（而不是主机）。
    watchOptions: {}，//更改手表行为的选项。
    headers: {}，//添加到每个响应的响应标题。
    logLevel: ，//终端/控制台中的日志级别（trace，debug，info，warn，error或none）
    clientLogLevel: ，//控制浏览器中显示的日志消息。
    overlay: false，//在浏览器中显示错误覆盖。

    /*[
      {
        "type": "boolean"
      },
      {
        "type": "object",
        "properties": {
          "errors": {
            "type": "boolean"
          },
          "warnings": {
            "type": "boolean"
          }
        }
      }
    ]*/
    progress: false，//在浏览器控制台中显示编译进度。
    key: false，// SSL密钥的内容。

    /*[
      {
        "type": "string"
      },
      {
        "instanceof": "Buffer"
      }
    ]*/
    cert: false，// SSL证书的内容。

    /*[
      {
        "type": "string"
      },
      {
        "instanceof": "Buffer"
      }
    ]*/
    ca: false，// SSL CA证书的内容。

    /*[
      {
        "type": "string"
      },
      {
        "instanceof": "Buffer"
      }
    ]*/
    pfx: false，// SSL pfx文件的内容。

    /*[
      {
        "type": "string"
      },
      {
        "instanceof": "Buffer"
      }
    ]*/
    pfxPassphrase: ，//到（SSL）PFX文件的密码。
    requestCert: false，//启用对客户端证书的请求。这直接传递给https服务器。
    inline: false，//启用内联模式以将客户端脚本包含在包中（仅限CLI）。
    disableHostCheck: false，//禁用主机头检查（安全性）。
    public: ，//服务器的公共主机名/ IP地址。
    https: false，//启用服务器的HTTPS。

    /*[
      {
        "type": "object"
      },
      {
        "type": "boolean"
      }
    ]*/
    contentBase: false，//从非webpack文件提供文件的目录。

    /*[
      {
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "type": "array"
      },
      {
        "enum": [
          false
        ]
      },
      {
        "type": "number"
      },
      {
        "type": "string"
      }
    ]*/
    watchContentBase: false，//观察contentBase目录中的更改。
    open: false，//让CLI用URL打开浏览器。

    /*[
      {
        "type": "string"
      },
      {
        "type": "boolean"
      }
    ]*/
    useLocalIp: false，//让浏览器打开本地IP。
    openPage: ，//让CLI将浏览器打开到网站上的特定页面。
    features: ，//功能将被触发的顺序。
    compress: false，//对所有请求进行Gzip压缩。
    proxy: false，//代理请求到另一台服务器。

    /*[
      {
        "items": {
          "anyOf": [
            {
              "type": "object"
            },
            {
              "instanceof": "Function"
            }
          ]
        },
        "minItems": 1,
        "type": "array"
      },
      {
        "type": "object"
      }
    ]*/
    historyApiFallback: false，// 404回退到指定的文件。

    /*[
      {
        "type": "boolean"
      },
      {
        "type": "object"
      }
    ]*/
    staticOptions: {}，//用contentBase提供静态文件的选项。
    setup: undefined，//公开Express服务器以添加自定义中间件或路由。
    before: undefined，//在添加webpack-dev-middleware之前，公开Express服务器以添加自定义中间件或路由。
    after: undefined，//在添加webpack-dev-middleware后，公开Express服务器以添加自定义中间件或路由。
    stats: false，//决定显示哪些束信息。

    /*[
      {
        "type": "object"
      },
      {
        "type": "boolean"
      },
      {
        "enum": [
          "none",
          "errors-only",
          "minimal",
          "normal",
          "verbose"
        ]
      }
    ]*/
    reporter: undefined，//定制编译时控制台显示的内容。
    logTime: false，//在控制台显示中编译前后报告时间。
    noInfo: false，//在控制台上隐藏所有信息。
    quiet: false，//在控制台上隐藏所有消息。
    serverSideRender: false，//公开服务器端渲染的统计信息（实验）。
    index: ，//被认为是索引文件的文件名。
    log: undefined，//自定义webpack-dev-middleware的信息日志。
    warn: undefined，//为webpack-dev-middleware自定义警告日志。
  },

  plugins: [
    // ...
  ],
  // 附加插件列表


  /* 高级配置（点击展示） */

  resolveLoader: { /* 等同于 resolve */ },
  // 独立解析选项的 loader

  parallelism: 1, // number
  // 限制并行处理模块的数量

  profile: true, // boolean
  // 捕获时机信息

  bail: true, //boolean
  // 在第一个错误出错时抛出，而不是无视错误。

  cache: false, // boolean
  // 禁用/启用缓存

  watch: true, // boolean
  // 启用观察

  watchOptions: {
    aggregateTimeout: 1000, // in ms
    // 将多个更改聚合到单个重构建(rebuild)

    poll: true,
    poll: 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares（译者注：Network FileSystem，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
  },
  /**
   * 是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一……
  此功能由 webpack 内部的 NodeStuffPlugin 插件提供。如果 target 是 "web"（默认）或 "webworker"，那么 NodeSourcePlugin 插件也会被激活。
  true：提供 polyfill。
  "mock"：提供 mock 实现预期接口，但功能很少或没有。
  "empty"：提供空对象。
  false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
    * * *//
  node: {
  // Polyfills and mocks to run Node.js-
  // environment code in non-Node environments.

  console: false, // boolean | "mock"
    global: true, // boolean | "mock"
      process: true, // boolean
        __filename: "mock", // boolean | "mock"
          __dirname: "mock", // boolean | "mock"
            Buffer: true, // boolean | "mock"
              setImmediate: true // boolean | "mock" | "empty"
},

recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
    recordsOutputPath: path.resolve(__dirname, "build/records.json"),
  // TODO

}