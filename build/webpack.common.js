const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
const root= path.resolve(__dirname,'../');
console.log( path.join(root, 'dist'));
module.exports = {
  entry: {
        index:'./src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.join(root, 'dist'),
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
                  use:[{
                        loader:'babel-loader',
                        options:{
                          presets:['env'],
                          plugins:['transform-react-jsx','transform-object-rest-spread'],
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
       extensions: ['.js', '.html', '.ts','.css'],
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
    new CleanWebpackPlugin(['dist'],{
        root: root
    }),
    new HtmlWebpackPlugin({
              title: '开发',
            //   files:{
            //     js: [ "vue"],
            //   }
     })
  ]
};