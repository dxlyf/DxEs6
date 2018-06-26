function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
  var hw = helloWorldGenerator();

  function upload(value)
  {
      return value==2?Promise.reject(value): Promise.resolve(value)
  }
  function* uploads(num)
  {
      for(var i=0;i<num;i++){
          yield upload(i);
      }
      return Promise.reject();
  }

  function test()
  {
     var d= uploads(10),result=[];
     do{
         var r=d.next();
         r.value.then((p)=>{
            result.push(p);
         }).catch(()=>{})
         console.log(r)
     }while(!r.done)

     return result;
  }