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
return webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// 数据解构

(function () {
  var foo = 1,
      bar = 2,
      baz = 3;
  var _ref = ["foo", "bar", "baz"],
      third = _ref[2];
  var head = 1,
      tail = [2, 3, 4];

  var _ref2 = ['a'],
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2.slice(2);

  var a = 1,
      b = [2, 3],
      d = 4;

  var arr = [1, 2, 3];
  var first = arr[0],
      last = arr[arr.length - 1];
  var _ref3 = ['a'],
      x2 = _ref3[0],
      _ref3$ = _ref3[1],
      y2 = _ref3$ === undefined ? 'b' : _ref3$; // x
})();

// 对象解构
function a() {
  var _foo$bar = { foo: "aaa", bar: "bbb" },
      foo = _foo$bar.foo,
      bar = _foo$bar.bar;
}
function b() {
  // 变量别名,默认值
  var _foo$bar2 = { foo: 'aaa', bar: 'bbb' },
      baz = _foo$bar2.foo,
      _foo$bar2$bar = _foo$bar2.bar2,
      pp = _foo$bar2$bar === undefined ? '4444' : _foo$bar2$bar;


  var obj = {
    p: ['Hello', { y: 'World' }]
  };

  var _obj$p = _slicedToArray(obj.p, 2),
      x = _obj$p[0],
      y = _obj$p[1].y;

  var node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };

  var loc = node.loc,
      start = node.loc.start,
      line = node.loc.start.line;
  var _ref4 = {},
      _ref4$message = _ref4.message,
      msg = _ref4$message === undefined ? 'Something went wrong' : _ref4$message;
}
// 字符串解构
function c() {
  var _hello = 'hello',
      _hello2 = _slicedToArray(_hello, 5),
      a = _hello2[0],
      b = _hello2[1],
      c = _hello2[2],
      d = _hello2[3],
      e = _hello2[4];
}
// 函数解构
function d() {
  function add(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        x = _ref6[0],
        y = _ref6[1];

    return x + y;
  }

  add([1, 2]); // 3

  function move() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref7$x = _ref7.x,
        x = _ref7$x === undefined ? 0 : _ref7$x,
        _ref7$y = _ref7.y,
        y = _ref7$y === undefined ? 0 : _ref7$y;

    return [x, y];
  }

  move({ x: 3, y: 8 }); // [3, 8]
  move({ x: 3 }); // [3, 0]
  move({}); // [0, 0]
  move(); // [0, 0]

  function move2() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
        x = _ref8.x,
        y = _ref8.y;

    return [x, y];
  }

  move2({ x: 3, y: 8 }); // [3, 8]
  move2({ x: 3 }); // [3, undefined]
  move2({}); // [undefined, undefined]
  move2(); // [0, 0]
}
// 用途
function f() {
  // 交换值
  var x = 1;
  var y = 2;

  // 遍历map
  var _ref9 = [y, x];
  x = _ref9[0];
  y = _ref9[1];
  var map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref10 = _step.value;

      var _ref11 = _slicedToArray(_ref10, 2);

      var key = _ref11[0];
      var value = _ref11[1];

      console.log(key + " is " + value);
    }
    // 获取键名
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref12 = _step2.value;

      var _ref13 = _slicedToArray(_ref12, 1);

      var _key = _ref13[0];
    }
    // ...


    // 获取键值
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      // ...

      var _ref14 = _step3.value;

      var _ref15 = _slicedToArray(_ref14, 2);

      var _value = _ref15[1];
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

/***/ })
],[1]);
});