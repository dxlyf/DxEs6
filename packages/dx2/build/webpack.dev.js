
/**
 * 编译dx2
 * 
*/
const webpack=require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const merge = require('webpack-merge');
const path=require('path');
const config=require('./webpack.dev.config');
const root=path.resolve(__dirname,'../');
