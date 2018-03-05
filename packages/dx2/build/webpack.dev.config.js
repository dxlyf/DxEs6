
/**
 * 编译dx2
 * 
*/
const webpack=require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const merge = require('webpack-merge');
const path=require('path');
const config=require('./common.config');
const root=path.resolve(__dirname,'../');
module.exports=merge(config,{
    context:root,
    entry: "./src/index.ts", 
    output:{
        path: path.resolve(root, "dist"), // string
        filename: "index.js", // string
        libraryTarget: "umd", // 通用模块定义
        library: "Dx", // string,
    },
    module:{
        rules:[

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'example/index.html',
            inject:true,
            title: '开发',
        }),
        new CleanWebpackPlugin(['dist'],{
            root: root
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //          name: 'common', // 指定公共 bundle 的名称。
        // }),
         new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
   ] ,
   devServer:{
     // index: 'app.htm'
   }

});