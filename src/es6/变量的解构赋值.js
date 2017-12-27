// 数据解构

(function(){
  var a2 = ['a', 'b', 'c'];
  var b2 = [...a2, 'foo'];
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    let [ , , third] = ["foo", "bar", "baz"];
    let [head, ...tail] = [1, 2, 3, 4];
    let [x, y, ...z] = ['a'];
    let [a, b, d] = [1, [2, 3], 4];
    let arr = [1, 2, 3];
    let {0 : first, [arr.length - 1] : last} = arr;

    let [x2, y2 = 'b'] = ['a']; // x
}());

// 对象解构
function a(){
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
}
function b()
{
        // 变量别名,默认值
       let { foo: baz,bar2:pp='4444' } = { foo: 'aaa', bar: 'bbb' };

       let obj = {
        p: [
          'Hello',
          { y: 'World' }
        ]
      };
      
      let { p: [x, { y }] } = obj;

      const node = {
        loc: {
          start: {
            line: 1,
            column: 5
          }
        }
      };
      
      let { loc, loc: { start }, loc: { start: { line }} } = node;
      
      var { message: msg = 'Something went wrong' } = {};
}
// 字符串解构
function c()
{
    const [a, b, c, d, e] = 'hello';
}
// 函数解构
function d()
{
    function add([x, y]){
        return x + y;
      }
      
      add([1, 2]); // 3

      function move({x = 0, y = 0} = {}) {
        return [x, y];
      }
      
      move({x: 3, y: 8}); // [3, 8]
      move({x: 3}); // [3, 0]
      move({}); // [0, 0]
      move(); // [0, 0]

      function move2({x, y} = { x: 0, y: 0 }) {
        return [x, y];
      }
      
      move2({x: 3, y: 8}); // [3, 8]
      move2({x: 3}); // [3, undefined]
      move2({}); // [undefined, undefined]
      move2(); // [0, 0]
}

// 用途
function f()
{
    // 交换值
    let x = 1;
    let y = 2;
    
    [x, y] = [y, x];

    // 遍历map
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    
    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
    // 获取键名
     for (let [key] of map) {
    // ...
  }
  
  // 获取键值
  for (let [,value] of map) {
    // ...
  }
}
