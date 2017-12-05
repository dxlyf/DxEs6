(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("jquery"), require("lodash"), require("ELEMENT"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "jquery", "lodash", "ELEMENT"], factory);
	else if(typeof exports === 'object')
		exports["Dx"] = factory(require("vue"), require("jquery"), require("lodash"), require("ELEMENT"));
	else
		root["Dx"] = factory(root["Vue"], root["$"], root["_"], root["ELEMENT"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

var _elementUi = __webpack_require__(5);

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

var _view = __webpack_require__(6);

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

var _widget = __webpack_require__(7);

Object.keys(_widget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _widget[key];
    }
  });
});

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
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
        if (that.el && that.el != 'body' && !that.Model._isMounted) {
            that.Model.$mount(that.$el[0]);
        }
    },
    //视图初始化函数,会自动执行
    initialize: function initialize() {},
    _initModel: function _initModel() {
        var that = this;
        if (isFunction(that.Model)) {
            that.Model = that.Model.apply(that, arguments);
        }
        if (that.Model && !(that.Model instanceof Vue)) {
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
/* 7 */
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

/***/ })
/******/ ]);
});