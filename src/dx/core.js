import Vue from 'vue'
import $ from 'jquery'
import _ from 'lodash'
import ELEMENT from 'element-ui'
var
ArrayProto = Array.prototype,
extend = $.extend,
isFunction = $.isFunction,
isPlainObject = $.isPlainObject,
isArray = $.isArray,Dx=Object.create(null);


function Class() { }
Class.extend = function (protoProps, staticProps) {
    var parent = this,
        member, name, child, fn;
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            parent.apply(this, arguments);
        };
    }
    extend(child, parent, staticProps);
    child.prototype = _.create(parent.prototype, {
        'constructor': child
    });
    for (member in protoProps) {
        if (protoProps[member] != null && protoProps[member].constructor === Object) {
            child.prototype[member] = extend(true, {}, parent.prototype[member], protoProps[member]);
        } else {
            child.prototype[member] = protoProps[member];
        }
    }
    Object.defineProperty(child, "__super__", {
        value: parent,
        writable: true
    })
    return child;
}
Class.getInstance = function () {
    var that = this, fn = that, __instance = that.__instance, len = arguments.length;
    if (__instance) {
        return __instance;
    }
    var strBody = '', args = [];
    for (var i = 0; i < len; i++) {
        args.push('args[' + i + ']');
    }
    strBody = 'return new fn(' + args.join(',') + ');';
    var fn = new Function('fn', 'args', strBody);
    Object.defineProperty(that, "__instance", {
        value: fn(that, arguments),
        writable: true
    })
    return __instance;
}
// 事件观察对象
var Observable = Class.extend({
    constructor: function () {
        Object.defineProperty(this, "__events__", {
            value: {},
            writable: true
        });
    },
    on: function (name, handler, one, first) {
        if (isPlainObject(name)) {
            for (var n in name) {
                this.on(n, name[n], one, first);
            }
            return this;
        }
        var events = this.__events__[name] = this.__events__[name] || [];
        if (one) {
            handler = (function (name, handler) {
                return function onehandler() {
                    handler.apply(this, arguments);
                    this.off(name, onehandler);
                }
            }(name, handler));
        }
        if (first) {
            events.unshift(handler);
        } else {
            events.push(handler);
        }
        return this;
    },
    one: function (name, handler, first) {
        this.on(name, handler, true, first);
        return this;
    },
    off: function (name, handler) {
        if (!name) {
            this.__events__ = {};
        } else if (name && !handler) {
            this.__events__[name] = [];
        } else {
            var events = this.__events__[name] || [],
                newEvents;
            for (var i = events.length - 1; i >= 0; i--) {
                if (events[i] === handler) {
                    events.splice(i, 1);
                }
            }
        }
        return this;
    },
    trigger: function (name) {
        var i, len, result, events = this.__events__[name] || [],
              args = _.slice(arguments, 1),
              allevents = this.__events__["*"] || [];
        events = events.slice();
        allevents = allevents.slice();
        for (i = 0, len = events.length; i < len; i++) {
            result = events[i].apply(this, args);
        }
        args = [name].concat(args);
        for (i = 0, len = allevents.length; i < len; i++) {
            allevents[i].apply(this, args);
        }
        return result === true;
    }
});
function preventDefault() {
    this._defaultPrevented = true;
}
function isDefaultPrevented() {
    return this._defaultPrevented === true;
}
function hasInstanceof(obj, target) {
    return obj instanceof target;
}
function  template (template) {
    return _.template(template);
}
function getUrlParams (name,url) {
    url = url || location.search;
    var sname = name + "=",
        len = sname.length,
        index = url.indexOf(sname),
        result = '', lastIndex;
    if (index != -1) {
        index += len;
        lastIndex = url.indexOf("&", index);
        result = lastIndex == -1 ? url.substring(index) : url.substring(index, lastIndex);
    }
    return result;
}
export function hasInstanceof(obj, target) {
    return obj instanceof target;
}
export {  
    Class,
    Observable,
    Vue,
    ELEMENT,
    _,
    extend
}
export  var  {
    Promise=$.Deferred,
    when= $.when,
    template=  (template)=> {
        return _.template(template);
    },
    getUrlParams= (name, url)=> {
        url = url || location.search;
        var sname = name + "=",
            len = sname.length,
            index = url.indexOf(sname),
            result = '', lastIndex;
        if (index != -1) {
            index += len;
            lastIndex = url.indexOf("&", index);
            result = lastIndex == -1 ? url.substring(index) : url.substring(index, lastIndex);
        }
        return result;
    },
    convertToInt= (value, defaultValue)=>{
        defaultValue = _.isUndefined(defaultValue) ? null : defaultValue;
        value = Number(value);
        if (isNaN(value)) {
            return defaultValue;
        }
        return value;
    },
    cloneObject=  (obj)=> {
        return JSON.parse(JSON.stringify(obj));
    }
}={};