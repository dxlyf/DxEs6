/**
 * 组件库和组件扩展
 * @module widget
 */
import {Observable,hasInstanceof,requestAnimationFrame} from './core'
import _ from 'lodash'
import $,{extend,isPlainObject} from 'jquery'
var  widgets = {};
var noop = $.noop,
   support = (function () {
       var el = document.createElement('div'), name;
       var Names = {
           WebkitTransition: ['webkitTransitionEnd', 'webkitAnimationEnd', 'webkitTransition'],
           transition: ['transitionend', 'animationend', 'transition']
       }
       for (name in Names) {
           if (el.style[name] !== undefined) {
               return { transitionEnd: Names[name][0], animationEnd: Names[name][1], transition: Names[name][2] }
           }
       }
       return false
   })();
if (support) {
    $.event.special.bsTransitionEnd = {
        bindType: support.transitionEnd,
        delegateType: support.transitionEnd,
        handle: function (e) {
            if ($(e.target).is(this)) {
                return e.handleObj.handler.apply(this, arguments);
            }
        }
    }
    $.event.special.bsAnimationEnd = {
        bindType: support.animationEnd,
        delegateType: support.animationEnd,
        handle: function (e) {
            if ($(e.target).is(this)) {
                return e.handleObj.handler.apply(this, arguments);
            }
        }
    }
    $.fn.extend({
        animateCss: function (animationName, callback, duration) {
            this.addClass('mjb-animated ' + animationName).one('bsAnimationEnd', function (e) {
                $(this).removeClass('mjb-animated ' + animationName);
                callback && callback.call(this, e);
            });
            if (duration) {
                this.emulateAnimationEnd(duration);
            }
            return this;
        }
    });
}

$.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger(support.transitionEnd) }
    setTimeout(callback, duration)
    return this
}
$.fn.emulateAnimationEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsAnimationEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger(support.animationEnd) }
    setTimeout(callback, duration)
    return this
}

var Widget = Observable.extend(
    /** @lends Widget.prototype */
    {
    /**
     * 页面组件基类
     * @extends Observable
     * @constructs
     * @param {(string|element)} element 元素
     * @param {object} options 组件参数
     */
    constructor: function (element, options) {
        if (!hasInstanceof(this, this.constructor)) {
            return new this.constructor(element, options);
        }
        Observable.call(this);
        this.widgetid = _.uniqueId('widget');
        this.initialize.apply(this, arguments);
    },
    /**
     * 可监听事件数组
     * @type {array}
    */
    events: [],
    initialize: function (element, options) {
        if (element) {
            this.element = $(element);
        }
        this.setOptions(options);
        this.setEvents(this.options);
        return this.options;
    },
    /**
     * 设置options属性值，会在原来的options 上扩展
     * @param {object} options 参数
     */
    setOptions: function (options) {
        this.options = extend({}, this.options, options)
    },
    apply: function () {
        var args = _.toArray(arguments), method = args.shift();
        this.constructor.__super__.prototype[method].apply(this, args);
    },
    /**
     * dom重绘
     * @param {element} element
     */
    reflow: function (element) {
        element.offsetHeight;
    },
    /**
     * 绑定具有当前组件ID命名空间事件
     * @param {jqueryElement} element
     * @param {string} name 事件名
     * @param {string} selector 事件触发目标过滤选择符
     * @param {function} handler 事件执行函数
     */
    delegateEvents: function (element, name, selector, handler) {
        var that = this;
        if (typeof selector == "function") {
            handler = selector;
            selector = null;
        }
        name = name.split(' ');
        name = _.map(name, function (n) {
            if (n.indexOf('.') == -1) {
                return n + "." + that.widgetid;
            }
            return n;
        });
        element.on(name.join(' '), selector, handler);
    },
    /**
     * 移除事件
     * @param {jqueryElement} element
     * @param {string} name 事件名
     * @param {function} [handler] 事件执行函数
     */
    undelegateEvents: function (element, name, handler) {
        name = !name ? "." + this.widgetid : name;
        if (name.indexOf('.') == -1) {
            name += "." + this.widgetid;
        }
        element.off(name, handler);
    },
    _commandHandler: function (attrName, callback) {
        var that = this;
        return callback ? function (e) {
            var command = e.currentTarget.getAttribute(attrName);
            callback.call(that, command, e);
        } : function (e) {
            var command = e.currentTarget.getAttribute(attrName), name = '_on' + _.upperFirst(command);
            that[name] && that[name](e);
        }
    },
    /**
     * 添加监听事件
     * @param {object} options
     */
    setEvents: function (options) {
        this.on(_.pick(options, this.events));
    },
    destroy: function () { }
});
/**
 * 扩展组件
 * @extends Widget
 * @param {string} name 组件名
 * @param {object} proto 属性方法
 * @param {string} parent 父级组件名
 * @param {boolean} [noRegister=false] 是否注册在jquery上
 * @returns {function}
 */
function extendWidget(name, proto, parent, noRegister=false) {
    if (widgets[name]) {
        throw "already exist";
    }
    if(typeof parent=="boolean")
    {
        noRegister=parent;
        parent=null;
    }
    var prentWidget = _.isString(parent)&&parent!=null ? widgets[parent] || Widget : Widget;
    proto = typeof proto == "function" ? proto(prentWidget) : proto;
    let widget=prentWidget.extend(proto);
    widget.prototype.widgetType = name;
    widgets[name] = widget;
    if (!noRegister) {
        registerPlugin(name, widget);
    }
    return widget;
}
function registerPlugin(name, Plugin) {
    var prexName = name;
    $.fn[prexName] = function (name,options) {
        if(isPlainObject(name))
        {
            options=name;
            name="";
        }
        if(typeof name=="string"&&name!="")
        {
            this.each(function(){
                let element=$(this);
                let widget = element.data(prexName);
                if (widget&&widget[name]) {
                    widget[name](options);
                }
            });
        }else{
            this.each(function(){
                let element=$(this);
                let widget = element.data(prexName);
                if (!widget) {
                    element.data(prexName, new Plugin(element, options));
                }
            });
         }
    }
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
    initialize: function (element, options) {
        this.apply('initialize', element, options);
        this.delegateEvents(this.element, 'click', _.bind(this.toggleContent, this));

        if (!this.options.show) {
            this.toggleContent();
        }
    },
    getContentElement: function (isShow) {
        if (this.target) {
            return this.options.target;
        }
        if (this.options.parent != '') {
            return this.element.closest(this.options.parent).children(this.options.selector);
        } else {
            return $(this.options.selector);
        }
    },
    toggleContent: function (e) {
        var element = this.element, isShow = false;
        if (element.hasClass(this.options.expand)) {
            element.removeClass(this.options.expand).addClass(this.options.collapse);
        } else {
            element.removeClass(this.options.collapse).addClass(this.options.expand);
            isShow = true;
        }
        this.toggle(this.getContentElement(isShow), isShow);
        this.trigger('onToggle', isShow);
    },
    toggle: function (element, isShow) {
        return isShow ? this.show(element) : this.hide(element) && this;
    },
    show: function (element) {
        element.slideDown('show');
    },
    hide: function (element) {
        element.slideUp('show');
    }
});

extendWidget('AnchorMenu', function () {
    var template = _.template(`<div class="float-anchors">
    <ul class="float-anchors-menu">
        <%if(menus.length>0){%>
        <%for(var i=0,len=menus.length;i<len;i++){%>
            <li>
               <span data-command=""  data-index="<%=i%>" class="<%=menus[i].className==""?menus[i].html?"":"fa fa-anchor":menus[i].className%>">
                   <%=menus[i].html||""%>
                </span>
                <span class="float-anchor-navs" ><%-menus[i].text%></span> 
            </li>
            <%}%>
            <%}%>
            <li>
                <span class="glyphicon glyphicon-chevron-up float-anchor-top" title="">
                </span>
                <span class="float-anchor-navs" >顶部</span> 
            </li>
    </ul>
</div>`);
    return {
        events:['onScroll'],
        options: {
            always:false,
            menus:[],
            offset:0
        },
        initialize: function (element, options) {
            this.apply('initialize', element, options);
            this.$anchors = $(template({ menus: this.options.menus })).hide().appendTo(document.body);
            this.delegateEvents(this.$anchors, 'click', 'span[data-command]',_.bind(this.onToTarget, this));
            this.delegateEvents(this.$anchors, 'click', '.float-anchor-top', _.bind(this.onToTop, this));
            this.$win = $(window);
            this.isScroll = false;
            this._data = null;
            this._oldData = null;
            if (!this.options.always) {
                this.delegateEvents(this.$win, 'scroll', _.bind(this.onScroll, this));
                this.doScroll();
            } else {
                this.$anchors.show();
            }
        },
        show:function()
        {
            this.$anchors.fadeIn();
        },
        hide:function()
        {
            this.$anchors.fadeOut();
        },
        scrollTo:function(top)
        {
            $('html,body').animate({
                scrollTop: top 
            }, 1000);
        },
        onToTop:function()
        {
            this.scrollTo(0);
        },
        onToTarget:function(e)
        {
            var item=this.options.menus[e.currentTarget.getAttribute('data-index')],offset=item.offset||0;
            this.scrollTo($(item.target).offset().top+offset);
        },
        calculScrollData:function()
        {
            var 
            offset = this.options.offset,
            sTop = this.$win.scrollTop(),
            element = this.element,
            top = element.offset().top,
            pTop = top - sTop;
            this._oldData = this._data;
            this._data= {
                offset: offset,
                top: top,
                sTop: sTop,
                pTop: pTop,
                isShow: offset >= pTop,
                direction: this._oldData?sTop>this._oldData.sTop?'down':'up':''
            };      
        },
        doScroll:function()
        {
            this.calculScrollData();
            var data = this._data;
            if (this._oldData && this._data.isShow == this._oldData.isShow) {
                return;
            }
            if (this._data.isShow)
            {       
               this.show();
            } else {
               this.hide();
            }
            this.trigger('onScroll',this._data);
        },
        onScroll:function(e)
        {
            if (this.isScroll)
            {
                return;
            }
            this.isScroll = true;
            var that = this;
            requestAnimationFrame(function () {
                that.doScroll(e);
                that.isScroll = false;
            });
        },
        destroy:function()
        {
            this.undelegateEvents();
        }
    };
});
export {Widget,extendWidget}