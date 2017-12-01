const path = require('path');

//console.log(path.resolve(__dirname, '../dist'));
//console.log(path.resolve(process.cwd(), 'dist'));
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dx.js',
    path: path.resolve(__dirname, '../dist')
  }
};