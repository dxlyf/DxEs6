process.env.NODE_ENV="development";
const webpack=require('webpack');
const path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
var root=path.resolve(__dirname,'../src/dx-mvvm');

/**
 * // Shortcuts
	if(argv.d) {
		argv.debug = true;
		argv["output-pathinfo"] = true;
		if(!argv.devtool) {
			argv.devtool = "eval-cheap-module-source-map";
		}
	}
	if(argv.p) {
		argv["optimize-minimize"] = true;
		argv["define"] = [].concat(argv["define"] || []).concat("process.env.NODE_ENV=\"production\"");
	}
 * 
*/
var config={
    context:root,
    entry:{app:"./src/index.js"}, // string | object | array
    output: {
      // webpack 如何输出结果的相关选项 
      path: path.resolve(root, "dist"), // string
      // 所有输出文件的目标路径
      // 必须是绝对路径（使用 Node.js 的 path 模块）
      filename:'dx-mvvm.js',
     // filename: '[name].[hash].js',
    //  filename: "dx-mvvm.[hash].js", // string
      // 「入口分块(entry chunk)」的文件名模板（出口分块？）
   //   chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)
  //    publicPath: "/assets/", // string
      // 输出解析文件的目录，url 相对于 HTML 页面
  
      library: "dx", // string,
      // 导出库(exported library)的名称
  
      libraryTarget: "umd", // 通用模块定义
      // 导出库(exported library)的类型
  
      /* 高级输出配置（点击显示） */
    },
  //  devtool: 'cheap-module-eval-source-map', // 开发
    resolve:{
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            css: path.resolve(root, 'assets/css')
       }
    },
    externals: "dx", 
    module:{
        rules:[
           {
            test: /\.tsx?$/,
           // include: [path.resolve(root, "src")],
            exclude:/node_modules/,
            use:"ts-loader"
           },{
               test:/\.css$/,
               exclude:/node_modules/,
               use:["style-loader","css-loader"]
           },{
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
                // options:{
                //     babelrc:true,
                //     presets:'env',
                //  // plugins:['transform-object-rest-spread','transform-class-properties']
                // }
            }
        }        
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'app.html',
            template:'index.html',
            inject:true,
            title: '开发',
        }),
        new CleanWebpackPlugin("dist",{
            root:root
        }),    
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NamedModulesPlugin()
      //  new webpack.HotModuleReplacementPlugin()
    ],
    // 会进行css热更新,js 自动刷新
    devServer: {
        contentBase:[path.join(root, "dist"),path.join(root, "assets")],
       // historyApiFallback:false,
     //   compress: true, //启用gzip压缩
       // port: 9000,
     //   open:'Chrome',
       //inline:true, //也可以使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息。切换到 iframe 模式：
       index: 'app.html',
     //  publicPath: "/"
        // before(app){
        //     app.get('/scripts/*.js', function(req, res) {
        //         res.sendFile(path.join(root,req.path));
        //     });
        // },
        //hot:true //自动刷新
       //hotOnly:true  //热更新
     },
     watch:false, // webpack-dev-server  和 webpack-dev-middleware 里 Watch 模式默认开启。
     watchOptions:{
    }
};
module.exports=config;






// const compiler=webpack(config, (err, stats) => {
//         if(err)
//         {
//             console.log(err);
//             return;
//         }
//         console.log('编译成功');
//  });

// const devServerOptions = Object.assign({}, config.devServer,{
//     open:'Google Chrome',
//     stats: {
//         colors: true
//       }
// });
// var devServer=new WebpackDevServer(compiler,devServerOptions);
// devServer.listen(config.devServer.port,'127.0.0.1',function(){
//     devServer.close
//     console.log('Starting server on http://localhost:9000');
//   //  devServer.open(config.devServer.open);
// })