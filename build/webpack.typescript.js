const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin=require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack=require('webpack')
const fs=require('fs')
const path=require('path')
var root=path.resolve(__dirname,'../');
module.exports=function(env)
{

    common.plugins=[]
    common.entry={};
    common.module={};
    return {
     //   devtool: 'inline-source-map',
        entry:'./src/typescript/index.ts',
        output: {
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            libraryTarget: "this",
            path: path.join(root, 'dist/typescript'),
        },
        resolve:{
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
           // noParse: /jquery|vue|lodash/,
            rules: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                      },
                      {
                          test:/\.tsx?$/,
                          exclude: /(node_modules|bower_components)/,
                     //     include:[path.resolve(__dirname,'../src_ts')],
                          use:['ts-loader']
                      }
                    ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist/typescript'],{
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
       ] 
    }
    
}