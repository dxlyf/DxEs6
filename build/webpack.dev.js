const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin=require('babel-minify-webpack-plugin')
const webpack=require('webpack')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
    },
    devServer: {
     contentBase: '../dist'
    },
    plugins: [
         new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
   ] 
});
