process.env.NODE_ENV="production";
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin=require('babel-minify-webpack-plugin');
const webpack=require('webpack')

module.exports = merge(common, {
    plugins: [
       //  new MinifyPlugin(),
    
   ] 
});