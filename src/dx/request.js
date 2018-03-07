/**
 * 网络请求
 * @module request
 */
import $ from 'jquery'
import _ from 'lodash'
//import configs from 'configs'
import {loading,hideLoading,alert} from './element'
/**
 * ajax响应 retStatus状态码
 * @readonly
 * @enum {number}
 */
var responseStatus = {
    /** 操作成功 */
    'success': "200", 
    /** 操作被禁止 */
    'operationForbidden': "403", 
    /** 验证失败 */
    'validateFailed': "400",
    /** 资源未找到 */
    'noFound': "404", 
    /** 服务器内部错误 */
    'ServerError': "500" 
},
 /**
  * 获取接口请求地址
  * @param {string} name 接口配置名称
  * @returns {string} 返回接口名对应完整地址
  * @function
  * @static
  */
  getUrl = __non_webpack_require__('configs').getUrl,
  noop = $.noop,
  globalAjaxSetting = {
      inShowLoading: false,
      isAutoCloseLoading: true,
      loading: false
  };
$.ajaxSetup({
    type: "GET",
    dataType: "json",
    global: true,
    timeout: 60000,
    beforeSend: function () { },
    error: function (e) { },
    complete: function () { }
});
$(document).ajaxStart(function (e) {
    if (globalAjaxSetting.inShowLoading && !globalAjaxSetting.loading) {
        globalAjaxSetting.loading = true;
        loading();
    }
});
$(document).ajaxSend(function (evt, request, settings) { });
$(document).ajaxComplete(function (evt, request, settings) { });
$(document).ajaxStop(function () {
    if (globalAjaxSetting.loading) {
        globalAjaxSetting.loading = false;
        hideLoading();

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
                alert('网络请求超时', { type: "error" });
            } else if (statusText == 'parsererror') {
                alert('系统出错了', { type: "error" });
            } else if (isSuccess && statusText == responseStatus.sessiontimeout) {
            } else if (isSuccess) {
                alert(error, { type: "error" });
            } else {
                alert(statusText, { type: "error" });
            }
        }
        deferred.rejectWith(this, arguments);
    }
    var ajax, deferred = $.Deferred();
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
    ajax = $.ajax(options);
    ajax.done(wrapSuccess).fail(wrapFail);
    return deferred.promise(ajax);
}
/**
 * 网络请求
 * @param {object} options jQuery.Ajax（options）参数 可以参考jquery ajax
 * @param {string} options.name 接口配置名称，当为空null时，读取url
 * @param {boolean} [options.isCustomerError=false] 默认系统处理错误信息，设为true自己处理 
 * @param {boolean} [options.isWrapAjax=true] 默认强制后台返回特定格式，设为false不要求
 * @param {boolean} [options.inShowLoading=true] 默认请求后台会显示加载动画，设为false为不显示动画
 * @returns {promise} ajax promise 对象
 * @static
 * @example  <caption>Ajax 返回格式</caption>
 * {
 *  “retBody”:null,  // 操作数据
 *  "retStatus":"",// 状态码
 *  "retMsg":"" //错误信息
 * }
 */
function request(options) {
    if (options.name) {
        options.url = getUrl(options.name);
    }
    return wrapReuqest(options);
}
/**
 * POST网络请求,参考request
 * @param {object} options 参考request
 * @static
 * @example 
 * mjb.getRequest('getList',{data:{pageSize:10,pageIndex:1}}).then(sucessCallback,failCallback);
 */
function postRequest(options) {
    options.type = "post";
    return request(options);
}
/**
 * GET网络请求
 * @param {object} options 参考request
 * @static
 */
function getRequest(options) {
    options.type = "get";
    return request(options);
}
export {
    getUrl,
    request,
    postRequest,
    getRequest
}
