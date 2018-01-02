import {update} from './main.js'
import 'css/index.css'

var mess="",index=0;
export class Greeter  {
   name="43";
    constructor(name) {
        this.name = name;
    }
    update()
    {
        update(this.name+":"+Date.now())
    }
}
const _Greeter=new Greeter("李四");
_Greeter.update();
console.log('55555555555555555555555');
 if(process.env.NODE_ENV=='development')
 {
     console.log('8885545888438');
 }if (module.hot) {
    module.hot.accept('./main.js', function() {
      console.log('main.js更新');
     // _Greeter.update();
     // update('555');
    });

    // module.hot.dispose(data => {
    //    // 清理并将 data 传递到更新后的模块……
    //    console.log('dispose');
    //  })
}
 
