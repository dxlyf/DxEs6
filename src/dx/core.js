import Vue from 'vue'
import $,{isPlainObject,isFunction,extend,isArray} from 'jquery'
import _ from 'lodash'
import ELEMENT from 'element-ui'
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
    constructor () {
        Object.defineProperty(this, "__events__", {
            value: {},
            writable: true
        });
    },
    on (name, handler, one, first) {
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
    one (name, handler, first) {
        this.on(name, handler, true, first);
        return this;
    },
    off (name, handler) {
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
    trigger (name) {
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
var _requestAnimationFrame = (function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        return setTimeout(callback, 1000 / 60);
    };
    return function(callback){
        return requestAnimationFrame(callback);
    }
}());
var _cancelAnimationFrame=(function () {
    var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (timeoutId) {
        return clearTimeout(timeoutId);
    };
    return function(timeoutId){
        return cancelAnimationFrame(timeoutId);
    }
}());

var OBJECT_CORE={};
export function hasInstanceof(obj, target) {
    return obj instanceof target;
}
export function hasOwnProperty(object,key){
    return OBJECT_CORE.hasOwnProperty.call(object,key);
}
export function  asyncQueue(queues,context=this) {
    return $.Deferred(({resolveWith, rejectWith})=>{
          var result = [], rcontext,fn;            
          function next()
          {
              result.push(_.toArray(arguments));
              dequeue();
          }
          function end() {
              result.push(_.toArray(arguments));
              rejectWith(context,[result]);
          }
          function dequeue() {
              fn = queues.shift();
              if (fn&&fn.then) {
                fn.then(next, end);
              } else if (fn) {
                  fn(next, end);
              } else {
                resolveWith(context, [result]);
              }
          }
          return dequeue();
   });
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
    },
    requestAnimationFrame=_requestAnimationFrame,
    cancelAnimationFrame=_cancelAnimationFrame,
    merge
}={
    merge(target,...sources)
    {
        return _.mergeWith(target,...sources,(objValue, srcValue)=>{
            if(Array.isArray(srcValue))
            {
                return _.clone(srcValue);
            }
        })
    }

};