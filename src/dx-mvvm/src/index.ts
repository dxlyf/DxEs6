
import main from './main'
var mess:string="",index:number=0;
export class Greeter  {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return mess+":Hello888, " + this.greeting;
    }
}

 if (module.hot) {
     module.hot.accept('./main', function() {
       mess="更新了"+(index++);
       console.log('main.js更新');
       main(Greeter);
     })
 }