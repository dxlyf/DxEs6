/**
 * 数据操作
 * @module data
 * @see DataSource
 */
import {Observable} from './core';
import $,{extend,isFunction} from 'jquery';
import _ from 'lodash';
import {request} from './request';


var Source = Observable.extend(
    /** @lends DataSource.prototype*/
    {
    options: {
        data: null, // 本地数据
        transport: null, // 远程ajax 参数
        autoBind: false, // 是否自动请求
        server: true, // 是否启用服务器请求
        cache: false,// 缓存
        parseData: null// 数据转换
    },
    events: ['onBeforeSend', 'onSuccess', 'onFail', 'onComplete', 'onRead', 'onQuery', 'onRefresh'],
    /** 
     * @extends Observable
     * @constructs DataSource
     * @param {object} options 数据源参数选项
     * @param {(object|array|function)} options.data 数据
     * @param {object} options.transport  远程数据请求参数
     */
    constructor (options) {
        Observable.call(this);
        _.bindAll(this, '_dataHandler', '_fail');
        this.data = null;
        this.orgData = null;
        this.errorMessages = [];
        options = this.options = extend({}, this.options, options);
        this.on(_.pick(options, this.events));
        this.initialize.call(this, options);
        if (options.autoBind) {
            this.read();
        }

    },
    initialize () { },
    beforeSend (callback) {
        this.on('onBeforeSend', callback);
        return this;
    },
    complete (callback) {
        this.on('onComplete', callback);
        return this;
    },
    /**
     * 绑定成功或失败回调
     * @param {function} success 成功回调
     * @param {function} fail 失败回调
    */
    then (success, fail) {
        if (this.data != null) {
            success.call(this, this.data, this.orgData);
        }
        this.on('onSuccess', success);
        if (isFunction(fail)) {
            if (this.errorMessages.length > 0) {
                fail.call(this, this.errorMessages);
            }
            this.on('onFail', fail);
        }
        return this;
    },
    _dataHandler (data) {
        this.data = isFunction(this.options.parseData) ? this.options.parseData.call(this, data) : data;
        this.orgData = data;
        this._callSuccess();
    },
    _callSuccess () {
        this.trigger('onSuccess', this.data, this.orgData);
        this.trigger('onComplete');
    },
    _fail (e, statusText, error, isSuccess) {
        this.errorMessages = _.slice(arguments);
        this.trigger('onFail', this.errorMessages);
        this.trigger('onComplete');
    },
    /**
     * 查询数据
     * @param {object} [data] 请求参数
    */
    query (data) {
        data = data || {};
        this.trigger('onQuery', data);
        this.fetch(data);
    },
    /**
     * 请求数据
     * @param {object} [data] 请求参数
     */
    read (data) {
        data = data || {};
        this.trigger('onRead', data);
        this.fetch(data);
    },
     /**
     * 刷新数据
     * @param {object} [data] 请求参数
     */
    refresh (data) {
        data = data || {};
        this.trigger('onRefresh', data);
        this.fetch(data);
    },
    fetch (data) {
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
    _fetch () { },
     /**
     * 获取数据
     * @returns {any}
     */
    getData () {
        return this.data;
    },
    /**
     * 根据索引获取数据
     * @returns {any}
     */
    getItemData (index) {
        return this.data[index];
    },
    /**
     * 获取数据所在索引
     * @param {(function|object|array|string)} predicate  这个函数会在每一次迭代调用
     * @returns {number} 返回找到元素的 索引值（index），否则返回 -1。
     */
    findItemIndex (predicate) {
        return _.findIndex(this.data, predicate);
    },
     /**
     * 查找数据，返回
     * @param {(function|object|array|string)} predicate  这个函数会在每一次迭代调用。
     * @returns {number} 返回匹配元素
     */
    findItem (predicate) {
        return _.find(this.data, predicate);
    },
        /**
     * 获取数据所在索引
     * @param {(function|object|array|string)} predicate  这个函数会在每一次迭代调用
     * @returns {number} 返回数组
     */
    filter (predicate) {
        return _.filter(this.data, predicate);
    },
    /** 
     * 终止请求
    */
    abort(){}
});
var remoteSource = Source.extend({
    requestOptions: {
        inShowLoading: false,
        isCustomerError:true
    },
    initialize (options) {
        this.orgData = null;
        this._xhr=null;
        this.requestOptions = extend({}, this.requestOptions, options.transport);
        this.requestData = this.requestOptions.data;
        if (isFunction(this.requestData)) {
            this.getRequestData = this.requestData;
        } else {
            this.getRequestData = function () {
                return this.requestData;
            }
        }
    },
    query (data) {
        data = data || {};
        this.trigger('onQuery', data);
        var oldData = this.getRequestData() || {}, refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    read (data) {
        data = data || {};
        this.trigger('onRead', data);
        var oldData = this.getRequestData() || {}, refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    _fetch (data) {
        var requestOptions = this.requestOptions;
        requestOptions.data = data;
        this._xhr=request(requestOptions);
        this._xhr.then(this._dataHandler, this._fail);
    },
    abort()
    {
        if(this._xhr&&this._xhr.abort)
        {
            this._xhr.abort();
        }
    }
});
var localSource = Source.extend({
    _fetch (data) {
        var that = this;
        if (isFunction(this.options.data)) {
            var deferred = $.Deferred();
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
    _.each(_.keysIn(source), function (key) {
        Object.defineProperty(source, key, {
            value: source[key],
            writable: true,
            configurable: false,
            enumerable: false
        });
    })
    return source;
}
/**
 * 垂直数组转换树形数据
 * @static
 * @param {array<object>} data 数据
 * @param {string} idField 主键唯一字段名
 * @param {string} parentField 关联字段名
 * @param {string} childField 子集字段名，生成后的
 * @returns {array<object>} 
 */
function createTreeData(data, idField, parentField, childField) {
    childField = childField || "children";
    var len = data.length;
    if (len <= 1) {
        return data;
    }

    var cloneData = data.slice(), firstData = cloneData[0], rootData = getRoot(firstData), rootDatas = _.filter(cloneData, function (item) {
        return item[idField] == rootData[idField];
    });
    if (rootDatas.length == 0) {
        rootDatas.push(rootData);
    }
    function getRoot(item) {
        var current = _.find(cloneData, function (fitem) {
            return fitem[idField] == item[parentField]
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

export {DataSource,createTreeData}
