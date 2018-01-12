# TypeScript
- [ts-loader](#ts-loader)
- [tsconfig配置](#tsconfig配置)


## ts-loader 配置
```javascript
 // https://www.npmjs.com/package/ts-loader
 transpileOnly （boolean）（default = false）
   /* 如果你想加快编译速度，你可以设置这个标志。但是，从应用程序中不同依赖项之间的静态类型检查获得的许多好处将会丢失。
   建议transpileOnly与fork-ts-checker-webpack-plugin一起使用以再次进行完整类型检查。看看在实践中看起来像什么，
然后看看我们这个简单的例子。对于更复杂的设置，请参阅我们更多涉及的示例。*/
happyPackMode （boolean）（default = false）
 /* 如果您使用HappyPack或线程加载器来对您的构建进行合并，那么您需要将其设置为true。这隐式地设置*transpileOnly*于true和警告！停止注册所有错误到webpack。*/
 logLevel （string）（default = warn）
//可以是info，warn或者error是将日志输出限制在指定的日志级别。要小心这样一个事实，即将错误写入stderr，而其他所有内容都写入stderr（如果logInfoToStdOut为true，则为stdout）。
slient（boolean）（默认= false）
// 如果为true，则不会发出console.log消息。请注意，大多数错误消息是通过webpack发出的，不受此标志的影响。            
ignoreDiagnostics （number []）（default = []）
// 您可以通过指定一组要忽略的诊断代码来压制某些TypeScript错误。
configFile （string）（default ='tsconfig.json'）
/*允许您指定在哪里找到TypeScript配置文件。你可以提供
                    只是一个文件名。然后加载程序将搜索相应入口点包含文件夹中每个入口点的配置文件。如果在那里找不到配置文件，它将沿着父目录链往上走，并在这些文件夹中查找配置文件。
                    一个到配置文件的相对路径。这将相对于相应的.ts入口文件来解决。
                    配置文件的绝对路径。*/
color（boolean）（默认= true）// 如果false禁用记录器消息中的内置颜色。
 errorFormatter （（message：ErrorInfo，colors：boolean）=> string）（default = undefined）
 // 默认情况下，ts-loader格式化TypeScript编译器输出的错误或样式中的警告：
 compilerOptions （object）（default = {}）
//允许覆盖TypeScript选项。应该使用与compilerOptionstsconfig.json中的属性相同的格式来指定。
instance (string)
//高级选项强制文件通过TypeScript编译器的不同实例。可以用来强制代码的不同部分之间的分离。
entryFileCannotBeJs (boolean) (default=false) DEPRECATED
 /*                   如果allowJs编译器选项是true那么你的入口文件可能是JS。使用TypeScript 2.3及以下版本的ts-loader存在一个已知的问题。如果您使用TypeScript 2.3或更低版本的ts-loader，则可以使用此选项来解决该问题。
        这个选项将会在未来版本的ts-loader中被删除。*/
appendTsSuffixTo （RegExp []）（default = []）
appendTsxSuffixTo （RegExp []）（default = []）
/*与文件名匹配的正则表达式列表。如果文件名与其中一个正则表达式相匹配，则会在该文件名后附加一个.ts或一个.tsx后缀。
                    这对于现在的*.vue 文件格式非常有用。（将来可能会受益于新的单一文件格式。）例：*/
onlyCompileBundledFiles （boolean）（default = false）
/*TS-装载机的默认行为是作为一个下拉更换为tsc命令，所以它尊重include，files以及exclude在你的选择tsconfig.json，通过加载这些选项指定的任何文件。该onlyCompileBundledFiles选项修改此行为，仅加载实际上由webpack捆绑的.d.ts文件以及tsconfig.json设置包含的任何文件。.d.ts文件仍然包含在内，因为它们可能需要进行编译而不被显式导入，因此不会被webpack拾取。*/
 contextAsConfigBasePath （boolean）（default = false）
/*如果为true，则将使用webpack.context解析TypeScript配置文件 作为基本路径。默认情况下，配置文件的目录用作基本路径。解析时，配置文件中的相对路径相对于基本路径被解析。选项contextAsConfigBasePath允许选项设置 configFile为为比项目根之外的路径（例如，NPM封装）和基本路径ts-loader是webpack.context（这是大多数时间项目根）。
请记住，不是有一个tsconfig.json在你的项目的根可能会导致之间的不同的行为ts-loader和tsc。在使用编辑器时VS Code，建议将tsconfig.json文件添加到项目的根目录并扩展选项中引用的配置文件configFile。欲了解更多信息，请阅读贡献此选项的公关。*/
            
 Usage with Webpack watch
/*因为TS会生成.js和.d.ts文件，所以你应该忽略这些文件，否则观察者可能会进入一个无限的观察循环。例如，在使用Webpack的时候，你可能希望把它添加到你的webpack.conf.js文件中：/*
plugins: [
new webpack.WatchIgnorePlugin([
    /\.js$/,
    /\.d\.ts$/
])
],
```
## tsconfig 编译配置
选项 |	类型	|默认值	|描述
--|--|--|--
--allowJs|	boolean|	false	|允许编译javascript文件。
--allowSyntheticDefaultImports|	boolean|	module === "system"	|允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。
--allowUnreachableCode|	boolean|	false	|不报告执行不到的代码错误。
--allowUnusedLabels|	boolean	|false	|不报告未使用的标签错误。
--alwaysStrict|	boolean	|false	|以严格模式解析并为每个源文件生成 "use strict"语句
--baseUrl|	string|	|	解析非相对模块名的基准目录。查看 模块解析文档了解详情。
--charset	|string|	"utf8"|	输入文件的字符集。
--checkJs|	boolean|	false|	在 .js文件中报告错误。与 --allowJs配合使用。
--declaration -d|	boolean|	false|	生成相应的 .d.ts文件。
--declarationDir|	string|	|	生成声明文件的输出路径。
--diagnostics|	boolean|	false	|显示诊断信息。
--disableSizeLimit|	boolean|	false	|禁用JavaScript工程体积大小的限制
--emitBOM|	boolean|	false	|在输出文件的开头加入BOM头（UTF-8 Byte Order Mark）。
--emitDecoratorMetadata [1]	|boolean	|false|	给源码里的装饰器声明加上设计类型元数据。查看 issue #2577了解更多信息。
--experimentalDecorators [1]|	boolean|	false	|启用实验性的ES装饰器。
--forceConsistentCasingInFileNames|	boolean|	false|	禁止对同一个文件的不一致的引用。
--help -h	|	|	|打印帮助信息。
--importHelpers|string|		|从 tslib 导入辅助工具函数（比如 __extends， __rest等）
--inlineSourceMap	|boolean	|false	|生成单个sourcemaps文件，而不是将每sourcemaps生成不同的文件。
--inlineSources|	boolean|	false	|将代码与sourcemaps生成到一个文件中，要求同时设置了 --inlineSourceMap或 --sourceMap属性。
--init|	|	|	初始化TypeScript项目并创建一个 tsconfig.json文件。
--isolatedModules|	boolean|	false	|将每个文件作为单独的模块（与“ts.transpileModule”类似）。
--jsx|	string	|"Preserve"|	在 .tsx文件里支持JSX： "React"或 "Preserve"。查看 JSX。
--jsxFactory|	string|"React.createElement"	|指定生成目标为react JSX时，使用的JSX工厂函数，比如 React.createElement或 h。
--lib|	string[]	|	|编译过程中需要引入的库文件的列表。 可能的值为： ► ES5 ► ES6 ► ES2015 ► ES7 ► ES2016 ► ES2017 ► DOM ► DOM.Iterable ► WebWorker ► ScriptHost ► ES2015.Core ► ES2015.Collection ► ES2015.Generator ► ES2015.Iterable ► ES2015.Promise ► ES2015.Proxy ► ES2015.Reflect ► ES2015.Symbol ► ES2015.Symbol.WellKnown ► ES2016.Array.Include ► ES2017.object ► ES2017.SharedMemory ► ES2017.TypedArrays ► esnext.asynciterable 注意：如果 --lib没有指定默认注入的库的列表。默认注入的库为： ► 针对于 --target ES5： DOM，ES5，ScriptHost ► 针对于 --target ES6： DOM，ES6，DOM.Iterable，ScriptHost
--listEmittedFiles|	boolean	|false	|打印出编译后生成文件的名字。
--listFiles	|boolean	|false|	编译过程中打印文件名。
--locale|	string|	(platform specific)	|显示错误信息时使用的语言，比如：en-us。
--mapRoot	|string|	|	为调试器指定指定sourcemap文件的路径，而不是使用生成时的路径。当 .map文件是在运行时指定的，并不同于 js文件的地址时使用这个标记。指定的路径会嵌入到 sourceMap里告诉调试器到哪里去找它们。
--maxNodeModuleJsDepth|	number|	0	|nodemodules依赖的最大搜索深度并加载JavaScript文件。仅适用于 --allowJs。
--module -m	|string|	|target === "ES6" ? "ES6" : "commonjs"	指定生成哪个模块系统代码： "None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"或 "ES2015"。 ► 只有 "AMD"和 "System"能和 --outFile一起使用。 ► "ES6"和 "ES2015"可使用在目标输出为 "ES5"或更低的情况下。
--moduleResolution|	string|	|module === "AMD" | "System" | "ES6" ? "Classic" : "Node"	决定如何处理模块。或者是 "Node"对于Node.js/io.js，或者是 "Classic"（默认）。查看 模块解析了解详情。
--newLine	|string|	|(platform specific)	当生成文件时指定行结束符： "crlf"（windows）或 "lf"（unix）。
--noEmit|	boolean	|false	|不生成输出文件。
--noEmitHelpers	|boolean	|false	|不在输出文件中生成用户自定义的帮助函数代码，如 __extends。
--noEmitOnError|	boolean|	false	|报错时不生成输出文件。
--noFallthroughCasesInSwitch|	boolean|	false	|报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）
--noImplicitAny	|boolean	|false	|在表达式和声明上有隐含的 any类型时报错。
--noImplicitReturns|	boolean	|false	|不是函数的所有返回路径都有返回值时报错。
--noImplicitThis|	boolean|	false|	当 this表达式的值为 any类型的时候，生成一个错误。
--noImplicitUseStrict|	boolean	|false	|模块输出中不包含 "use strict"指令。
--noLib	|boolean	|false	|不包含默认的库文件（ lib.d.ts）。
--noResolve|	boolean	|false	|不把 /// &lt;reference``&gt;或模块导入的文件加到编译文件列表。
--noStrictGenericChecks|	boolean	|false|	禁用在函数类型里对泛型签名进行严格检查。
--noUnusedLocals|	boolean|	false|	若有未使用的局部变量则抛错。
--noUnusedParameters|	boolean|	false|	若有未使用的参数则抛错。
--out|	string|	|	弃用。使用 --outFile 代替。
--outDir|	string|	|	重定向输出目录。
--outFile	|string|	|	将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 ///&lt;reference``&gt;和 import的文件顺序决定的。查看输出文件顺序文件了解详情。
paths [2]|	Object|	|	模块名到基于 baseUrl的路径映射的列表。查看 模块解析文档了解详情。
--preserveConstEnums|	boolean	|false	|保留 const和 enum声明。查看 const enums documentation了解详情。
--preserveSymlinks|	boolean	|false	|不把符号链接解析为其真实路径；将符号链接文件视为真正的文件。
--pretty [1]|	boolean|	false	|给错误和消息设置样式，使用颜色和上下文。
--project -p|	string|	|	编译指定目录下的项目。这个目录应该包含一个 tsconfig.json文件来管理编译。查看 tsconfig.json文档了解更多信息。
--reactNamespace|	string|	|"React"	当目标为生成 "react" JSX时，指定 createElement和 __spread的调用对象
--removeComments|	boolean	|false	|删除所有注释，除了以 /!*开头的版权信息。
--rootDir	|string	|(common root directory is computed from the list of input files)|	仅用来控制输出的目录结构 --outDir。
rootDirs [2]|	string[]	| |	根（root）_文件夹列表，表示运行时组合工程结构的内容。查看 模块解析文档了解详情。
--skipDefaultLibCheck	|boolean|	false	|忽略 库的默认声明文件的类型检查。
--skipLibCheck|	boolean|	false	|忽略所有的声明文件（ *.d.ts）的类型检查。
--sourceMap	|boolean|	false|	生成相应的 .map文件。
--sourceRoot	|string|		|指定TypeScript源文件的路径，以便调试器定位。当TypeScript文件的位置是在运行时指定时使用此标记。路径信息会被加到 sourceMap里。
--strict	|boolean	|false	|启用所有严格类型检查选项。 启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks和 --strictFunctionTypes。
--strictFunctionTypes|	boolean|	false|	禁用函数参数双向协变检查。
--strictNullChecks|	boolean	|false|	在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void）。
--stripInternal [1]|	boolean|	false	|不对具有 /** @internal */ JSDoc注解的代码生成代码。
--suppressExcessPropertyErrors [1]|	boolean|	false	|阻止对对象字面量的额外属性检查。
--suppressImplicitAnyIndexErrors|	boolean|	false|	阻止 --noImplicitAny对缺少索引签名的索引对象报错。查看 issue #1232了解详情。
--target -t	|string|	"ES3"	|指定ECMAScript目标版本 "ES3"（默认）， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"或 "ESNext"。 注意： "ESNext"最新的生成目标列表为 ES proposed features
--traceResolution	|boolean	|false|	生成模块解析日志信息
--types|	string[]|		|要包含的类型声明文件名列表。查看 @types，--typeRoots和--types章节了解详细信息。
--typeRoots	|string[]|	|	要包含的类型声明文件路径列表。查看 @types，--typeRoots和--types章节了解详细信息。
--version -v|	|	|	打印编译器版本号。
--watch -w	| |	|在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。


## tsconfig配置
如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：


**使用tsconfig.json**
- 不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。
当命令行上指定了输入文件时，tsconfig.json文件会被忽略。

### 细节
"compilerOptions"可以被忽略，这时编译器会使用默认值。在这里查看完整的编译器选项列表。

"files"指定一个包含相对或绝对文件路径的列表。 "include"和"exclude"属性指定一个文件glob匹配模式列表。 支持的glob通配符有：

- * 匹配0或多个字符（不包括目录分隔符）
- ? 匹配一个任意字符（不包括目录分隔符）
- **/ 递归匹配任意子目录

如果一个glob模式里的某部分只包含*或.*，那么仅有支持的文件扩展名类型被包含在内（比如默认`.ts`，`.tsx`，和`.d.ts`， 如果 `allowJs`设置能`true`还包含`.js`和`.jsx`）。

如果`"files"`和`"include"`都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（`.ts`, `.d.ts` 和 `.tsx`），排除在"`exclude`"里指定的文件。JS文件（.js和.jsx）也被包含进来如果allowJs被设置成true。 如果指定了 "files"或"include"，编译器会将它们结合一并包含进来。 使用 "`outDir`"指定的目录下的文件永远会被编译器排除，除非你明确地使用"`files`"将其包含进来（这时就算用exclude指定也没用）。

使用"include"引入的文件可以使用"`exclude`"属性过滤。 然而，通过 "`files`"属性明确指定的文件却总是会被包含在内，不管"`exclude`"如何设置。 如果没有特殊指定， "`exclude`"默认情况下会排除node_modules，bower_components，jspm_packages和<outDir>目录。

任何被"files"或"include"指定的文件所引用的文件也会被包含进来。 A.ts引用了B.ts，因此B.ts不能被排除，除非引用它的A.ts在"exclude"列表中。

需要注意编译器不会去引入那些可能做为输出的文件；比如，假设我们包含了index.ts，那么index.d.ts和index.js会被排除在外。 通常来讲，不推荐只有扩展名的不同来区分同目录下的文件。

tsconfig.json文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

在命令行上指定的编译选项会覆盖在tsconfig.json文件里的相应选项。

#### @types，typeRoots和types
默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， ./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。

如果指定了typeRoots，只有typeRoots下面的包才会被包含进来。 比如：

复制到剪切板
```json
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```
这个配置文件会包含所有./typings下面的包，而不包含./node_modules/@types里面的包。

如果指定了types，只有被列出来的包才会被包含进来。 比如：

复制到剪切板
```json
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```
这个tsconfig.json文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express。/@types/。 node_modules/@types/*里面的其它包不会被引入进来。

指定"types": []来禁用自动引入@types包。

注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用 import "foo"语句，TypeScript仍然会查找node_modules和node_modules/@types文件夹来获取foo包。

#### 使用extends继承配置
tsconfig.json文件可以利用extends属性从另一个配置文件里继承配置。

extends是tsconfig.json文件里的顶级属性（与compilerOptions，files，include，和exclude一样）。 extends的值是一个字符串，包含指向另一个要继承文件的路径。

在原文件里的配置先被加载，然后被来至继承文件里的配置重写。 如果发现循环引用，则会报错。

来至所继承配置文件的files，include和exclude覆盖源配置文件的属性。

配置文件里的相对路径在解析时相对于它所在的文件。

比如：

configs/base.json：

复制到剪切板
```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```
tsconfig.json：

复制到剪切板
```json
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}
```
tsconfig.nostrictnull.json：

复制到剪切板
```json
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```
compileOnSave
在最顶层设置compileOnSave标记，可以让IDE在保存文件的时候根据tsconfig.json重新生成文件。

复制到剪切板
```json
{
    "compileOnSave": true,
    "compilerOptions": {
        "noImplicitAny" : true
    }
}
```
要想支持这个特性需要Visual Studio 2015， TypeScript1.8.4以上并且安装atom-typescript插件。