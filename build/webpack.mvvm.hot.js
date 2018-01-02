const express = require('express');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');
const config = require('./webpack.mvvm.js');
const path=require('path');
const open=require('opn');


config.devtool="eval-cheap-module-source-map ";
config.output.pathinfo=true;
config.output.publicPath="/";
config.entry=['webpack-hot-middleware/client',config.entry]
config.plugins.push(new webpack.HotModuleReplacementPlugin())

const app = express();

const compiler = webpack(config);



// app.get('/',function(res,res){

//     res.sendFile('');
// })
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  headers:undefined,
  serverSideRender:undefined,//指示模块启用或禁用服务器端渲染模式。请参阅服务器端渲染了解更多信息。
  index:"app.html",
  publicPath: config.output.publicPath,
  watchOptions:{  //该模块接受一个Object包含文件监视的选项，直接传递给所提供的编译器。有关手表选项的更多信息，请参阅webpack文档
    aggregateTimeout:200
  }
}));

app.use(webpackHotMiddleware(compiler,{
  // log: false,
   path: "/__webpack_hmr",
   timeout:20000
  // heartbeat: 2000
 }))

// Serve the files on port 3000.
app.listen(9001, function () {
  console.log('Example app listening on port 9001!\n');
    open('http://localhost:9001',{app:"Chrome"});
});