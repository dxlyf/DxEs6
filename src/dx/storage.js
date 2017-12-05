import _ from 'lodash'

var Storage = function (storage) {
    this.storage = storage
}
Storage.prototype = {
    constructor: Storage,
    setItem: function (name, data) {
        var valuetype = Object.prototype.toString.call(data);
        if (_.isObject(data) && !_.isFunction(data)) {
            data = JSON.stringify(data);
        }
        this.storage.setItem("_" + name + "_type", valuetype)
        this.storage.setItem(name, data);
    },
    getItem: function (name) {
        var value, valuetype;
        if (this.has(name)) {
            value = this.storage.getItem(name)
            valuetype = this.storage.getItem("_" + name + "_type");
            if (valuetype == '[object Object]' || valuetype == '[object Array]') {
                value = JSON.parse(value);
            }
        }
        return value;
    },
    has: function (name) {
        return this.storage.hasOwnProperty(name);
    },
    removeItem: function (name) {
        if (this.has(name)) {
            this.storage.removeItem(name);
            this.storage.removeItem("_" + name + "_type");
        }
    }
};
export const sessionStorage = new Storage(window.sessionStorage);
export const localStorage = new Storage(window.localStorage);
export const tempStorage = {
    setItem: function (name, data) {
        exports.localStorage.setItem(name, data);
    },
    getItem: function (name) {
        var result = exports.localStorage.getItem(name, data);
        exports.localStorage.removeItem(name);
        return result;
    }
};