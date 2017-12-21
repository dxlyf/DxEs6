const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin=require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack=require('webpack');
const fs=require('fs');
const path=require('path');
//const args=require('yargs').default('ug','no').argv;
// var filename=args.ug=='yes'?'index.min.js':'index.js';
var plugins=[
    new CleanWebpackPlugin(['dist/dx'],{
        root: path.resolve(__dirname,'../')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('dev'),
            'globalvar':JSON.stringify('mjb')
        }
    })
    // 预先定义加载模块
    // new webpack.ProvidePlugin({
    //     //   _: 'lodash'
    // })
];
module.exports = (env)=>{
   // devtool: 'hidden-source-map',//'source-map',//'inline-source-map',
   if(env.production)
   {
       plugins.unshift(new MinifyPlugin())
   }
    //console.log(env.production);
    return {
   // entry:['babel-polyfill','./src/dx/main.js'],
   entry:'./src/dx/main.js',
    output: {
        filename: env.production?'index.min.js':'index.js',
        chunkFilename: '[name].bundle.js',
      //  libraryTarget: "amd",
       libraryTarget: "umd", /// amd commonjs  assign this window commonjs2
        path: path.resolve(__dirname, '../dist/dx'),
      //  library:'YY',
        publicPath:"/",
        sourceMapFilename:'[file].map',
        libraryExport:'default'//'mjb'
    },
    target:"web",
    resolve:{
      //  mainFiles: ["index"],//解析目录要使用的文件名
     //   modules: [path.resolve(__dirname, "../src"), "node_modules"], // 模块搜索目录
        alias: {
            ffff: path.resolve(__dirname, '../src/dx/vue-extends.js')
        },
        extensions: [".js", ".json"]
    },
    // externals: [
    //     function(context, request, callback) {
    //     console.log('aaaa:'+request);
    //       if (/^yourregex$/.test(request)){
    //         return callback(null, 'commonjs ' + request);
    //       }
    //       callback();
    //     }
    //   ],
   externals:['lodash','vue'],
    externals: [{
       lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        'vue':{
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'vue'
        },
        jquery:{
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
            root: '$'
        },
        'element-ui':{
            commonjs: 'ELEMENT',
            commonjs2: 'ELEMENT',
            amd: 'ELEMENT',
            root: 'ELEMENT'
        },
        'configs':{
            commonjs: 'configs',
            commonjs2: 'configs',
            amd: 'configs',
            root: 'configs'
        }
    }],
    module: {
      //  noParse: /^(jquery|lodash|vue|element\-ui)$/,
      //  noParse: /jquery|vue|lodash/, // 排除文件解析
        // noParse:function(context)
        // {
        //     console.log("ppppp:"+context);
        //     return false;
        // },
        rules: [
              {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                  },
                  {
                      test:/\.js$/,
                      exclude: /(node_modules|bower_components)/, // 排除
                      include:[path.resolve(__dirname,'../src/dx')],// 匹配
                      use:{
                            loader:'babel-loader',
                            options:{
                                babelrc:false,
                                plugins:['syntax-jsx'],
                                presets:[['env',{
                                        targets:{
                                        //    chrome:50
                                        }
                                }]]
                               // plugins:['transform-es2015-typeof-symbol','transform-object-rest-spread']
                            }
                      }
                  }
                ]
    },
    plugins: plugins
    }
}
