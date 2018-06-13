let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 原型扩展
var arrayProto=Object.create(Array.prototype);

arrayProto.pushList=function()
{
    this.push('aa');
}
var arr3=[];
arr3.__proto__=arrayProto;
Object.setPrototypeOf(arr3,arrayProto);


// flat T39草案

var aflat=[1,2,3,4,[6,7]].flat()

