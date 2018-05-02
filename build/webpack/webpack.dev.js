const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');
const baseConfig=require('./webpack.common');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const config=require('../config');
const {resolve}=require('../config/util');

/**
 * 
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
-d --debug --devtool cheap-module-eval-source-map --output-pathinfo

webpack -d --config ../config.js
*/
module.exports=(env, argv)=>{
    let webpackConfig=merge(baseConfig,{
        mode:'development',//
        output: {
          chunkLoadTimeout:120000,//chunk 请求到期之前的毫秒数，默认为 120 000
          filename: '[name].js',
          path: path.join(root, 'dist'),
          publicPath:"/", //对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
          chunkFilename:'[id].js',//此选项决定了非入口(non-entry) chunk 文件的名称。有关可取的值的详细信息，请查看 output.filename 选项。
          hotUpdateChunkFilename: "[id].[hash].hot-update.js",//自定义热更新 chunk 的文件名
          pathinfo:true ,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释
          library: {
              commonjs: "dx-vuexproject"
           },
          libraryTarget: "commonjs",
          sourceMapFilename:'[file].map',
          /**
           * [absolute-resource-path]
            绝对路径文件名
            [all-loaders]
            自动和显式的 loader，并且参数取决于第一个 loader 名称
            [hash]
            模块标识符的 hash
            [id]
            模块标识符
            [loaders]
            显式的 loader，并且参数取决于第一个 loader 名称
            [resource]
            用于解析文件的路径和用于第一个 loader 的任意查询参数
            [resource-path]
            不带任何查询参数，用于解析文件的路径
            [namespace]
            模块命名空间。在构建成为一个 library 之后，通常也是 library 名称，否则为空
            当使用一个函数，同样的选项要通过 info 参数
           *
           * 当使用 devtool: 'eval' 
          */
         // devtoolModuleFilenameTemplate: "webpack://[namespace]/[resource-path]?[loaders]",
          umdNamedDefine:false //会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
       },    
        devtool: 'inline-source-map',
           // devtool:'source-map',
    //devtool:'eval-source-map',
   // devtool:'eval-cheap-module-source-map',
        plugins:[
            new CleanWebpackPlugin(['dist'],{
                root:resolve(),
                verbose:false
            }),
            new HtmlWebpackPlugin({
              title: 'Development',
              template:'',
              filename:'index.html'
            })
        ],
        devServer: {
             contentBase: resolve('dist'),
             compress: true, // 一切服务都启用gzip 压缩：
             historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
             hot: true, // 启用 webpack 的模块热替换特性：
             https: false, // 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
             noInfo: true, //启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
             open:'chrome', //当open启用时，开发服务器将打开浏览器。
             index:'index.html',
             progress:true, //将运行进度输出到控制台。
            // openPage:null //指定打开浏览器时导航到的页面。
             quiet: false,//启用quiet后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自的WebPack的错误或警告在控制台不可见。

             
        }
    });
    return webpackConfig;
}



/**
 * 
yargs.options({
  bonjour: {
    type: 'boolean',
    describe: 'Broadcasts the server via ZeroConf networking on start'
  },
  lazy: {
    type: 'boolean',
    describe: 'Lazy'
  },
  inline: {
    type: 'boolean',
    default: true,
    describe: 'Inline mode (set to false to disable including client scripts like livereload)'
  },
  progress: {
    type: 'boolean',
    describe: 'Print compilation progress in percentage',
    group: BASIC_GROUP
  },
  'hot-only': {
    type: 'boolean',
    describe: 'Do not refresh page if HMR fails',
    group: ADVANCED_GROUP
  },
  stdin: {
    type: 'boolean',
    describe: 'close when stdin ends'
  },
  open: {
    type: 'string',
    describe: 'Open the default browser, or optionally specify a browser name'
  },
  useLocalIp: {
    type: 'boolean',
    describe: 'Open default browser with local IP'
  },
  'open-page': {
    type: 'string',
    describe: 'Open default browser with the specified page',
    requiresArg: true
  },
  color: {
    type: 'boolean',
    alias: 'colors',
    default: function supportsColor() {
      return require('supports-color');
    },
    group: DISPLAY_GROUP,
    describe: 'Enables/Disables colors on the console'
  },
  info: {
    type: 'boolean',
    group: DISPLAY_GROUP,
    default: true,
    describe: 'Info'
  },
  quiet: {
    type: 'boolean',
    group: DISPLAY_GROUP,
    describe: 'Quiet'
  },
  'client-log-level': {
    type: 'string',
    group: DISPLAY_GROUP,
    default: 'info',
    describe: 'Log level in the browser (info, warning, error or none)'
  },
  https: {
    type: 'boolean',
    group: SSL_GROUP,
    describe: 'HTTPS'
  },
  key: {
    type: 'string',
    describe: 'Path to a SSL key.',
    group: SSL_GROUP
  },
  cert: {
    type: 'string',
    describe: 'Path to a SSL certificate.',
    group: SSL_GROUP
  },
  cacert: {
    type: 'string',
    describe: 'Path to a SSL CA certificate.',
    group: SSL_GROUP
  },
  pfx: {
    type: 'string',
    describe: 'Path to a SSL pfx file.',
    group: SSL_GROUP
  },
  'pfx-passphrase': {
    type: 'string',
    describe: 'Passphrase for pfx file.',
    group: SSL_GROUP
  },
  'content-base': {
    type: 'string',
    describe: 'A directory or URL to serve HTML content from.',
    group: RESPONSE_GROUP
  },
  'watch-content-base': {
    type: 'boolean',
    describe: 'Enable live-reloading of the content-base.',
    group: RESPONSE_GROUP
  },
  'history-api-fallback': {
    type: 'boolean',
    describe: 'Fallback to /index.html for Single Page Applications.',
    group: RESPONSE_GROUP
  },
  compress: {
    type: 'boolean',
    describe: 'Enable gzip compression',
    group: RESPONSE_GROUP
  },
  port: {
    describe: 'The port',
    group: CONNECTION_GROUP
  },
  'disable-host-check': {
    type: 'boolean',
    describe: 'Will not check the host',
    group: CONNECTION_GROUP
  },
  socket: {
    type: 'String',
    describe: 'Socket to listen',
    group: CONNECTION_GROUP
  },
  public: {
    type: 'string',
    describe: 'The public hostname/ip address of the server',
    group: CONNECTION_GROUP
  },
  host: {
    type: 'string',
    default: 'localhost',
    describe: 'The hostname/ip address the server will bind to',
    group: CONNECTION_GROUP
  },
  'allowed-hosts': {
    type: 'string',
    describe: 'A comma-delimited string of hosts that are allowed to access the dev server',
    group: CONNECTION_GROUP
  }
});

*/