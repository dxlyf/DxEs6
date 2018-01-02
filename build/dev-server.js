
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.hot.js');
const open=require('opn');
const options = {
  contentBase: '../dist/babel',
  hot: true,
  host: 'localhost',
  index:'app.html',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
// 通过这种方式使用wepack-dev-server,webpack.devServer 选项将无效，
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
  open('http://localhost:5000',{app:"Chrome"});
});

