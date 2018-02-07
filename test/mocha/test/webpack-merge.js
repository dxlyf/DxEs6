

//mocha 

var assert = require('assert');
var merge=require('webpack-merge');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });

describe('测试webpack-merge',()=>{

   describe('测试merge方法,两个对象合并',()=>{
        it('测试meger',()=>{
          var result=merge({list:[1],name:"00",obj:{age:1}},{list:[2],name:"11",obj:{no:'2'}});
          assert.equal(result.list.length,2);
          assert.equal(result.name,'11');
          assert.equal(Reflect.has(result.obj,'no'),true);
        })

        
   });
   describe('测试merge方法,两个对象合并',()=>{
    it('测试自定义方法,数组不合并连接',()=>{
      var result=merge({
        customizeArray(a,b,key){
          
          return b;
        },
        customizeObject(a, b, key) {
          console.log(key);
          if (key === 'module') {
            // Custom merging
            return _.merge({}, a, b);
          }
          
          // Fall back to default merging
          return undefined;
        }
      })({list:[1],name:"00",obj:{age:1}},{list:[2],name:"11",obj:{no:'2',list:{age:43}}});
      //console.log(result);
    })
});
  describe('测试merge方法,两个对象合并',()=>{
    it('测试mermge 两个对象不受原始对象影响',()=>{

      var a={list:[1],name:"00",obj:{age:1}};
      var b={list:[2],name:"11",obj:{no:'2'}};
      var result=merge(a,b);
      a.pp='43';
      console.log(result);
    })
  });
});