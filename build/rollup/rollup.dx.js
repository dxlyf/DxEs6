const path=require('path');
let root=path.resolve(__dirname,'../../');
export default {
    //这个包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)
    input: path.resolve(root,'src/dx/main.js'),
    output: {
      file: 'index-rollup.js',
      format: 'umd'
    }
};