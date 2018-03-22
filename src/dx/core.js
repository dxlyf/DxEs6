
/** 
 * Vue 变量
 * @var {function} Vue
 * @requires Vue
 * @readonly
 */
import Vue from 'vue';
/** 
 * jquery 变量
 * @member {function} $
 * @requires jQuery
 * @readonly
 */
import $,{isPlainObject,isFunction,extend} from 'jquery';
/** 
 * lodash 变量
 * @var {function} _
 * @requires lodash
 * @readonly
 */
import _ from 'lodash';
/** 
 * ELEMENT 变量
 * @var {object} ELEMENT
 * @requires element-ui
 * @readonly
 */
import ELEMENT from 'element-ui';
/**
 * 基类 
 * @alias Class
 * @class
 */
function Class() { }
/**
 * 类继承
 * @param {object} protoProps - 原型属性扩展对象
 * @param {object} staticProps - 静态属性扩展对象
 * @returns {function} - newClass extends Class
 * @public
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
         * @private
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
 * queues 集合回调函数
 * @callback promiseCallback
 * @param {function} resolve 成功回调
 * @param {function} reject 失败回调
 */

/**
 * 执行异步队列，当某个函数执行失败。直接返回失败回调
 * @param {(array<function>|array<promise>)} queues  - 队列集合
 * @property  {promiseCallback} queue - 执行队列集合中的回调函数值
 * @param {any} [context=this] - 上下文对象
 * @returns {Promise}
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
     * 延迟对象
     * @function
     * @param {promiseCallback} constructor 回调函数
     * @returns {Promise}
     */
    Promise=$.Deferred,
      /** 
     * 处理多个Deferred请求对象，当所有返回成功时，再响应
     * @function
     * @param {...Promise} arguments 
     * @returns {Promise}
     */
    when= $.when,
     /** 
     * html模板解析
     * @param {string} template html模板
     * @returns {function} 
     * @function
     * @example {@lang javascript}
     * var temaplte=Mjb.template('<div>{{name}}</div>');
     * var str=template({name:"李三"})  //return  <div>李三</div>
     */
    template=  (template)=> {
        return _.template(template);
    },
    /**
     * 解析URL,获取URL参数值
     * @default ''
     * @returns {string} 
     * @function
     */
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
    /**
     * 其它类型转换成数字值，如果转换失败返回默认值
     * @param {any} value 需要转换的值
     * @param {number} defaultValue 没有转换成功，默认值
     * @function
     */
    convertToInt= (value, defaultValue)=>{
        defaultValue = _.isUndefined(defaultValue) ? null : defaultValue;
        value = Number(value);
        if (isNaN(value)) {
            return defaultValue;
        }
        return value;
    },
    /**
     * 克隆对象,通过JSON.stringify克隆，所以不会复制function或复杂对象
     * @returns {object}
     * @function
    */
    cloneObject=  (obj)=> {
        return JSON.parse(JSON.stringify(obj));
    },
    /** 
     * 参考window.requestAnimationFrame 这里做了兼容性处理
     * @function
    */
    requestAnimationFrame=_requestAnimationFrame,
      /** 
     * 参考window.cancelAnimationFrame 这里做了兼容性处理
     * @function
    */
    cancelAnimationFrame=_cancelAnimationFrame,
    merge
    }={
    /**
     * 合并对象，如果是数组则克隆覆盖
     * @param {object} target 
     * @param {...object} sources 
     * @returns {object}
     */
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


