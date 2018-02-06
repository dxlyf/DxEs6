const objBase:object={};
const toStringBase:any=objBase.toString;


export function  getType(value:any):string {
    return toStringBase.call(value);
}

