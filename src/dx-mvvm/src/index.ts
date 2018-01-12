// /// <reference path="../typings/global.d.ts" />

import update from './main'
import 'css/index.css'

var mess:string="",index:number=0;
export class Greeter  {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    update()
    {
        update(this.name+":"+Date.now())
    }
}
const _Greeter=new Greeter("李四");
_Greeter.update();
console.log('55555555555555555555555:'+process.env.NODE_ENV);
 if(process.env.NODE_ENV=='development')
 {
   
 }
 if (module.hot) {
    console.log('hot------');
    module.hot.accept('./main', function() {
      console.log('main.ts更新');
        update(String(Date.now()));
     // update('555');
    });

    module.hot.dispose(data => {
       // 清理并将 data 传递到更新后的模块……
       console.log('dispose');
     })
}
 
