process.env.NODE_ENV="development";

const webpack=require('webpack');
const path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var root=path.resolve(__dirname,'../src/dx-mvvm');

module.exports={
    context:root,
    entry: "./src/index.ts", // string | object | array

    output: {
      // webpack 如何输出结果的相关选项 
      path: path.resolve(root, "dist"), // string
      // 所有输出文件的目标路径
      // 必须是绝对路径（使用 Node.js 的 path 模块）
  
      filename: "dx-mvvm.js", // string
      // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  
      publicPath: "/assets/", // string
      // 输出解析文件的目录，url 相对于 HTML 页面
  
      library: "dx", // string,
      // 导出库(exported library)的名称
  
      libraryTarget: "umd", // 通用模块定义
      // 导出库(exported library)的类型
  
      /* 高级输出配置（点击显示） */
    },
    devtool: 'inline-source-map', // 开发
    extensions: [".js", ".ts"],
    module:{
        rules:[
           {
            test: /\.ts$/,
            include: [path.resolve(root, "src")],
            exclude:/node_modules/,
            use:[{
                loader:'ts-loader',
                options:{
                }
            }]
           }    
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'app.html',
            template:'index.html',
            inject:'head',
            title: '开发',
        }),
        new CleanWebpackPlugin("dist",{
            root:root
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};