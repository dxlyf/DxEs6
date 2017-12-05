import Vue from 'vue'
import _ from 'lodash'
import $ from 'jquery'
import {DataSource} from './data-source'

var components = Object.create(null);
Vue.directive('authorize', (function () {
    var permissions = window.GLOBALREQUIRECONFIGS.permissions || [];
    function update(el, name) {
        var item = _.find(permissions, { Keys: name });
        if (item && item.vals == 1) {
            el.style.display = el.__orgDisplay;
        } else if (item && item.vals == 0) {
            el.style.display = "none";
        }
    }
    return {
        bind: function (el, binding, vnode, oldVnode) {
            el.__orgDisplay = el.style.display === 'none' ? '' : el.style.display
            update(el, binding.value);
        },
        update: function (el, binding, vnode, oldVnode) {
            update(el, binding.value);
        }
    }
}()));
function flatDeepArgs(args) {
    return _.flattenDeep(_.toArray(args))
}
components.base = {
    methods: {
        _cloeProps: function (options) {
            return _.extend({}, this.$props, options);
        },
        _cloneListeners: function () {
            if (!this._cacheCloneListeners) {
                var that = this, keys = _.uniq(_.keys(that.$listeners).concat(flatDeepArgs(arguments))), ons = {};
                _.each(keys, function (name) {
                    ons[name] = _.bind(function () {
                        this.$emit.apply(this, arguments);
                    }, that, name);
                });
                this._cacheCloneListeners = ons;
            }
            return this._cacheCloneListeners;
        },
        _extendListeners: function () {
            var that = this, keys = flatDeepArgs(arguments), ons = {};
            _.each(keys, function (name) {
                ons[name] = _.bind(function () {
                    that.$emit.apply(that, arguments);
                }, that, name);
            });
            return ons;
        }
    }
};
components.data = {
    extends: components.base,
    data: function () {

    },
    props: {
        autoBind: {
            type: Boolean,
            default: false
        },
        dataSource: {}
    },
    methods: {
        onBeforeLoad: function (d) {
        },
        onCompleteLoad: function () {
        },
        onSuccess: function (d, od) {
        },
        onFail: function (e, s) {
        },
        initDataSource: function () {
            var dataSource = this.dataSource;
            if (dataSource) {
                dataSource = DataSource(dataSource);
                this._dataSource = dataSource;
                this.$delete(this.$props, 'dataSource');
                dataSource.off();
                dataSource.then(_.bind(this.onSuccess, this), _.bind(this.onFail, this)).beforeSend(_.bind(this.onBeforeLoad, this)).complete(_.bind(this.onCompleteLoad, this));
            }
        }
    },
    created: function () {
        if (_.isFunction(this.initCreated) && this.initCreated() === true) {
            return;
        }
        this.initDataSource();
    },
    mounted: function () {
        this.$nextTick(function () {
            if (this.autoBind && this._dataSource) {
                this._dataSource.read();
            }
        });
    }
};
function broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.componentName;
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

components.emitter = {
    methods: {
        dispatch: function (componentName, eventName, params) {
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
        broadcast: function (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
components.registerComponent = function (name, component) {
    Vue.component('mjb-' + name, component);
    return component;
}
export  {components}