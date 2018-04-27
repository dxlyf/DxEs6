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
describe('测试 dx.paths.resolve 运行情况',()=>{


    it('测试  dx.paths.resolve',()=>{
        
        expect(dx.paths.resolve('http://www.server.ap/oms/../ppp/ll')).toBe('http://www.server.ap/ppp/ll');
    });
    
});
describe('测试 dx.paths.resolve 运行情况2',()=>{


    it('测试  dx.paths.resolve2',()=>{
        
        expect(dx.paths.resolve('http://www.server.ap/oms/pmas/../../ppp/ll')).toBe('http://www.server.ap/ppp/ll');
    });
    
});