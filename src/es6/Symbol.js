import  Symbol from 'babel-runtime/core-js/symbol'
function b()
{
    var gf=typeof Symbol() === "symbol";
    
}

let s1 = Symbol('foo');

class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
  }
  let obj = {length: 2, 0: 'c', 1: 'd'};
  ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
  
  obj[Symbol.isConcatSpreadable] = true;
  ['a', 'b'].concat(obj, 'e') 