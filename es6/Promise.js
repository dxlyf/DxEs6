(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function LoadImage(src) {
        var img = new Image();
        return new Promise(function (resolve, reject) {
                img.onload = resolve;
                img.onabort = img.onerror = reject;
                img.src = src;
        });
}

/***/ })
],[0]);
});