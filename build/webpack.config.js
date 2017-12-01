const path = require('path');
const MinifyPlugin=require('babel-minify-webpack-plugin')
//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dx.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new MinifyPlugin({}, {})
  ]
};