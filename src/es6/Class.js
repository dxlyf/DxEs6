@testable(true)
class Base
{
    static age=43;
    static mmm()
    {

    }
    @readonly(true)
    age="呆呵";
    name="没有初始化";
    constructor()
    {
        this.name="基类"
    }
    getName()
    {
        return this.name;
    }
    static extend(params) {
        
    }
}

function readonly(target, name, descriptor){
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false;
    return descriptor;
  }
function testable()
{
    return function decorator(target) {
        target.isTestable = value;
     }
}