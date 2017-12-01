const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
const root= path.resolve(__dirname,'../');
console.log( path.join(root, 'dist'));
module.exports =merge(require('./webpack.common'), {
  entry: {
        index:'./src/index.js',
        vue:['vue']
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  }
});