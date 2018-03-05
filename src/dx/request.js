import $ from 'jquery'
import _ from 'lodash'
//import configs from 'configs'
import {loading,hideLoading,alert} from './element'
var responseStatus = {
    'success': "200", // 操作成功
    'operationForbidden ': "403", // 操作被禁止
    'validateFailed ': "400", // 验证失败
    'noFound': "404", // 资源未找到
    'ServerError': "500" //服务器内部错误
},
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
 * @param {type} name configs 接口配置名称
 * @param {type} options jQuery.Ajax（options）参数 可以参考jquery ajax
 * @returns {type} ajax promise 对象
 * @example 
 * mjb.getRequest('getList',{data:{pageSize:10,pageIndex:1}}).then(sucessCallback,failCallback);
 */
function request(options) {
    if (options.name) {
        options.url = getUrl(options.name);
    }
    return wrapReuqest(options);
}

function postRequest(options) {
    options.type = "post";
    return request(options);
}

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
