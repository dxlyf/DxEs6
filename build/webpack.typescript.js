

module.exports=function(env)
{

    const merge = require('webpack-merge');
    const common = require('./webpack.common');
    const MinifyPlugin=require('babel-minify-webpack-plugin')
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const webpack=require('webpack')
    const fs=require('fs')
    const path=require('path')
    
    const dir=path.resolve(__dirname,'../','src_ts/singles');
    var files=fs.readdirSync(dir,{
        encoding:"utf8"
    });
    var entryFiles={};   //{['babel-polyfill']:'babel-polyfill'};
    files.forEach((file)=>{   
        entryFiles[path.basename(file,'.js')]='./src_ts/singles/'+file;
    });
    //cls
    common.plugins=[]
    common.entry={};
    common.module={};
    return {
     //   devtool: 'inline-source-map',
        entry:entryFiles,
        output: {
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            libraryTarget: "this",
            path: path.resolve(__dirname, '../distts/singles'),
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
                          include:[path.resolve(__dirname,'../src_ts')],
                          use:['ts-loader']
                      }
                    ]
        },
        plugins: [
            new CleanWebpackPlugin(['distts/singles'],{
                root: path.resolve(__dirname,'../')
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