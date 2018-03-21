const path = require('path');
const webpack=require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const extractCss = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
console.log(process.env.NODE_ENV );

const root= path.resolve(__dirname,'../');
console.log( path.join(root, 'dist'));
module.exports = {
  entry: {
    index:'./src/babel/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.join(root, 'dist/babel'),
   // libraryTarget: "umd"
  },
  module: {
   // noParse: /jquery|vue|lodash/,
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
    }    
      ,{
                test: /\.css$/,
                use: extractCss.extract({
                  use:['css-loader'],
                  fallback:'style-loader',
                })
              },
              {
                  test:/\.js$/,
                  exclude: /(node_modules|bower_components)/,
                  use:[{
                        loader:'babel-loader',
                        options:{
                          presets:['env','flow'],
                          retainLines:true,
                          plugins:['transform-vue-jsx','transform-object-rest-spread'],
                         // plugins:['babel-plugin-transform-vue-jsx','transform-object-rest-spread'],
                          babelrc:false,
                         // plugins:['syntax-jsx']
                        }
                  }]
              }
            ]
 },
 //externals:['lodash','vue'],
    externals: {
        lodash: {
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash',
          root: '_'
     },
     vue:{
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
     }
  },
 resolve: {
     //  extensions: ['.js', '.html', '.ts','.css'],
       alias: {
           'template': '../template/',
       }
    },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "vue",
    //     // filename: "vendor.js"
    //     // (Give the chunk a different name)
    
    //     // (with more entries, this ensures that no other module
    //     //  goes into the vendor chunk)
    //   }),
    extractCss,
    new CleanWebpackPlugin(['dist/babel'],{
        root: root, // 根目录
        verbose:true,// //  将日志写入控制台。
        dry:false,// 模拟删除
       // exclude:  ['dx','es6'], // 排除
         //  如果为true，则删除重新编译的文件。 
        //  默认：false
        watch:false,     
        //  允许插件清理webpack根目录之外的文件夹。
      //  默认：false  - 不允许在webpack根目录之外的干净的文件夹
        allowExternal:false 
    }),
    new HtmlWebpackPlugin({
              filename:'app.html',
              template:'./examples/index.html',
              inject:'head',
              title: '开发',
            //   files:{
            //     js: [ "vue"],
            //   }
     }),
     new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
  })
  ]
};