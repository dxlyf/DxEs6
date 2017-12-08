class Base
{
    name:string="没有初始化";
    constructor()
    {
        this.name="基类"
    }
    getName()
    {
        return this.name;
    }
    static extend(params:string) {
        
    }
}

function P()
{
    return new Promise((resolve,reject)=>{


    })
}