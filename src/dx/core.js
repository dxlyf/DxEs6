
/**
 * @namespace Mjb
 * @module core 
 * @example
 * Mjb.Class.extend({
 * constructor:function()
 * {
 *      //初始化方法
 * }
 * })
 */


import Vue from 'vue';
import $,{isPlainObject,isFunction,extend,isArray} from 'jquery';
import _ from 'lodash';
import ELEMENT from 'element-ui';
/**
 * 基类 
 * @class
 * @hideconstructor
 * @tutorial class
 */
function Class() { }
/**
 * 类继承
 * @extends Class
 * @param {object} protoProps - 原型属性扩展对象
 * @param {object} staticProps - 静态属性扩展对象
 * @returns {function} - newClass extends Class
 */
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

var Observable = Class.extend(
    /** @lends Observable.prototype */
    {
    /** 
     * 事件观察
     * @extends Class
     * @constructs 
    */
    constructor () {
        /**
         * 事件对象
         * @memberof Observable.prototype
         * @member  {object} __events__
         */
        Object.defineProperty(this, "__events__", {
            value: {},
            writable: true
        });
    },
    /**
     * 添加事件监听
     * @param {string|object} name - 事件名或事件对象
     * @param {function} handler - 事件回调函数
     * @param {boolean} one - 是否只执行一次
     * @param {boolean} first - 是否添加前面
     * @returns {this} - 返回实例本身
     */
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
    /**
     * 添加一个只执行一次的事件
     * @param {string} name 事件名
     * @param {function} handler 事件函数 
     * @param {boolean} first 是否添加前面
     * @returns {this} 返回本身实例
     */
    one (name, handler, first) {
        this.on(name, handler, true, first);
        return this;
    },
    /**
     * 移除事件
     * @param {string} name 事件名
     * @param {function} [handler] 事件函数
     * @returns {this} 返回本身实例
     */
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
    /**
     * 触发监听事件
     * @param {string} name 事件名 
     * @return {boolean} 返回最后一个执行函数结果
     */
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

/**
 * 异步函数
 * @memberof core
 * @function 
 * @param {function} func - 异步执行函数
 * @param {function} cb - 成功/失败回调函数
 */
export  let runAsync = function (func, cb) {
    cb = cb || function () {}; 
    return function () {
      var async = false;
      var args = arguments;
      var promise = $.Deferred(function (deferred) {
        var resolve=deferred.resolve,reject=deferred.reject;
        var answer = func.apply({
          async: function () {
            async = true;
            return function (err, value) {
              if (err) {
                reject(err);
              } else {
                resolve(value);
              }
            };
          }
        }, Array.prototype.slice.call(args));
  
        if (!async) {
          if (answer&&answer.then) {
            answer.then(resolve, reject);
          } else {
            resolve(answer);
          }
        }
      }); 
      promise.then(cb.bind(null, null), cb); 
      return promise;
    }
  };
  runAsync.cb = function (func, cb) {
    return runAsync(function () {
      var args = Array.prototype.slice.call(arguments);
      if (args.length === func.length - 1) {
        args.push(this.async());
      }
      return func.apply(this, args);
    }, cb);
  };
  


var OBJECT_CORE={};
/**
 * 判断是否实例对象
 * @param {constructor} obj  - 实例对象
 * @param {function} target - 构造函数
 * @returns {boolean}
 */
export function hasInstanceof(obj, target) {
    return obj instanceof target;
}
/**
 * 判断属性是否存在对象中
 * @param {object} object  - 对象
 * @param {string} key - 属性名
 * @returns {boolean}
 */
export function hasOwnProperty(object,key){
    return OBJECT_CORE.hasOwnProperty.call(object,key);
}


/**
 * promise对象或者函数
 * @typedef {function|Promise} promiseAndfunction
 */

/**
 * 执行异步队列，当某个函数执行失败。直接返回失败回调
 * @param {array.<promiseAndfunction>} queues  - 类型数组
 * @param {promiseAndfunction} queues[0] - 队列回调函数
 * @param {*} [context=this] - 上下文对象
 * @returns {Promise}
 * @see [promiseAndfunction]{@link core#promiseAndfunction}
 * @see {@link http://github.com|GitHub}
 */
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
    /** 
     * jquery.Deferred对象
     * @function
     * @static
     */
    Promise=$.Deferred,
      /** 
     * jquery.when对象
     * @function
     * @static
     */
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


