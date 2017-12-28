# TypeScript
- [ts-loader](#ts-loader)



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
