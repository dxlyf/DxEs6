
//jsdoc -c jsdoc/dx.js
/**
 * npm i jsdoc -g
 * 
 * templates:
    *  cerulean
        cosmo
        cyborg
        flatly
        journal
        lumen
        paper
        readable
        sandstone
        simplex
        slate
        spacelab
        superhero
        united
        yeti
 *
*/
module.exports={
    "plugins":[],//['plugins/markdown'],// ['jsdoc/plugins/removecopyright'],
    "recurseDepth": 10,
    "source": {
        "include": ['./src/dx/' /* array of paths to files to generate documentation for */ ],
        "exclude": ['./src/dx/index.js','./src/dx/main.js' /* array of paths to exclude */ ],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "systemName":"Mjb API文档",          //  : "{string}", //被记录的系统的名称。这将出现在每个页面的页面标题中
        "footer":"",               // : "{string}", //任何标记都希望出现在每页的页脚中。这完全没有处理，只是按照您输入的那样进行打印
        "copyright":"",            // :  "{string}", //可以在页脚底部添加版权信息，并在页面底部的JSDoc时间戳上方添加版权信息
        "includeDate":false,        // : "{boolean}", //默认情况下，当前日期始终显示在生成的文档的页脚中。通过将此选项设置为可以省略当前日期false
        "navType":"vertical",              // : "{vertical|inline}", //该模板使用顶级导航，并为每个类别的内容提供下拉菜单。在大型系统上，这些下拉菜单可以大到足以扩展到页面之外。要使下拉列表渲染得更宽并垂直堆叠条目，请将此选项设置为"inline"。否则将其设置"vertical"为使其定期叠加下拉菜单。
        "theme":"simplex",              //  : "{theme}",
        "linenums":false,            // : "{boolean}",//如果为true，行号将显示在源代码列表中。如果你 也打开了这个。
        "collapseSymbols":false,      // : "{boolean}", // 如果你的页面有大量的符号，那么在所有的文本中都很容易迷失。如果将其转为true 页面中的所有符号，则会将其内容向上滚动，以便您可以获取可扩展和折叠的符号列表。
        "inverseNav":true,           // : "{boolean}", //Bootstrap navbars有两种风格，规则和反向，其中反向通常是较高的对比度。将其设置true为使用逆标题。
        "outputSourceFiles":false,    // : "{boolean}" , // 当为true时，系统将通过文档中的链接生成源打印文件列表。
        "outputSourcePath":false,    //  : "{boolean}", //什么时候outputSourceFiles是false，你可能仍然想命名该文件，即使没有链接到漂亮的打印输出。设置这true时候outputSourceFiles是false。outputSourceFiles何时true优先于此设置。
        "dateFormat": "ddd MMM Do YYYY",         //  : "{string}", //打印日期时使用的日期格式。它接受由moment.js理解的任何格式字符串
        "syntaxTheme":"dark",         //  : "{string}", //确定用于代码块的主题的字符串。默认值是"default"。它可以是阳光主题所支持的任何价值，它现在由......组成...... "default"并且"dark"，但至少你有它，如果你需要的话。
        "sort":"longname",					//: "{boolean|string}",//将默认值排序为true。指定jsdoc是应该对数据进行排序还是使用文件顺序。也可以是一个字符串，如果是的话，它直接传递给jsdoc。默认字符串是"longname, version, since"。
        "search":true              // : "{boolean}" //搜索默认情况下，模板包含一个快速搜索框。对于大型API，搜索数据库的加载可能太昂贵。如果需要，您可以禁用此功能，将此选项设置为false。
    },
    "opts": {
        "readme":"./src/dx/readme.md",
        //"template":"templates/default",
        "template": "node_modules/ink-docstrap/template",  // same as -t templates/default haruki silent  npm install ink-docstrap  "templates/default"
        "encoding": "utf8",               // same as -e utf8
        "destination": "./dist/jsdoc/",          // same as -d ./out/
        "recurse": true,                  // same as -r
        "tutorials": "jsdoc/dx-tutorials", // same as -u path/to/tutorials
    },
    // "class":{
    //     "title":"类"
    // }
}
