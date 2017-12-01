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
 rules: [
       {
             test: /\.css$/,
             use: ['style-loader', 'css-loader']
           }
         ]
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