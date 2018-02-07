
import {extend} from '../../../src/util/extend'

describe("测试extend", function() {
    beforeAll(function(){
      
    });
    beforeEach(function() {
       
     });
    it("extend 扩展对象", function() {

        var a={
                age:'43',
                data:{
                    name:"age"
                }
        };
        var b={
            age:'4354',
            data:{
                age:43
            }
        };
        var obj=extend(true,a,b);
        obj.data.age=55;
        expect(b.data.age).not.toBe(55);
        expect(b.data.age).toBe(55);
    });
  
 });

 
