export  class View{
    constructor(name,args)
    {
        super()
        this._name=name
        this.args=args
    }
    get name(){
        return this._name
    }
    static mixin()
    {

    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
          yield arg;
        }
    }
}
export class HeadView extends View{
    getMessage()
    {
            var name=super._name
    }
} 