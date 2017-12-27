import Vue from 'vue'
import _ from 'lodash'
import $ from 'jquery'
import {DataSource} from './data-source'

var components = Object.create(null);
Vue.directive('authorize', (function () {
    var permissions = window.GLOBALREQUIRECONFIGS.permissions || [];
    function update(el, name) {
        name = _.isArray(name) ? name : [name];
        var item = _.find(permissions, function (item) {
            return _.indexOf(name, item.keys)!=-1 && item.vals == 1;
        });
        if (item) {
            el.style.display = el.__orgDisplay;
        } else {
            el.style.display = "none";
        }
    }
    return {
        bind (el, binding, vnode, oldVnode) {
            el.__orgDisplay = el.style.display === 'none' ? '' : el.style.display
            update(el, binding.value);
        },
        update (el, binding, vnode, oldVnode) {
            update(el, binding.value);
        }
    }
}()));

components.base = {
    methods: {
        _cloeProps: function (options) {
            return _.extend({}, this.$props, options);
        },
        _cloneListeners: function () {
            var  that = this;
            function callListener()
            {
                this.$emit.apply(this, arguments);
            }
            function praseListener(listeners)
            {
                var result={},value,isObj;
                for(var i=0,len=listeners.length;i<len;i++){
                    value=listeners[i];
                    isObj=_.isPlainObject(value);
                    if(!isObj&&!result.hasOwnProperty(value))
                    {
                        result[value]=_.bind(callListener, that, value);
                    }else if(isObj&&!result.hasOwnProperty(value.name)) {
                        result[value.name]=value.handler?value.handler:_.bind(callListener, that, value.alias||value.name);
                    }
                }
                return result;
            }
            function flatDeepArgs() {
                return _.flattenDeep(_.toArray(arguments))
            }           
            if (!that._cacheCloneListeners) {      
                that._cacheCloneListeners =  praseListener(flatDeepArgs(arguments,_.map(that.$listeners,(handler,name)=>({name,handler}))));
            }
            return that._cacheCloneListeners;
        }
    }
};
components.data = {
    extends: components.base,
    data () {

    },
    props: {
        autoBind: {
            type: Boolean,
            default: false
        },
        dataSource: {}
    },
    methods: {
        onBeforeLoad (d) {
        },
        onCompleteLoad () {
        },
        onSuccess (d, od) {
        },
        onFail (e, s) {
        },
        initDataSource () {
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
    created () {
        if (_.isFunction(this.initCreated) && this.initCreated() === true) {
            return;
        }
        this.initDataSource();
    },
    mounted () {
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
        dispatch (componentName, eventName, params) {
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
        broadcast (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
components.registerComponent = (name, component)=>{
    Vue.component('mjb-' + name, component);
    return component;
}
export  {components}