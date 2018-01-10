// ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
const foo = 'bar';
const baz = {foo};
const o = {
    method() {
      return "Hello!";
    }
  };
  const cart = {
    _wheels: 4,
  
    get wheels () {
      return this._wheels;
    },
  
    set wheels (value) {
      if (value < this._wheels) {
        throw new Error('数值太小了！');
      }
      this._wheels = value;
    }
  }

  let propKey = 'foo';
  
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };

  let lastWord = 'last word';
  //ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
  const a = {
    'first word': 'hello',
    [lastWord]: 'world'
  };
  //
  a['first word'] // "hello"
  a[lastWord] // "world"
  a['last word'] // "world"

 
/*   对象的扩展运算符
  《数组的扩展》一章中，已经介绍过扩展运算符（...）。 */
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

  let obj3={aaa:"43",name:"43"};

  let obj4={...obj3,name:"111"}