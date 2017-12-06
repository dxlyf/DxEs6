const fs=require('fs')
const path=require('path')

console.log( process.env.NODE_ENV );
//  console.log(process.cwd()); // node 执行目录
//  console.log(__dirname); // 当前文件目录
//  console.log(__filename );// 当前文件路径
// console.log(path.resolve('dist')); // 执行目录
// console.log(path.resolve(__dirname,'../','dist')); // 执行目录
// //fs.readdir(path.join(__dirname))
// const dir=path.resolve(__dirname,'../','src/es6');
// var files=fs.readdirSync(dir,{
//     encoding:"utf8"
// });
// console.log(files.map((file)=>({[path.basename(file,'.js')]:'./src/es6/'+file})));

