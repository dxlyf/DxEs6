const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack=require('webpack')

//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
const root= path.resolve(__dirname,'../');
console.log( path.join(root, 'dist'));
module.exports = merge(common,{
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: '../dist',
    hot:true
},
  plugins: [

new webpack.NamedModulesPlugin(),  
 new webpack.HotModuleReplacementPlugin(),

  ]
});