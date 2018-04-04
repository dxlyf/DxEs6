import _ from 'lodash'

var Storage = function (storage) {
    this.storage = storage
}
Storage.prototype = {
    constructor: Storage,
    setItem (name, data) {
        this.storage.setItem(name, JSON.stringify(data));
    },
    getItem (name) {
        return JSON.parse(this.storage.getItem(name));
    },
    has (name) {
        return this.storage.hasOwnProperty(name);
    },
    removeItem (name) {
        return      this.storage.removeItem(name);
    }
};
/** 
 * 参考window.sessionStorage 唯一的区别支持存储对象，原生的不支持存储对象
 * @type {object} 
*/
export const sessionStorage = new Storage(window.sessionStorage);
/** 
 * 参考window.localStorage 唯一的区别支持存储对象，原生的不支持存储对象
 * @type {object} 
*/
export const localStorage = new Storage(window.localStorage);
/** 
 * 参考localStorage，唯一的区别在它只允许读取一次
 * @type {object} 
*/
export const tempStorage = {
    setItem (name, data) {
        localStorage.setItem(name, data);
    },
    getItem (name) {
        var result = exports.localStorage.getItem(name, data);
        localStorage.removeItem(name);
        return result;
    }
};