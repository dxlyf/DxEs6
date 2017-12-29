
/* @flow */

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

if(PRODUCTION)
{
    console.log('1111111111111111');
}

 if(process.env.NODE_ENV='development')
 {
     console.log('8885545888438');
 }
 if (module.hot) {
     module.hot.accept('../scripts/main.js', function() {
       mess="更新了"+(index++);
       console.log('main.js更新');
    
     })
 }