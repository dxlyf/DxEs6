
import * as typecheck from './typecheck'
import { fail } from 'assert';

export function extend(dep:boolean|object,...sources:object[]) {
     let target=dep,len=sources.length,isFirstBool=typecheck.isBoolean(target);
     if(isFirstBool&&len==1)
     {
        target=this;
     }else if(isFirstBool){
        target=sources.shift();
        len--;
     }else{
        dep=false;
     }
     while(len--){
        let source=sources.shift();
        if(typecheck.isObject(source))
        {
            for(let name in source)
            {
               let member=target[name];
               let copy=source[name];
               if(member!==copy&&copy!=undefined)
               {
                   if(dep&&typecheck.isArray(copy)){
                    target[name]=extend(dep,typecheck.isArray(member)?member:[],copy);
                   }else if(dep&&typecheck.isObject(copy)){
                    target[name]=extend(dep,typecheck.isObject(member)?member:{},copy);
                   }else{
                    target[name]=copy;
                   }
               }
            }
        }
     }
     return target;

}
