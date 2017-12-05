const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin=require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack=require('webpack')
const fs=require('fs')
const path=require('path')



module.exports = {
   // devtool: 'hidden-source-map',//'source-map',//'inline-source-map',
    entry:'./src/dx/index.js',
    output: {
        filename: 'index.js',
        chunkFilename: '[name].bundle.js',
      //  libraryTarget: "amd",
      libraryTarget: "umd", /// amd commonjs  assign this window commonjs2
        path: path.resolve(__dirname, '../dx'),
        library:'Dx',
        publicPath:"/",
        sourceMapFilename:'[file].map',
    //    libraryExport:'fff'
    },
  //  externals:['lodash','vue'],
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
        }
    },
    module: {
        noParse: /jquery|vue|lodash/,
        rules: [
              {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                  },
                  {
                      test:/\.js$/,
                      exclude: /(node_modules|bower_components)/,
                      use:{
                            loader:'babel-loader',
                            options:{
                                babelrc:false,
                              //  plugins:['syntax-jsx'],
                                presets:[['env',{

                                }]],
                                plugins:['transform-es2015-typeof-symbol','transform-object-rest-spread']
                            }
                      }
                  }
                ]
    },
    plugins: [
        new CleanWebpackPlugin(['dx'],{
            root: path.resolve(__dirname,'../')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
   ] 
}
