
type optionsData=()=>object;

interface DxOptions{
    readonly el?:Element|string;
    data?:object|optionsData;
}
export default class Dx {
    private $el:Element;
    private data:Object;
    constructor(options:DxOptions)
    {
        this.$el=document.getElementById(options.el as string);

    }
}

