import dx from '../../../src/dx/main';

describe('测试 dx 运行情况',()=>{

    var _Observable=new dx.Observable();
    var id=0;
    _Observable.on('add',()=>{
        id++;
    });
    it('测试 Observable',()=>{
        
        _Observable.trigger('add');
        expect(id).toBe(1);
    });
    
});