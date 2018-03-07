import {Observable,hasInstanceof} from './core'
import $,{extend,isFunction} from 'jquery'
import _ from 'lodash'
import Vue from 'vue'
var  delegateEventSplitter = /^(\S+)\s*(.*)$/;

export  var View= Observable.extend(
    /** @lends View.prototype */
    {
    el: null,
    $el: null,
    promise: null,
    events: null,
    Model: null,
    /**
     * 页面数据渲染视图
     * @extends Observable
     * @constructs 
     * @param {object} options 
     * @param {function} options.initialize 初始化执行函数
     * @param {string} options.el 页面元素ID
     * @param {object} [options.events=null] 事件声明对象
     * @param {object} [options.Model=null]  创建vue实例对象参数
     * @param {promise} [options.promise=null] 当不为null,初始化执行函数会等待它，等它返回成功后，才执行initialize函数
     */
    constructor (options) {
        if (!hasInstanceof(this, View)) return new View(options);
        Observable.call(this);
        var that = this, name;
        extend(that, options);
        _.difference(_.keysIn(that), ['constructor']).forEach(function (name) {
            if (isFunction(that[name])) {
                that[name] = _.bind(that[name], that);
            }
        });
        if (that.promise && that.promise.then) {
            that.promise.then(that.__initialize__);
        } else {
            _.defer(that.__initialize__);
        }
    },
    __initialize__ () {
        var that = this;
        that._initModel.apply(this, arguments);
        that._createElement();
        that.delegateEvents();
        that.initialize.apply(this, arguments);
    },
    //视图初始化函数,会自动执行
    initialize () {
    },
    _initModel () {
        var that = this;
        if (isFunction(that.Model)) {
            that.Model = that.Model.apply(that, arguments);
        }
        if (that.Model && !(that.Model instanceof Vue)) {
            if (that.el && that.el != 'body' && !_.has(that.Model, "el")) {
                that.Model.el = that.el;
            }
            that.Model = new Vue(that.Model);
        }
    },
    _createElement () {
        var that = this, element;
        if (that.el) {
            that.$el = $(that.el);
        } else {
            that.$el = $(that.template);
        }
    },
    delegateEvents (events) {
        if (!this.$el) {
            return;
        }
        if (!(events || (events = _.result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (isFunction(method)) method = _.bind(method, this);
            if (!_.isFunction(method)) method = this[events[key]];
            if (!method) {
                throw new Error('视图未找到定义的' + key + '方法');
            };
            var match = key.match(delegateEventSplitter);
            this.delegate(match[1], match[2], method, this);
        }
        return this;
    },
    /**
     * 上下文元素绑定事件
     * @param {string} eventName 事件名
     * @param {string} selector 用于事件触发目标过滤选择符
     * @param {function} listener 事件执行函数
     */
    delegate (eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
    },
    /** 
     * 清空所有绑定事件
    */
    undelegateEvents () {
        if (this.$el) this.$el.off('.delegateEvents' + this.cid);
        return this;
    },
        /**
     * 移除上下文元素绑定事件
     * @param {string} eventName 事件名
     * @param {string} [selector] 用于事件触发目标过滤选择符
     * @param {function} [listener] 事件执行函数
     */
    undelegate (eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
    }
});
