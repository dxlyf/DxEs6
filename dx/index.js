(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("jquery"), require("ELEMENT"), require("vue"), require("configs"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "jquery", "ELEMENT", "vue", "configs"], factory);
	else if(typeof exports === 'object')
		exports["Dx"] = factory(require("lodash"), require("jquery"), require("ELEMENT"), require("vue"), require("configs"));
	else
		root["Dx"] = factory(root["_"], root["$"], root["ELEMENT"], root["Vue"], root["configs"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cloneObject = exports.convertToInt = exports.getUrlParams = exports.template = exports.when = exports.Promise = exports.extend = exports._ = exports.ELEMENT = exports.Vue = exports.Observable = exports.Class = undefined;
exports.hasInstanceof = hasInstanceof;

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _elementUi = __webpack_require__(3);

var _elementUi2 = _interopRequireDefault(_elementUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrayProto = Array.prototype,
    extend = _jquery2.default.extend,
    isFunction = _jquery2.default.isFunction,
    isPlainObject = _jquery2.default.isPlainObject,
    isArray = _jquery2.default.isArray,
    Dx = Object.create(null);

function Class() {}
Class.extend = function (protoProps, staticProps) {
    var parent = this,
        member,
        name,
        child,
        fn;
    if (protoProps && _lodash2.default.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function child() {
            parent.apply(this, arguments);
        };
    }
    extend(child, parent, staticProps);
    child.prototype = _lodash2.default.create(parent.prototype, {
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
    });
    return child;
};
Class.getInstance = function () {
    var that = this,
        fn = that,
        __instance = that.__instance,
        len = arguments.length;
    if (__instance) {
        return __instance;
    }
    var strBody = '',
        args = [];
    for (var i = 0; i < len; i++) {
        args.push('args[' + i + ']');
    }
    strBody = 'return new fn(' + args.join(',') + ');';
    var fn = new Function('fn', 'args', strBody);
    Object.defineProperty(that, "__instance", {
        value: fn(that, arguments),
        writable: true
    });
    return __instance;
};
// 事件观察对象
var Observable = Class.extend({
    constructor: function constructor() {
        Object.defineProperty(this, "__events__", {
            value: {},
            writable: true
        });
    },
    on: function on(name, handler, one, first) {
        if (isPlainObject(name)) {
            for (var n in name) {
                this.on(n, name[n], one, first);
            }
            return this;
        }
        var events = this.__events__[name] = this.__events__[name] || [];
        if (one) {
            handler = function (name, handler) {
                return function onehandler() {
                    handler.apply(this, arguments);
                    this.off(name, onehandler);
                };
            }(name, handler);
        }
        if (first) {
            events.unshift(handler);
        } else {
            events.push(handler);
        }
        return this;
    },
    one: function one(name, handler, first) {
        this.on(name, handler, true, first);
        return this;
    },
    off: function off(name, handler) {
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
    trigger: function trigger(name) {
        var i,
            len,
            result,
            events = this.__events__[name] || [],
            args = _lodash2.default.slice(arguments, 1),
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
function template(template) {
    return _lodash2.default.template(template);
}
function getUrlParams(name, url) {
    url = url || location.search;
    var sname = name + "=",
        len = sname.length,
        index = url.indexOf(sname),
        result = '',
        lastIndex;
    if (index != -1) {
        index += len;
        lastIndex = url.indexOf("&", index);
        result = lastIndex == -1 ? url.substring(index) : url.substring(index, lastIndex);
    }
    return result;
}
function hasInstanceof(obj, target) {
    return obj instanceof target;
}
exports.Class = Class;
exports.Observable = Observable;
exports.Vue = _vue2.default;
exports.ELEMENT = _elementUi2.default;
exports._ = _lodash2.default;
exports.extend = extend;
var _ref = {},
    _ref$Promise = _ref.Promise,
    Promise = _ref$Promise === undefined ? _jquery2.default.Deferred : _ref$Promise,
    _ref$when = _ref.when,
    when = _ref$when === undefined ? _jquery2.default.when : _ref$when,
    _ref$template = _ref.template,
    template = _ref$template === undefined ? function (template) {
    return _lodash2.default.template(template);
} : _ref$template,
    _ref$getUrlParams = _ref.getUrlParams,
    getUrlParams = _ref$getUrlParams === undefined ? function (name, url) {
    url = url || location.search;
    var sname = name + "=",
        len = sname.length,
        index = url.indexOf(sname),
        result = '',
        lastIndex;
    if (index != -1) {
        index += len;
        lastIndex = url.indexOf("&", index);
        result = lastIndex == -1 ? url.substring(index) : url.substring(index, lastIndex);
    }
    return result;
} : _ref$getUrlParams,
    _ref$convertToInt = _ref.convertToInt,
    convertToInt = _ref$convertToInt === undefined ? function (value, defaultValue) {
    defaultValue = _lodash2.default.isUndefined(defaultValue) ? null : defaultValue;
    value = Number(value);
    if (isNaN(value)) {
        return defaultValue;
    }
    return value;
} : _ref$convertToInt,
    _ref$cloneObject = _ref.cloneObject,
    cloneObject = _ref$cloneObject === undefined ? function (obj) {
    return JSON.parse(JSON.stringify(obj));
} : _ref$cloneObject;
exports.Promise = Promise;
exports.when = when;
exports.template = template;
exports.getUrlParams = getUrlParams;
exports.convertToInt = convertToInt;
exports.cloneObject = cloneObject;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideLoading = exports.loading = exports.notification = exports.message = exports.msgbox = exports.prompt = exports.confirm = exports.alert = undefined;

var _elementUi = __webpack_require__(3);

var _elementUi2 = _interopRequireDefault(_elementUi);

var _core = __webpack_require__(0);

var core = _interopRequireWildcard(_core);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showMessageBox(msgAction) {
    return function (message, title, options) {
        var promise = new core.Promise();
        if (isPlainObject(title) || isFunction(title)) {
            options = title;
            title = "";
        }
        if (!isPlainObject(options)) {
            options = {};
        }
        var oldCallback = options.callback;
        options.callback = function (action, instance) {
            if (action == 'confirm') {
                promise.resolve(instance);
            } else if (action == 'cancel') {
                promise.reject(instance);
            }
            oldCallback && oldCallback(action, instance);
        };
        title = title || "温馨提示";
        _elementUi2.default.MessageBox[msgAction](message, title, options);
        var then = promise.then;
        promise.then = function (onFulfilled, onRejected) {
            return then(onFulfilled, onRejected ? function (instance) {
                onRejected(instance);
                return new core.Promise();
            } : null);
        };
        return promise;
    };
}
/**
 * 消息弹出框
 * @param {type} message 内容
 * @param {type} title 标题 
 * @param {object} options 参考element-ui 官网API MessageBox 
 */
var alert = exports.alert = showMessageBox('alert');
/**
 * 确认弹出框
 * @param {type} message 内容
 * @param {type} title 标题 
 * @param {object} options 参考element-ui 官网API MessageBox
 */
var confirm = exports.confirm = showMessageBox('confirm');
/**
* 对话弹出框
* @param {type} message 内容
* @param {type} title 标题 
* @param {object} options 参考element-ui 官网API MessageBox 
*/
var prompt = exports.prompt = showMessageBox('prompt');
/**
 * 自定义弹出框
 * @param {type} options 参考element-ui 官网API MessageBox msgbox
 */
var msgbox = exports.msgbox = _elementUi2.default.MessageBox;
var message = exports.message = _elementUi2.default.Message;
var notification = exports.notification = _elementUi2.default.Notification;
/*加载动画*/
var loadingInstance = null;
var loading = exports.loading = function loading(options) {
    loadingInstance = _elementUi2.default.Loading.service(options);
};
var hideLoading = exports.hideLoading = function hideLoading() {
    loadingInstance && loadingInstance.close() && (loadingInstance = null);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRequest = exports.postRequest = exports.request = exports.getUrl = undefined;

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _configs = __webpack_require__(11);

var _configs2 = _interopRequireDefault(_configs);

var _element = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseStatus = {
    'success': "200", // 操作成功
    'operationForbidden ': "403", // 操作被禁止
    'validateFailed ': "400", // 验证失败
    'noFound': "404", // 资源未找到
    'ServerError': "500" //服务器内部错误
},
    getUrl = _configs2.default.getUrl,
    noop = _jquery2.default.noop,
    globalAjaxSetting = {
    inShowLoading: false,
    isAutoCloseLoading: true,
    loading: false
};
_jquery2.default.ajaxSetup({
    type: "GET",
    dataType: "json",
    global: true,
    timeout: 60000,
    beforeSend: function beforeSend() {},
    error: function error(e) {},
    complete: function complete() {}
});
(0, _jquery2.default)(document).ajaxStart(function (e) {
    if (globalAjaxSetting.inShowLoading && !globalAjaxSetting.loading) {
        globalAjaxSetting.loading = true;
        (0, _element.loading)();
    }
});
(0, _jquery2.default)(document).ajaxSend(function (evt, request, settings) {});
(0, _jquery2.default)(document).ajaxComplete(function (evt, request, settings) {});
(0, _jquery2.default)(document).ajaxStop(function () {
    if (globalAjaxSetting.loading) {
        globalAjaxSetting.loading = false;
        (0, _element.hideLoading)();
    }
});
function wrapReuqest(options) {
    function wrapSuccess(d) {
        if (!options.isWrapAjax) {
            deferred.resolveWith(this, arguments);
            return;
        }
        var retStatus = d.retStatus,
            retBody = d.retBody,
            retMsg = d.retMsg || "访问服务器出错";
        if (retStatus == responseStatus.success) {
            deferred.resolveWith(this, [retBody, d]);
        } else {
            wrapFail(ajax, retStatus, retMsg, true);
        }
    }
    function wrapFail(e, statusText, error, isSuccess) {
        if (!options.isCustomerError) {
            if (statusText == "timeout") {
                (0, _element.alert)('网络请求超时', { type: "error" });
            } else if (statusText == 'parsererror') {
                (0, _element.alert)('系统出错了', { type: "error" });
            } else if (isSuccess && statusText == responseStatus.sessiontimeout) {} else if (isSuccess) {
                (0, _element.alert)(error, { type: "error" });
            } else {
                (0, _element.alert)(statusText, { type: "error" });
            }
        }
        deferred.rejectWith(this, arguments);
    }
    var ajax,
        deferred = _jquery2.default.Deferred();
    if (typeof options.data == "function") {
        options.data = options.data();
    }
    if (typeof options.success == "function") {
        deferred.done(options.success);
        options.success = null;
    }
    if (typeof options.error == "function") {
        deferred.fail(options.error);
        options.error = null;
    }
    options.data = options.data || {};
    options.isCustomerError = _.has(options, 'isCustomerError') ? options.isCustomerError : false;
    options.isWrapAjax = _.has(options, 'isWrapAjax') ? options.isWrapAjax : true;
    options.global = globalAjaxSetting.inShowLoading = options.inShowLoading = _.has(options, 'inShowLoading') ? !!options.inShowLoading : true;
    ajax = _jquery2.default.ajax(options);
    ajax.done(wrapSuccess).fail(wrapFail);
    return deferred.promise(ajax);
}
/**
 * @param {type} name configs 接口配置名称
 * @param {type} options jQuery.Ajax（options）参数 可以参考jquery ajax
 * @returns {type} ajax promise 对象
 * @example 
 * mjb.getRequest('getList',{data:{pageSize:10,pageIndex:1}}).then(sucessCallback,failCallback);
 */
function request(options) {
    if (options.name != "*") {
        options.url = getUrl(options.name);
    }
    return wrapReuqest(options);
}

function postRequest(options) {
    options.type = "post";
    return request(options);
}

function getRequest(options) {
    options.type = "get";
    return request(options);
}
exports.getUrl = getUrl;
exports.request = request;
exports.postRequest = postRequest;
exports.getRequest = getRequest;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(0);

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _view = __webpack_require__(8);

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

var _widget = __webpack_require__(9);

Object.keys(_widget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _widget[key];
    }
  });
});

var _element = __webpack_require__(4);

Object.keys(_element).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _element[key];
    }
  });
});

var _storage = __webpack_require__(10);

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storage[key];
    }
  });
});

var _request = __webpack_require__(5);

Object.keys(_request).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _request[key];
    }
  });
});

var _dataSource = __webpack_require__(12);

Object.keys(_dataSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dataSource[key];
    }
  });
});

var _utils = __webpack_require__(13);

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});
Object.defineProperty(exports, 'dates', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_utils).default;
  }
});

var _vueExtends = __webpack_require__(14);

Object.keys(_vueExtends).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vueExtends[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.View = undefined;

var _core = __webpack_require__(0);

var delegateEventSplitter = /^(\S+)\s*(.*)$/;
/***
 * 
 * extends Observable 
 * view 的主要功能,就是让页面的处理业务逻辑的JS代码变的清晰
 * 独立垂直的事件及方法定义声明，可以一目了然的知道你这块的要干什么,如果有复杂的业务，可以通过view 内部的事件机制进行交互
 * @param {string} el 元素
 * @param {object} events   el元素的事件委托 相当$('body').on('click','#btnAddSPU',function)
 * @param {Object,function} Model为null时,不会实例化Vue对象，Model 是对象时，就是一个Vue 实例参数,是函数时,需要返回一个普通对象或一个vue 实例对象 
 * @param {function} initialize 自运行函数  一般在mjb.View({initialize:function(){}}) 定义时重载initialize
 * 一般处理页面中js交互,一个页面一般View就够了
 * 如果页面较复杂,可以多个视图,如果是多个view中el不能是父子关系元素,复杂的业务逻辑可以通过事件机制处理
 * @example
 * <div id="page1">登录名:<input type="text" v-model="value"><button id="btnLogin">登录</button></div>
 * <div id="page2">姓名：{name}</div>
 * var view1=mjb.View({
 * el:"page1", // 登录
 * events:{
 *  'click #btnLogin':"login"
 * }
 * Model:{data:{name:""}},
 * initialize:function(){ 
 *       
 * },
 * loginSuccess:function(d)
 * {
 *      // 登录成功，触发自定义事件
 *      this.trigger('data',d);
 * },
 * login:function()
 * {
 *   mjb.postRequest('login'，{data:{name:this.Model.name}}).then(this.loginSuccess)
 * }
 * })
 * var view2=mjb.View({
 *      el:"page2",// 登录后显示登录账号
 *      Model:{
 *           data:{name:""}
 *      },
 *      initialize:function(){  
 *          view1.on('data',this.showInfo);
 *      },
 *      showInfo:function(d)
 *      {
 *        this.Model.name=d.userName
 *      }
 * })
 * 
 * 
 * */
var View = exports.View = _core.Observable.extend({
    el: null,
    $el: null,
    promise: null,
    events: null,
    Model: null,
    constructor: function constructor(options) {
        if (!(0, _core.hasInstanceof)(this, View)) return new View(options);
        _core.Observable.call(this);
        var that = this,
            name;
        extend(that, options);
        _core._.difference(_core._.keysIn(that), ['constructor']).forEach(function (name) {
            if (isFunction(that[name])) {
                that[name] = _core._.bind(that[name], that);
            }
        });
        if (that.promise && that.promise.then) {
            that.promise.then(that.__initialize__);
        } else {
            _core._.defer(that.__initialize__);
        }
    },
    __initialize__: function __initialize__() {
        var that = this;
        that._initModel.apply(this, arguments);
        that._createElement();
        that.delegateEvents();
        that.initialize.apply(this, arguments);
    },
    //视图初始化函数,会自动执行
    initialize: function initialize() {},
    _initModel: function _initModel() {
        var that = this;
        if (isFunction(that.Model)) {
            that.Model = that.Model.apply(that, arguments);
        }
        if (that.Model && !(that.Model instanceof Vue)) {
            if (that.el && that.el != 'body' && !_core._.has(that.Model, "el")) {
                that.Model.el = that.el;
            }
            that.Model = new Vue(that.Model);
        }
    },
    _createElement: function _createElement() {
        var that = this,
            element;
        if (that.el) {
            that.$el = (0, _core.$)(that.el);
        } else {
            that.$el = (0, _core.$)(that.template);
        }
    },
    delegateEvents: function delegateEvents(events) {
        if (!this.$el) {
            return;
        }
        if (!(events || (events = _core._.result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (isFunction(method)) method = _core._.bind(method, this);
            if (!_core._.isFunction(method)) method = this[events[key]];
            if (!method) {
                throw new Error('视图未找到定义的' + key + '方法');
            };
            var match = key.match(delegateEventSplitter);
            this.delegate(match[1], match[2], method, this);
        }
        return this;
    },
    delegate: function delegate(eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
    },
    undelegateEvents: function undelegateEvents() {
        if (this.$el) this.$el.off('.delegateEvents' + this.cid);
        return this;
    },
    undelegate: function undelegate(eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
    }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendWidget = exports.Widget = undefined;

var _core = __webpack_require__(0);

var widgets = {};
var noop = _core.$.noop,
    support = function () {
    var el = document.createElement('div'),
        name;
    var Names = {
        WebkitTransition: ['webkitTransitionEnd', 'webkitAnimationEnd', 'webkitTransition'],
        MozTransition: ['transitionend', 'animationend mozAnimationEnd', 'transition'],
        OTransition: ['oTransitionEnd otransitionend', 'oAnimationend', 'oTransition'],
        transition: ['transitionend', 'animationend MSAnimationEnd', 'transition']
    };
    for (name in Names) {
        if (el.style[name] !== undefined) {
            return { transitionEnd: Names[name][0], animationEnd: Names[name][1], transition: Names[name][2] };
        }
    }
    return false;
}();
if (support) {
    _core.$.event.special.bsTransitionEnd = {
        bindType: support.transitionEnd,
        delegateType: support.transitionEnd,
        handle: function handle(e) {
            if ((0, _core.$)(e.target).is(this)) {
                return e.handleObj.handler.apply(this, arguments);
            }
        }
    };
    _core.$.event.special.bsAnimationEnd = {
        bindType: support.animationEnd,
        delegateType: support.animationEnd,
        handle: function handle(e) {
            if ((0, _core.$)(e.target).is(this)) {
                return e.handleObj.handler.apply(this, arguments);
            }
        }
    };
    _core.$.fn.extend({
        animateCss: function animateCss(animationName, callback, duration) {
            this.addClass('mjb-animated ' + animationName).one('bsAnimationEnd', function (e) {
                (0, _core.$)(this).removeClass('mjb-animated ' + animationName);
                callback && callback.call(this, e);
            });
            if (duration) {
                this.emulateAnimationEnd(duration);
            }
            return this;
        }
    });
}

_core.$.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    (0, _core.$)(this).one('bsTransitionEnd', function () {
        called = true;
    });
    var callback = function callback() {
        if (!called) (0, _core.$)($el).trigger(support.transitionEnd);
    };
    setTimeout(callback, duration);
    return this;
};
_core.$.fn.emulateAnimationEnd = function (duration) {
    var called = false;
    var $el = this;
    (0, _core.$)(this).one('bsAnimationEnd', function () {
        called = true;
    });
    var callback = function callback() {
        if (!called) (0, _core.$)($el).trigger(support.animationEnd);
    };
    setTimeout(callback, duration);
    return this;
};

var Widget = _core.Observable.extend({
    constructor: function constructor(element, options) {
        if (!exports.hasInstanceof(this, this.constructor)) {
            return new this.constructor(element, options);
        }
        _core.Observable.call(this);
        this.widgetid = _core._.uniqueId('widget');
        this.initialize.apply(this, arguments);
    },
    events: [],
    initialize: function initialize(element, options) {
        if (element) {
            this.element = (0, _core.$)(element);
        }
        this.setOptions(options);
        this.setEvents(this.options);
        return this.options;
    },
    setOptions: function setOptions(options) {
        this.options = extend({}, this.options, options);
    },
    apply: function apply() {
        var args = _core._.toArray(arguments),
            method = args.shift();
        this.constructor.__super__.prototype[method].apply(this, args);
    },
    reflow: function reflow(element) {
        element.offsetHeight;
    },
    delegateEvents: function delegateEvents(element, name, selector, handler) {
        var that = this;
        if (typeof selector == "function") {
            handler = selector;
            selector = null;
        }
        name = name.split(' ');
        name = _core._.map(name, function (n) {
            if (n.indexOf('.') == -1) {
                return n + "." + that.widgetid;
            }
            return n;
        });
        element.on(name.join(' '), selector, handler);
    },
    undelegateEvents: function undelegateEvents(element, name, handler) {
        name = !name ? "." + this.widgetid : name;
        if (name.indexOf('.') == -1) {
            name += "." + this.widgetid;
        }
        element.off(name, handler);
    },
    _commandHandler: function _commandHandler(attrName, callback) {
        var that = this;
        return callback ? function (e) {
            var command = e.currentTarget.getAttribute(attrName);
            callback.call(that, command, e);
        } : function (e) {
            var command = e.currentTarget.getAttribute(attrName),
                name = '_on' + _core._.upperFirst(command);
            that[name] && that[name](e);
        };
    },
    setEvents: function setEvents(options) {
        this.on(_core._.pick(options, this.events));
    },
    destroy: function destroy() {}
});

function extendWidget(name, proto, parent, noRegister) {
    if (widgets[name]) {
        throw "already exist";
    }
    var prentWidget = _core._.isString(parent) ? widgets[parent] || Widget : Widget;
    var widget = typeof proto == "function" ? proto(prentWidget) : prentWidget.extend(proto);
    widget.prototype.widgetType = name;
    widgets[name] = widget;
    if (!noRegister) {
        registerPlugin(name, widget);
    }
    return widget;
}
function registerPlugin(name, Plugin) {
    var prexName = name;
    _core.$.fn[prexName] = function (options) {
        var widget,
            element,
            widgets = [];
        if (this.length) {
            for (var i = 0; i < this.length; i++) {
                element = (0, _core.$)(this[i]);
                widget = element.data(prexName);
                if (!widget) {
                    widget = new Plugin(element, options);
                    element.data(prexName, widget);
                }
                widgets.push(widget);
            }
        }
        return widgets[0];
    };
}
extendWidget('PanelMinus', {
    options: {
        parent: '.panel',
        selector: '.panel-body',
        target: null,
        show: true,
        expand: 'fa-minus-square-o',
        collapse: "fa-plus-square-o"
    },
    events: ['onToggle'],
    initialize: function initialize(element, options) {
        this.apply('initialize', element, options);
        this.delegateEvents(this.element, 'click', _core._.bind(this.toggleContent, this));

        if (!this.options.show) {
            this.toggleContent();
        }
    },
    getContentElement: function getContentElement(isShow) {
        if (this.target) {
            return this.options.target;
        }
        if (this.options.parent != '') {
            return this.element.closest(this.options.parent).children(this.options.selector);
        } else {
            return (0, _core.$)(this.options.selector);
        }
    },
    toggleContent: function toggleContent(e) {
        var element = this.element,
            isShow = false;
        if (element.hasClass(this.options.expand)) {
            element.removeClass(this.options.expand).addClass(this.options.collapse);
        } else {
            element.removeClass(this.options.collapse).addClass(this.options.expand);
            isShow = true;
        }
        this.toggle(this.getContentElement(isShow), isShow);
        this.trigger('onToggle', isShow);
    },
    toggle: function toggle(element, isShow) {
        return isShow ? this.show(element) : this.hide(element) && this;
    },
    show: function show(element) {
        element.slideDown('show');
    },
    hide: function hide(element) {
        element.slideUp('show');
    }
});

exports.Widget = Widget;
exports.extendWidget = extendWidget;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tempStorage = exports.localStorage = exports.sessionStorage = undefined;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function Storage(storage) {
    this.storage = storage;
};
Storage.prototype = {
    constructor: Storage,
    setItem: function setItem(name, data) {
        var valuetype = Object.prototype.toString.call(data);
        if (_lodash2.default.isObject(data) && !_lodash2.default.isFunction(data)) {
            data = JSON.stringify(data);
        }
        this.storage.setItem("_" + name + "_type", valuetype);
        this.storage.setItem(name, data);
    },
    getItem: function getItem(name) {
        var value, valuetype;
        if (this.has(name)) {
            value = this.storage.getItem(name);
            valuetype = this.storage.getItem("_" + name + "_type");
            if (valuetype == '[object Object]' || valuetype == '[object Array]') {
                value = JSON.parse(value);
            }
        }
        return value;
    },
    has: function has(name) {
        return this.storage.hasOwnProperty(name);
    },
    removeItem: function removeItem(name) {
        if (this.has(name)) {
            this.storage.removeItem(name);
            this.storage.removeItem("_" + name + "_type");
        }
    }
};
var sessionStorage = exports.sessionStorage = new Storage(window.sessionStorage);
var localStorage = exports.localStorage = new Storage(window.localStorage);
var tempStorage = exports.tempStorage = {
    setItem: function setItem(name, data) {
        exports.localStorage.setItem(name, data);
    },
    getItem: function getItem(name) {
        var result = exports.localStorage.getItem(name, data);
        exports.localStorage.removeItem(name);
        return result;
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTreeData = exports.DataSource = undefined;

var _core = __webpack_require__(0);

var _request = __webpack_require__(5);

var Source = _core.Observable.extend({
    options: {
        data: null, // 本地数据
        transport: null, // 远程ajax 参数
        autoBind: false, // 是否自动请求
        server: true, // 是否启用服务器请求
        cache: false, // 缓存
        parseData: null // 数据转换
    },
    events: ['onBeforeSend', 'onSuccess', 'onFail', 'onComplete', 'onRead', 'onQuery', 'onRefresh'],
    constructor: function constructor(options) {
        _core.Observable.call(this);
        _core._.bindAll(this, '_dataHandler', '_fail');
        this.data = null;
        this.orgData = null;
        this.errorMessages = [];
        options = this.options = extend({}, this.options, options);
        this.on(_core._.pick(options, this.events));
        this.initialize.call(this, options);
        if (options.autoBind) {
            this.read();
        }
    },
    initialize: function initialize() {},
    beforeSend: function beforeSend(callback) {
        this.on('onBeforeSend', callback);
        return this;
    },
    complete: function complete(callback) {
        this.on('onComplete', callback);
        return this;
    },
    then: function then(success, fail) {
        if (this.data != null) {
            success.call(this, this.data, this.orgData);
            return this;
        }
        this.on('onSuccess', success);
        if (isFunction(fail)) {
            if (this.errorMessages.length > 0) {
                fail.call(this, this.errorMessages);
                return;
            }
            this.on('onFail', fail);
        }
        return this;
    },
    _dataHandler: function _dataHandler(data) {
        this.data = isFunction(this.options.parseData) ? this.options.parseData.call(this, data) : data;
        this.orgData = data;
        this._callSuccess();
    },
    _callSuccess: function _callSuccess() {
        this.trigger('onSuccess', this.data, this.orgData);
        this.trigger('onComplete');
    },
    _fail: function _fail(e, statusText, error, isSuccess) {
        this.errorMessages = _core._.slice(arguments);
        this.trigger('onFail', this.errorMessages);
        this.trigger('onComplete');
    },
    query: function query(data) {
        data = data || {};
        this.trigger('onQuery', data);
        this.fetch(data);
    },
    read: function read(data) {
        data = data || {};
        this.trigger('onRead', data);
        this.fetch(data);
    },
    refresh: function refresh(data) {
        data = data || {};
        this.trigger('onRefresh', data);
        this.fetch(data);
    },
    fetch: function fetch(data) {
        this.trigger('onBeforeSend', data);
        if (this.options.cache && this.data != null) {
            this._callSuccess();
            return;
        }
        this.data = null;
        this.orgData = null;
        this.errorMessages = [];
        this._fetch(data);
    },
    _fetch: function _fetch() {},
    getData: function getData() {
        return this.data;
    },
    getItemData: function getItemData(index) {
        return this.data[index];
    },
    findItemIndex: function findItemIndex(predicate) {
        return _core._.findIndex(this.data, predicate);
    },
    findItem: function findItem(predicate) {
        return _core._.find(this.data, predicate);
    },
    filter: function filter(predicate) {
        return _core._.filter(this.data, predicate);
    }
});
var remoteSource = Source.extend({
    requestOptions: {
        inShowLoading: false
    },
    initialize: function initialize(options) {
        this.orgData = null;
        this.requestOptions = extend({}, this.requestOptions, options.transport);
        this.requestData = this.requestOptions.data;
        if (isFunction(this.requestData)) {
            this.getRequestData = this.requestData;
        } else {
            this.getRequestData = function () {
                return this.requestData;
            };
        }
    },
    query: function query(data) {
        data = data || {};
        this.trigger('onQuery', data);
        var oldData = this.getRequestData() || {},
            refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    read: function read(data) {
        data = data || {};
        this.trigger('onRead', data);
        var oldData = this.getRequestData() || {},
            refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    _fetch: function _fetch(data) {
        var requestOptions = this.requestOptions;
        requestOptions.data = data;
        (0, _request.request)(requestOptions).then(this._dataHandler, this._fail);
    }
});
var localSource = Source.extend({
    _fetch: function _fetch(data) {
        var that = this;
        if (isFunction(this.options.data)) {
            var deferred = _core.$.Deferred();
            deferred.then(that._dataHandler, that._fail);
            this.options.data.call(this, data, deferred.resolve, deferred.reject);
        } else {
            that._dataHandler(this.options.data);
        }
    }
});
function createDataSource(options) {
    options = extend({ server: true }, options);
    if (options.server && options.transport) {
        return new remoteSource(options);
    } else {
        return new localSource(options);
    }
}
function DataSource(options) {
    if (options instanceof Source) {
        return options;
    }
    var source = createDataSource(options);
    _core._.each(_core._.keysIn(source), function (key) {
        Object.defineProperty(source, key, {
            value: source[key],
            writable: true,
            configurable: false,
            enumerable: false
        });
    });
    return source;
}

function createTreeData(data, idField, parentField, childField) {
    childField = childField || "children";
    var len = data.length;
    if (len <= 1) {
        return data;
    }

    var cloneData = data.slice(),
        firstData = cloneData[0],
        rootData = getRoot(firstData),
        rootDatas = _core._.filter(cloneData, function (item) {
        return item[idField] == rootData[idField];
    });
    if (rootDatas.length == 0) {
        rootDatas.push(rootData);
    }
    function getRoot(item) {
        var current = _core._.find(cloneData, function (fitem) {
            return fitem[idField] == item[parentField];
        });
        if (!current) {
            return item;
        }
        return getRoot(current);
    }

    function findChildren(id) {
        var result = [];
        for (var i = cloneData.length - 1; i >= 0; i--) {
            if (cloneData[i][parentField] == id) {
                result.push(cloneData[i]);
                cloneData.splice(i, 1);
            }
        }
        return result;
    }
    function buildNode(nodes) {
        var node;
        for (var i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            node[childField] = findChildren(node[idField]);
            buildNode(node[childField]);
        }
        return nodes;
    }
    cloneData.reverse();
    return buildNode(rootDatas);
}

exports.DataSource = DataSource;
exports.createTreeData = createTreeData;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paths = exports.strings = exports.dom = undefined;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
        *  获取一年所有月份的天数
        * @param {date} year
        * @returns {array} 
        */
function getYearMonthDays(year) {
    return [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
/**
 *  获取月份天数
 * @param {date} date
 * @returns {number} 
 */
function getMonthLastDay(date) {
    var days = getYearMonthDays(date.getFullYear());
    return days[date.getMonth()];
}
/**
 * 是否小于当前年份
 * @param {type} date
 * @returns {date} 
 */
function isLtNowYear(date) {
    var nowYear = new Date(),
        year = nowYear.getFullYear();
    return date.getFullYear() < year;
}
/**
 * 当前日期时间
 * @returns {date} 
 */
function nowDate() {
    return new Date();
}
/**
 * 获取从年初截止当前第几天
 * @param {type} d
 * @returns {type} 
 */
function getTotalDay(d) {
    var d = nowDate(),
        m = d.getMonth(),
        t = d.getDate();
    return _lodash2.default.sum(getYearMonthDays().slice(0, m).concat(t));
}
/**
 * 获取年份总天数
 * @param {number} year
 * @returns {date} 
 */
function getYearTotalDay(year) {
    return leapYear(year) ? 366 : 365;
}
function leapYear(year) {
    year = year || new Date().getFullYear();
    return year % 100 != 0 && year % 4 == 0 || year % 400 == 0;
}
function getDateRange(begin, end, strformat) {
    var dates = [],
        i = 0,
        t = differDay(begin, end);
    for (; i <= t; i++) {
        dates.push(format(dateAdd(begin, i), strformat));
    }
    return dates;
}
function compare(date, target) {
    return compareWhole(format(date), format(target));
}
function compareWhole(date, target) {
    var c = getTime(date),
        t = getTime(target);
    return c > t ? 1 : c < t ? -1 : 0;
}
function getTime(date) {
    return parse(date).getTime();
}
function differDay(begin, end) {
    begin = parse(format(begin));
    end = parse(format(end));
    var bTime = begin.getTime(),
        eTime = end.getTime(),
        t = Math.abs(eTime - bTime) / (24 * 3600 * 1000);
    return t;
}
function differMonth(begin, end) {
    begin = parse(format(begin));
    end = parse(format(end));
    var m = end.getMonth() + 1,
        m2 = begin.getMonth() + 1,
        y = end.getFullYear(),
        y2 = begin.getFullYear(),
        y3 = y - y2;
    return Math.abs(y3 * 12 + (m - m2));
}
function gtDifferMonth(month, begin, end) {
    begin = parse(format(begin));
    end = parse(format(end));
    begin.setMonth(begin.getMonth() + month);
    return begin.getTime() < end.getTime();
}
function getMonthStartAndEndDate(value) {
    var start = parse(value);
    var end = parse(value);
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    return [start, end];
}
function getPrevMonthStartAndEndDate(value) {
    value = value || nowDate();
    return getMonthStartAndEndDate(dateAdd(value, -1, 'M'));
}
function addWeek(date, value) {
    return dateAdd(date, value * 7);
}
function dateAdd(date, value, type) {
    type = type || 'd';
    var cloneDate = parse(date);
    if (type == 'd') {
        cloneDate.setDate(cloneDate.getDate() + value);
    } else if (type == 'M') {
        var orgDate = cloneDate.getDate();
        cloneDate.setMonth(cloneDate.getMonth() + value);
        if (orgDate != cloneDate.getDate()) {
            cloneDate.setDate(0);
        }
    } else if (type == 'y') {
        cloneDate.setFullYear(cloneDate.getFullYear() + value);
    } else if (type == 'h') {
        cloneDate.setHours(cloneDate.getHours() + value);
    } else if (type == 'm') {
        cloneDate.setMinutes(cloneDate.getMinutes() + value);
    } else if (type == 's') {
        cloneDate.setSeconds(cloneDate.getSeconds() + value);
    }
    return cloneDate;
}
function parse(date) {
    try {
        var result, str, len;
        if (_lodash2.default.isDate(date)) {
            result = new Date(date.getTime());
        } else {
            str = date.split(/[^\d]/g);
            len = str.length;
            switch (len) {
                case 1:
                    result = new Date(parseInt(str[0]));
                    break;
                case 2:
                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1);
                    break;
                case 3:
                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]));
                    break;
                case 4:
                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]));
                    break;
                case 5:
                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]));
                    break;
                case 6:
                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]), parseInt(str[5]));
                    break;
            }
        }
        if (!result) {
            throw 'parse date error';
        }
        return result;
    } catch (e) {
        throw 'parse date error';
    }
}
function format(date, format) {
    var dates, result;
    if (!_lodash2.default.isDate(date)) {
        date = parse(date);
    }
    dates = {
        'y': String(date.getFullYear()),
        'M': date.getMonth() + 1,
        'd': date.getDate(),
        'h': date.getHours(),
        'm': date.getMinutes(),
        's': date.getSeconds()
    };
    format = format || "yyyy-MM-dd";
    result = format.replace(/y{1,4}/g, function (str) {
        return dates.y.substr(-str.length);
    }).replace(/M{1,2}/g, function (str) {
        return str.length < 2 ? dates.M : _lodash2.default.padStart(dates.M, 2, '0');
    }).replace(/d{1,2}/g, function (str) {
        return str.length < 2 ? dates.d : _lodash2.default.padStart(dates.d, 2, '0');
    }).replace(/h{1,2}/ig, function (str) {
        return str.length < 2 ? dates.h : _lodash2.default.padStart(dates.h, 2, '0');
    }).replace(/m{1,2}/g, function (str) {
        return str.length < 2 ? dates.m : _lodash2.default.padStart(dates.m, 2, '0');
    }).replace(/s{1,2}/g, function (str) {
        return str.length < 2 ? dates.s : _lodash2.default.padStart(dates.s, 2, '0');
    });

    return result;
}
var WEEKSTRS = ['日', '一', '二', '三', '四', '五', '六'];
function getWeek(date) {
    date = parse(date);
    return date.getDay();
}
function getWeekChinese(date) {
    return WEEKSTRS[getWeek(date)];
}
function formatWeek(date, dformat) {
    var week = getWeekChinese(date);
    var strDate = format(date, dformat);
    return strDate + '(' + week + ')';
}
function startOfWeek(dirtyDate) {
    var weekStartsAt = 1;
    var date = new Date(dirtyDate.getTime());
    var day = date.getDay();
    var diff = (day < weekStartsAt ? 7 : 0) + day - weekStartsAt;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
};
// 获取当前周
function getDateWeek(date) {
    date = new Date(date.getTime());
    date.setHours(0, 0, 0, 0);
    var end;
    var year = date.getFullYear();
    var time = date.getTime();
    var next = startOfWeek(new Date(year + 1, 0, 4));
    var current = startOfWeek(new Date(year, 0, 4));
    if (time >= next.getTime()) {
        year += 1;
    } else if (time < current.getTime()) {
        year -= 1;
    }
    end = startOfWeek(new Date(year, 0, 4));
    return Math.floor((time - end.getTime()) / (3600000 * 24 * 7)) + 1;
}
function getMonthFirstWeek(date) {
    var current = parse(date);
    current.setDate(1);
    return getWeek(current);
}
exports.default = {
    getMonthFirstWeek: getMonthFirstWeek, // 获取月份第一天是周几
    getDateWeek: getDateWeek, // 获取当前第几周
    getMonthLastDay: getMonthLastDay, // 获取月份最后一天
    getYearMonthDays: getYearMonthDays, // 根据年份获取所有月份天数
    isLtNowYear: isLtNowYear, // 是否小于当前年份
    nowDate: nowDate, // 获取当前日期
    getTotalDay: getTotalDay, // 获取截止当前天数 
    getYearTotalDay: getYearTotalDay, //  啊其他的取年份总天数
    leapYear: leapYear, // 是否闰年
    getDateRange: getDateRange, // 返回一个日期范围的数组
    compare: compare, // 日期比较
    compareWhole: compareWhole, // 时间比较 
    getTime: getTime, // 获取时间戳
    differDay: differDay, // 获取时期范围的相差天数
    differMonth: differMonth, // 获取时期范围的相差月数
    gtDifferMonth: gtDifferMonth, //根据月份差判断日期是否大于目标日期
    getMonthStartAndEndDate: getMonthStartAndEndDate,
    getPrevMonthStartAndEndDate: getPrevMonthStartAndEndDate,
    addWeek: addWeek, // 设置星期
    dateAdd: dateAdd, // 设置日期(date,value,dateType)  dateType {string} d,M,y  @列子,加一天 mjb.dates.dateAdd(new Date(),+1,'d')
    parse: parse, // 日期字符串转换date 对象
    format: format, // 日期对象字符串格式化
    getWeekChinese: getWeekChinese, // 星期阿拉伯数字转换为中文
    getWeek: getWeek, // 根据日获取对应周几
    formatWeek: formatWeek
};


function loadImage(src) {
    var img = new Image(),
        imgDeferred = $.Deferred();
    img.onload = imgDeferred.resolve;
    img.onerror = img.onabort = imgDeferred.reject;
    img.src = src;
    return imgDeferred;
}

var dom = exports.dom = { loadImage: loadImage };
var strings = exports.strings = {
    format: function format(str) {
        var arr_params = _lodash2.default.slice(arguments, 1);
        return str.replace(/\{(\d+)\}/g, function (s, i) {
            return arr_params[i];
        });
    }
};
var paths = exports.paths = {
    join: function join() {
        var paths = _lodash2.default.slice(arguments, 0).map(function (d, index) {
            if (index == 0) {
                return d.replace(/[\\/]$/, '');
            }
            return d.replace(/[\\/]/g, '');
        });
        return paths.join('/');
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.components = undefined;

var _dataSource = require('./data-source');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {};
_vue2.default.directive('authorize', function () {
    var permissions = window.GLOBALREQUIRECONFIGS.permissions || [];
    function _update(el, name) {
        var item = mjb._.find(permissions, { Keys: name });
        if (item && item.vals == 1) {
            el.style.display = el.__orgDisplay;
        } else if (item && item.vals == 0) {
            el.style.display = "none";
        }
    }
    return {
        bind: function bind(el, binding, vnode, oldVnode) {
            el.__orgDisplay = el.style.display === 'none' ? '' : el.style.display;
            _update(el, binding.value);
        },
        update: function update(el, binding, vnode, oldVnode) {
            _update(el, binding.value);
        }
    };
}());
function flatDeepArgs(args) {
    return _lodash2.default.flattenDeep(_lodash2.default.toArray(args));
}
components.base = {
    methods: {
        _cloeProps: function _cloeProps(options) {
            return _lodash2.default.extend({}, this.$props, options);
        },
        _cloneListeners: function _cloneListeners() {
            if (!this._cacheCloneListeners) {
                var that = this,
                    keys = _lodash2.default.uniq(_lodash2.default.keys(that.$listeners).concat(flatDeepArgs(arguments))),
                    ons = {};
                _lodash2.default.each(keys, function (name) {
                    ons[name] = _lodash2.default.bind(function () {
                        this.$emit.apply(this, arguments);
                    }, that, name);
                });
                _cacheCloneListeners = ons;
            }
            return _cacheCloneListeners;
        },
        _extendListeners: function _extendListeners() {
            var that = this,
                keys = flatDeepArgs(arguments),
                ons = {};
            _lodash2.default.each(keys, function (name) {
                ons[name] = _lodash2.default.bind(function () {
                    that.$emit.apply(that, arguments);
                }, that, name);
            });
            return ons;
        }
    }
};
components.data = {
    extends: components.base,
    data: function data() {},
    props: {
        autoBind: {
            type: Boolean,
            default: false
        },
        dataSource: {}
    },
    methods: {
        onBeforeLoad: function onBeforeLoad(d) {},
        onCompleteLoad: function onCompleteLoad() {},
        onSuccess: function onSuccess(d, od) {},
        onFail: function onFail(e, s) {},
        initDataSource: function initDataSource() {
            var dataSource = this.dataSource;
            if (dataSource) {
                dataSource = (0, _dataSource.DataSource)(dataSource);
                this._dataSource = dataSource;
                this.$delete(this.$props, 'dataSource');
                dataSource.off();
                dataSource.then(_lodash2.default.bind(this.onSuccess, this), _lodash2.default.bind(this.onFail, this)).beforeSend(_lodash2.default.bind(this.onBeforeLoad, this)).complete(_lodash2.default.bind(this.onCompleteLoad, this));
            }
        }
    },
    created: function created() {
        if (_lodash2.default.isFunction(this.initCreated) && this.initCreated() === true) {
            return;
        }
        this.initDataSource();
    },
    mounted: function mounted() {
        this.$nextTick(function () {
            if (this.autoBind && this._dataSource) {
                this._dataSource.read();
            }
        });
    }
};
function _broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.componentName;
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

components.emitter = {
    methods: {
        dispatch: function dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast: function broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
};
components.registerComponent = function (name, component) {
    _vue2.default.component('mjb-' + name, component);
    return component;
};
exports.components = components;

/***/ })
/******/ ]);
});