


async function getData(src) {
        let data=await Promise.resolve('5454');

        return data;
}
function upload(value)
{
    return value==2?Promise.reject(value): Promise.resolve(value)
}


async  function test()
{
    var result=[];
    for(var i=0;i<10;i++){
        // promise 返回失败会抛出异常
       var o= await upload(i).then(v=>{
           result.push(v)
           return v;
        }).catch(b=>{
        });
        console.log(o)

      
    }
    console.log(result)
    return result;
}
