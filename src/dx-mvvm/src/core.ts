
type optionsData=()=>object;
type DxOptions={
    readonly el?:Element|string;
    data?:object|optionsData;
}
interface optionsData2{
    name:string
}

export default class Dx {
    private $el:Element;
    private data:Object;
    constructor(options:DxOptions)
    {
        this.$el=document.getElementById(options.el as string);

    }
}

type Alias = { num: number };
interface Interface {
    num: number;
};
declare function aliased(arg: Alias): Alias;

declare function interfaced(arg: Interface): Interface;

class InterfaceObj implements Interface{
    num:number;
    constructor(num:number)
    {
        this.num=num;
    }
}

function interfaced(arg:Interface):InterfaceObj {
    
 return arg; 
}
