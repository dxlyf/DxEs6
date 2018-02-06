import * as objBase from './object'
export function isBoolean(value:any):boolean {
    return value === true || value === false || objBase.getType(value) == '[object Boolean]';
}
export function isObject(value:any):boolean {
    return typeof value==='object';
}
export function isPlainObject(value:any):boolean {
    return objBase.getType(value)=='[object Object]';
}
export function isArray(value:any):boolean {
    return Array.isArray(value);
}