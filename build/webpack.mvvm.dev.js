const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.mvvm.js');
const path=require('path');
const open=require('opn');

config.entry.app=['webpack-dev-server/client','webpack/hot/only-dev-server',config.entry.app];
config.devtool="eval-cheap-module-source-map ";
config.output.pathinfo=true;
config.plugins.push(new webpack.LoaderOptionsPlugin({
  debug: true
}),new webpack.HotModuleReplacementPlugin());
const options = {
  contentBase:config.devServer.contentBase,
  hot: true,
 // hotOnly:true,
  index: 'app.html',
  host: 'localhost'
};

//webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin({
  profile: false
}));
const server = new webpackDevServer(compiler, options);

server.listen(9001, 'localhost', () => {
  console.log('dev server listening on port 9001');
  open('http://localhost:9001',{app:"Chrome"})
});