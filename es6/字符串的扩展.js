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
return webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Couldn't find preset \"es2015\" relative to directory \"E:\\\\fanyonglong2016\\\\project\\\\DxEs6\\\\src\\\\es6\"\n    at E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:293:19\n    at Array.map (native)\n    at OptionManager.resolvePresets (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:275:20)\n    at OptionManager.mergePresets (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:264:10)\n    at OptionManager.mergeOptions (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:249:14)\n    at OptionManager.init (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:368:12)\n    at File.initOptions (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:212:65)\n    at new File (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:135:24)\n    at Pipeline.transform (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-core\\lib\\transformation\\pipeline.js:46:16)\n    at transpile (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-loader\\lib\\index.js:50:20)\n    at Object.module.exports (E:\\fanyonglong2016\\project\\DxEs6\\node_modules\\babel-loader\\lib\\index.js:175:20)");

/***/ })

},[2]);
});