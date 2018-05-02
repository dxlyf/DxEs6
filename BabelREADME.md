# babel 插件浏览器
- [babel-core](#options)
- [语法转换](#插件语法转换情况)
- [类型转换](#类型转换)
- [所有插件](#所有插件)
- [插件/预设排序](#插件预设排序)

## 默认转换情况
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。Babel 默认不转码的 API 非常多，详细清单可以查看 definitions.js 文件


## babel-core 选项 {#options}
```
targets
{ [string]: number | string }, 默认为 {}。

支持一个运行环境的对象

每个目标环境都有一个数字或字符串 (我们建议在使用次要版本的时候使用字符串，例如 node: "6.10")。

运行示例环境: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron。

这些 数据 是通过从 compat-table 中提取数据的 build-data 脚本 中生成的。

targets.node
number | string | "current" | true

如果需要编译当前node版本，你可以指定 "node": true 或者 "node": "current", 它与 "node": process.versions.node 相同。

targets.browsers
Array<string> | string

可以利用 browserslist 查询选择的浏览器 (例如: last 2 versions, > 5%)。

请注意，浏览器的结果会被来自 targets 的明确条目覆盖。

targets.uglify
true

在使用 uglify-js 压缩代码时, 由于 uglify-js 不支持任何ES2015+语法，因此浏览器运行时可能会遇到语法错误。

为了防止这些错误的发生 - 将 uglify 选项设置为 true， 它将会启用所有的翻译插件, 因此你的代码会被编译为ES5. 然而， useBuiltIns 选项仍然会像之前一样工作，只包含你的目标浏览器所需要的 polyfills。

Uglify通过 uglify-es 支持ES2015语法。如果您使用uglify-es不支持的语法，我们推荐使用 babel-minify。

注意: 这个选项在 2.x 中已经弃用，并且用 forceAllTransforms 选项来替代.

spec
boolean， 默认为 false。

对在这个 preset 中支持它们的插件启用更符合规范，但可能较慢的方式。

loose
boolean， 默认为 false。

允许它们为这个 preset 的任何插件启用”loose” 转换。

modules
"amd" | "umd" | "systemjs" | "commonjs" | false， 默认为 "commonjs".

启用将ES6模块语法转换为另一种模块类型。

将其设置为 false 就不会转换模块。

debug
boolean， 默认为 false。

将使用的目标浏览器/插件和在 数据插件版本 中指定的版本用 console.log 输出。

include
```
## 插件语法转换情况
```
const es2015 = {
  "check-es2015-constants": {
    features: [
      "const",
    ],
  },
  "transform-es2015-arrow-functions": {
    features: [
      "arrow functions",
    ],
  },
  "transform-es2015-block-scoped-functions": {
    features: [
      "block-level function declaration"
    ],
  },
  "transform-es2015-block-scoping": {
    features: [
      "const",
      "let",
    ],
  },
  "transform-es2015-classes": {
    features: [
      "class",
      "super",
    ],
  },
  "transform-es2015-computed-properties": {
    features: [
      "object literal extensions / computed properties",
    ],
  },
  "transform-es2015-destructuring": {
    features: [
      "destructuring, assignment",
      "destructuring, declarations",
      "destructuring, parameters",
    ],
  },
  "transform-es2015-duplicate-keys": {
    features: [
      "miscellaneous / duplicate property names in strict mode",
    ],
  },
  "transform-es2015-for-of": {
    features: [
      "for..of loops",
    ],
  },
  "transform-es2015-function-name": {
    features: [
      "function \"name\" property",
    ]
  },
  "transform-es2015-literals": {
    features: [
      "Unicode code point escapes",
    ],
  },
  "transform-es2015-object-super": {
    features: [
      "super",
    ],
  },
  "transform-es2015-parameters": {
    features: [
      "default function parameters",
      "rest parameters",
    ],
  },
  "transform-es2015-shorthand-properties": {
    features: [
      "object literal extensions / shorthand properties",
    ],
  },
  "transform-es2015-spread": {
    features: [
      "spread (...) operator",
    ],
  },
  "transform-es2015-sticky-regex": {
    features: [
      "RegExp \"y\" and \"u\" flags / \"y\" flag, lastIndex",
      "RegExp \"y\" and \"u\" flags / \"y\" flag",
    ],
  },
  "transform-es2015-template-literals": {
    features: [
      "template literals",
    ],
  },
  "transform-es2015-typeof-symbol": {
    features: [
      "Symbol / typeof support"
    ],
  },
  "transform-es2015-unicode-regex": {
    features: [
      "RegExp \"y\" and \"u\" flags / \"u\" flag, case folding",
      "RegExp \"y\" and \"u\" flags / \"u\" flag, Unicode code point escapes",
      "RegExp \"y\" and \"u\" flags / \"u\" flag",
    ],
  },
  "transform-new-target": {
    features: [
      "new.target",
    ],
  },
  "transform-regenerator": {
    features: [
      "generators",
    ],
  }
};

const es2016 = {
  "transform-exponentiation-operator": {
    features: [
      "exponentiation (**) operator",
    ],
  }
};

const es2017 = {
  "transform-async-to-generator": {
    features: [
      "async functions",
    ],
  },
  "syntax-trailing-function-commas": {
    features: [
      "trailing commas in function syntax",
    ],
  }
};

const proposals = require("./shipped-proposals").features;

module.exports = Object.assign({}, es2015, es2016, es2017, proposals);
```
## 类型转换
```
{
  "es6.typed.array-buffer": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.data-view": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "15",
    "safari": "5.1",
    "node": "0.12",
    "ie": "10",
    "android": "4",
    "ios": "6",
    "electron": "1.1"
  },
  "es6.typed.int8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-clamped-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float64-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.reflect.apply": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.construct": {
    "chrome": "49",
    "edge": "13",
    "firefox": "44",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.define-property": {
    "chrome": "49",
    "edge": "13",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.delete-property": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-own-property-descriptor": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.has": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.is-extensible": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.own-keys": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.prevent-extensions": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "es6.promise": {
    "chrome": "51",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.symbol": {
    "chrome": "51",
    "firefox": "51",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.object.assign": {
    "chrome": "45",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.object.is": {
    "chrome": "19",
    "edge": "12",
    "firefox": "22",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.object.set-prototype-of": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ie": "11",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.function.name": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.string.raw": {
    "chrome": "41",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.from-code-point": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.code-point-at": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.repeat": {
    "chrome": "41",
    "edge": "12",
    "firefox": "24",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.starts-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.ends-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.includes": {
    "chrome": "41",
    "edge": "12",
    "firefox": "40",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.regexp.flags": {
    "chrome": "49",
    "firefox": "37",
    "safari": "9",
    "node": "6",
    "ios": "9",
    "opera": "36",
    "electron": "1"
  },
  "es6.regexp.match": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.replace": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.split": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.search": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.array.from": {
    "chrome": "51",
    "edge": "15",
    "firefox": "36",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.array.of": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.copy-within": {
    "chrome": "45",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.find": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.find-index": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.fill": {
    "chrome": "45",
    "edge": "12",
    "firefox": "31",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.iterator": {
    "chrome": "38",
    "edge": "12",
    "firefox": "28",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.number.is-finite": {
    "chrome": "19",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.number.is-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-nan": {
    "chrome": "19",
    "edge": "12",
    "firefox": "15",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "electron": "0.2"
  },
  "es6.number.epsilon": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.min-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.max-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.parse-float": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.parse-int": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.math.acosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.asinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.atanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cbrt": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.clz32": {
    "chrome": "38",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.expm1": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.fround": {
    "chrome": "38",
    "edge": "12",
    "firefox": "26",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.hypot": {
    "chrome": "38",
    "edge": "12",
    "firefox": "27",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.imul": {
    "chrome": "30",
    "edge": "12",
    "firefox": "23",
    "safari": "7",
    "node": "0.12",
    "android": "4.4",
    "ios": "7",
    "opera": "17",
    "electron": "0.2"
  },
  "es6.math.log1p": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log10": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log2": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sign": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.tanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.trunc": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "opera": "25",
    "electron": "0.2"
  },
  "es7.array.includes": {
    "chrome": "47",
    "edge": "14",
    "firefox": "43",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "34",
    "electron": "0.36"
  },
  "es7.object.values": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.object.entries": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.object.get-own-property-descriptors": {
    "chrome": "54",
    "edge": "15",
    "firefox": "50",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "41",
    "electron": "1.5"
  },
  "es7.string.pad-start": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "44",
    "electron": "1.7"
  },
  "es7.string.pad-end": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "44",
    "electron": "1.7"
  },
  "es7.promise.finally": {}
}
```
## 插件浏览器
```
{
  "check-es2015-constants": {
    "chrome": "49",
    "edge": "14",
    "firefox": "51",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-arrow-functions": {
    "chrome": "47",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "34",
    "electron": "0.36"
  },
  "transform-es2015-block-scoped-functions": {
    "chrome": "41",
    "edge": "12",
    "firefox": "46",
    "safari": "10",
    "node": "4",
    "ie": "11",
    "ios": "10",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-es2015-block-scoping": {
    "chrome": "49",
    "edge": "14",
    "firefox": "51",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-classes": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-computed-properties": {
    "chrome": "44",
    "edge": "12",
    "firefox": "34",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-es2015-destructuring": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-duplicate-keys": {
    "chrome": "42",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "29",
    "electron": "0.27"
  },
  "transform-es2015-for-of": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-function-name": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-es2015-literals": {
    "chrome": "44",
    "edge": "12",
    "firefox": "53",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-es2015-object-super": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-parameters": {
    "chrome": "49",
    "edge": "14",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-shorthand-properties": {
    "chrome": "43",
    "edge": "12",
    "firefox": "33",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "30",
    "electron": "0.29"
  },
  "transform-es2015-spread": {
    "chrome": "46",
    "edge": "13",
    "firefox": "36",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-es2015-sticky-regex": {
    "chrome": "49",
    "edge": "13",
    "firefox": "3",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "36",
    "electron": "1"
  },
  "transform-es2015-template-literals": {
    "chrome": "41",
    "edge": "13",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-es2015-typeof-symbol": {
    "chrome": "38",
    "edge": "12",
    "firefox": "36",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "opera": "25",
    "electron": "0.2"
  },
  "transform-es2015-unicode-regex": {
    "chrome": "50",
    "edge": "13",
    "firefox": "46",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-new-target": {
    "chrome": "46",
    "edge": "14",
    "firefox": "41",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-regenerator": {
    "chrome": "50",
    "edge": "13",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-exponentiation-operator": {
    "chrome": "52",
    "edge": "14",
    "firefox": "52",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "opera": "39",
    "electron": "1.3"
  },
  "transform-async-to-generator": {
    "chrome": "55",
    "edge": "15",
    "firefox": "52",
    "safari": "10.1",
    "node": "7.6",
    "ios": "10.3",
    "opera": "42",
    "electron": "1.6"
  },
  "syntax-trailing-function-commas": {
    "chrome": "58",
    "edge": "14",
    "firefox": "52",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "opera": "45",
    "electron": "1.7"
  },
  "transform-async-generator-functions": {},
  "transform-object-rest-spread": {
    "chrome": "60",
    "firefox": "55",
    "node": "8.3",
    "opera": "47"
  },
  "transform-optional-catch-binding": {},
  "transform-unicode-property-regex": {}
}
```

## 所有插件
#### 默认
babel-runtime
- map
- set
- promise
- symbol
在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。
这个 preset 中包含以下插件:

check-es2015-constants
transform-es2015-arrow-functions
transform-es2015-block-scoped-functions
transform-es2015-block-scoping
transform-es2015-classes
transform-es2015-computed-properties
transform-es2015-destructuring
transform-es2015-duplicate-keys
transform-es2015-for-of
transform-es2015-function-name
transform-es2015-literals
transform-es2015-modules-commonjs
transform-es2015-object-super
transform-es2015-parameters
transform-es2015-shorthand-properties
transform-es2015-spread
transform-es2015-sticky-regex
transform-es2015-template-literals
transform-es2015-typeof-symbol
transform-es2015-unicode-regex
transform-regenerator

* ES3
  * es3-member-expression-literals
  * es3-property-literals  
* ES5
  * es5-property-mutators
* ES2015
  * check-es2015-constants
  * es2015-arrow-functions
  * es2015-block-scoped-functions
  * es2015-block-scoping
  * es2015-classes
  * es2015-computed-properties
  * es2015-destructuring
  * es2015-duplicate-keys
  * es2015-for-of
  * es2015-function-name
  * es2015-literals
  * es2015-object-super
  * es2015-parameters
  * es2015-shorthand-properties
  * es2015-spread
  * es2015-sticky-regex
  * es2015-template-literals
  * es2015-typeof-symbol
  * es2015-unicode-regex

* ES2016
  * exponentiation-operator
  * ES2017
  * async-to-generator
* 模块
  * es2015-modules-amd
  * es2015-modules-commonjs
  * es2015-modules-systemjs
  * es2015-modules-umd
* 实验阶段
  * async-generator-functions
  * async-to-module-method
  * class-constructor-call (不推荐)
  * class-properties
  * decorators
  * do-expressions
  * export-extensions
  * function-bind
  * object-rest-spread
  * Minification
请查看基于 Babel 的 minifier !

* 这些 plugin 都存在于 minify 项目中。
  * inline-environment-variables
  * inline-consecutive-adds
  * member-expression-literals
  * merge-sibling-variables
  * minify-booleans
  * minify-constant-folding
  * minify-dead-code-elimination
  * minify-flip-comparisons
  * minify-guarded-expressions
  * minify-infinity
  * minify-mangle-names
  * minify-numeric-literals
  * minify-replace
  * minify-simplify
  * minify-type-constructors
  * node-env-inline
  * property-literals
  * regexp-constructors
  * remove-console
  * remove-debugger
  * simplify-comparison-operators
  * undefined-to-void
* React
  * react-constant-elements
  * react-display-name
  * react-inline-elements
  * react-jsx
  * react-jsx-compat
  * react-jsx-self
  * react-jsx-source
* 其它
  * eval
  * flow-comments
  * flow-strip-types
  * jscript
  * object-assign
  * object-set-prototype-of-to-assign
  * proto-to-assign
  * regenerator
  * runtime
  * strict-mode
  * 混合 Plugin
  * external-helpers
* 混合 Plugin
  * external-helpers

语法 Plugins
这些 plugin 允许 Babel 解析特定类型的语法(不转译)。

注意: 转译 plugin 会自动继承/使用语法插件，因此如果已经使用了相应的转译 plugin ，则不需要指定语法 plugin 。

你也可以从 babylon 中提供任意 plugin 选项:

```javascript
Copy
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```
* 实验性的
  * async-generators
  * class-properties
  * decorators
  * do-expressions
  * dynamic-import
  * export-extensions
  * flow
  * function-bind
  * function-sent
  * jsx
  * object-rest-spread


- 默认启用
这些 plugin 已经不起作用了，因为较新版本的 babylon 默认已经启用了它们。
  - async-functions (自 babylon 6.9.1 起)
  - exponentiation-operator (自从 babylon 6.9.1 起)
  - trailing-function-commas (自从 babylon 6.9.1 起)

* 不推荐
  * class-constructor-call

### 插件预设排序

为插件中的每个访问者排序。

这意味着如果两次转换都访问“程序”节点，则转换将以插件或预设顺序运行。

- 插件在预设之前运行。
- 插件排序是第一个持续。
- 预设顺序颠倒（从上到下）。

例如：
复制
```json
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```
将运行transform-decorators-legacy然后transform-class-properties。

记住预设的顺序是相反的。下列：

复制
```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```
将按照以下顺序运行：stage-2，react，然后es2015。

这主要是为了确保向后兼容性，因为大多数用户在“stage-0”之前列出“es2015”。有关更多信息，请参阅有关可能的遍历API更改的注释。

### 插件/预设选项
插件和预设都可以通过将名称和选项对象包含在配置中的数组中指定选项。

例如：


复制
```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```
预设的设置选项完全相同：


复制
```json
{
  "presets": [
    ["es2015", {
      "loose": true,
      "modules": false
    }]
  ]
}
```
### 插件开发
请参阅优秀的babel手册来学习如何创建自己的插件。

颠倒名称的简单插件（从主页）：


尝试

复制
```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      }
    }
  };
}
```
### 创建预设
要制作自己的预设，只需要导出一个配置。


尝试

复制
```js
// Presets can contain other presets, and plugins with options.
module.exports = {
  presets: [
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ],
};
```
有关更多信息，请查看关于预设的babel手册部分或仅查看es2015预设回购作为示例。