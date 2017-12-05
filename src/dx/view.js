import {Observable,hasInstanceof,_,$} from './core'

var  delegateEventSplitter = /^(\S+)\s*(.*)$/;
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
export  var View= Observable.extend({
    el: null,
    $el: null,
    promise: null,
    events: null,
    Model: null,
    constructor: function (options) {
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
    __initialize__: function () {
        var that = this;
        that._initModel.apply(this, arguments);
        that._createElement();
        that.delegateEvents();
        that.initialize.apply(this, arguments);
    },
    //视图初始化函数,会自动执行
    initialize: function () {
    },
    _initModel: function () {
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
    _createElement: function () {
        var that = this, element;
        if (that.el) {
            that.$el = $(that.el);
        } else {
            that.$el = $(that.template);
        }
    },
    delegateEvents: function (events) {
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
    delegate: function (eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
    },
    undelegateEvents: function () {
        if (this.$el) this.$el.off('.delegateEvents' + this.cid);
        return this;
    },
    undelegate: function (eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
    }
});
