import {Observable,_,$} from './core'
import {request} from './request'
var Source = Observable.extend({
    options: {
        data: null, // 本地数据
        transport: null, // 远程ajax 参数
        autoBind: false, // 是否自动请求
        server: true, // 是否启用服务器请求
        cache: false,// 缓存
        parseData: null// 数据转换
    },
    events: ['onBeforeSend', 'onSuccess', 'onFail', 'onComplete', 'onRead', 'onQuery', 'onRefresh'],
    constructor: function (options) {
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
    initialize: function () { },
    beforeSend: function (callback) {
        this.on('onBeforeSend', callback);
        return this;
    },
    complete: function (callback) {
        this.on('onComplete', callback);
        return this;
    },
    then: function (success, fail) {
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
    _dataHandler: function (data) {
        this.data = isFunction(this.options.parseData) ? this.options.parseData.call(this, data) : data;
        this.orgData = data;
        this._callSuccess();
    },
    _callSuccess: function () {
        this.trigger('onSuccess', this.data, this.orgData);
        this.trigger('onComplete');
    },
    _fail: function (e, statusText, error, isSuccess) {
        this.errorMessages = _.slice(arguments);
        this.trigger('onFail', this.errorMessages);
        this.trigger('onComplete');
    },
    query: function (data) {
        data = data || {};
        this.trigger('onQuery', data);
        this.fetch(data);
    },
    read: function (data) {
        data = data || {};
        this.trigger('onRead', data);
        this.fetch(data);
    },
    refresh: function (data) {
        data = data || {};
        this.trigger('onRefresh', data);
        this.fetch(data);
    },
    fetch: function (data) {
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
    _fetch: function () { },
    getData: function () {
        return this.data;
    },
    getItemData: function (index) {
        return this.data[index];
    },
    findItemIndex: function (predicate) {
        return _.findIndex(this.data, predicate);
    },
    findItem: function (predicate) {
        return _.find(this.data, predicate);
    },
    filter: function (predicate) {
        return _.filter(this.data, predicate);
    }
});
var remoteSource = Source.extend({
    requestOptions: {
        inShowLoading: false
    },
    initialize: function (options) {
        this.orgData = null;
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
    query: function (data) {
        data = data || {};
        this.trigger('onQuery', data);
        var oldData = this.getRequestData() || {}, refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    read: function (data) {
        data = data || {};
        this.trigger('onRead', data);
        var oldData = this.getRequestData() || {}, refData = extend({}, oldData, data);
        this.fetch(refData);
    },
    _fetch: function (data) {
        var requestOptions = this.requestOptions;
        requestOptions.data = data;
        request(requestOptions).then(this._dataHandler, this._fail);
    }
});
var localSource = Source.extend({
    _fetch: function (data) {
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
