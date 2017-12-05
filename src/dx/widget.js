import {Observable,hasInstanceof,_,$} from './core'

var  widgets = {};
var noop = $.noop,
   support = (function () {
       var el = document.createElement('div'), name;
       var Names = {
           WebkitTransition: ['webkitTransitionEnd', 'webkitAnimationEnd', 'webkitTransition'],
           MozTransition: ['transitionend', 'animationend mozAnimationEnd', 'transition'],
           OTransition: ['oTransitionEnd otransitionend', 'oAnimationend', 'oTransition'],
           transition: ['transitionend', 'animationend MSAnimationEnd', 'transition']
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
    var called = false
    var $el = this
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

var Widget = Observable.extend({
    constructor: function (element, options) {
        if (!exports.hasInstanceof(this, this.constructor)) {
            return new this.constructor(element, options);
        }
        Observable.call(this);
        this.widgetid = _.uniqueId('widget');
        this.initialize.apply(this, arguments);
    },
    events: [],
    initialize: function (element, options) {
        if (element) {
            this.element = $(element);
        }
        this.setOptions(options);
        this.setEvents(this.options);
        return this.options;
    },
    setOptions: function (options) {
        this.options = extend({}, this.options, options)
    },
    apply: function () {
        var args = _.toArray(arguments), method = args.shift();
        this.constructor.__super__.prototype[method].apply(this, args);
    },
    reflow: function (element) {
        element.offsetHeight;
    },
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
    setEvents: function (options) {
        this.on(_.pick(options, this.events));
    },
    destroy: function () { }
});

function extendWidget(name, proto, parent, noRegister) {
    if (widgets[name]) {
        throw "already exist";
    }
    var prentWidget = _.isString(parent) ? widgets[parent] || Widget : Widget;
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
    $.fn[prexName] = function (options) {
        var widget, element, widgets = [];
        if (this.length) {
            for (var i = 0; i < this.length; i++) {
                element = $(this[i]);
                widget = element.data(prexName);
                if (!widget) {
                    widget = new Plugin(element, options);
                    element.data(prexName, widget);
                }
                widgets.push(widget);
            }
        }
        return widgets[0];
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

export {Widget,extendWidget}