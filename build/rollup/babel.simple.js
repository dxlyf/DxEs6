const path=require('path');
let root=path.resolve(__dirname);
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
  input: path.resolve(root,'index.js'),
  output: {
    file: path.resolve(root, 'dist/shapPoints.js'),
    format: 'umd',
    name:'shapPoints'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};

