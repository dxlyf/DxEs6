
import {extend} from '../../../src/util/extend'

describe("测试extend", function() {
    beforeAll(function(){
        console.log('1');
    });
    beforeEach(function() {
        console.log('2');
     });
    it("extend 扩展对象", function() {
        console.log('3');
        var a={
                age:'43'

        };
        var b={
            age:'4354'

        };
        var obj=extend(a,b)
         expect(obj.age).toBe('4354');
    });
    it("extend 扩展对象2", function() {
        console.log('3');
        var a={
                age:'43'

        };
        var b={
            age:'4354'

        };
        var obj=extend(a,b)
         expect(obj.age).toBe('4354');
    });
 });

 
