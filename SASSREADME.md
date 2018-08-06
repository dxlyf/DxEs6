* sass insall
* sass [编译命令](#编译命令) 
* [预处理](#预处理)
```bash
npm install -g sass
```
## 编译命令
```bash
    -w, --watch                Watch a        directory or file
    -r, --recursive            Recursively watch directories or files
    -o, --output               Output directory
    -x, --omit-source-map-url  Omit source map URL comment from output
    -i, --indented-syntax      Treat data from stdin as sass code (versus scss)
    -q, --quiet                Suppress log output except on error
    -v, --version              Prints version info
    --output-style             CSS output style (nested | expanded | compact | compressed)
    --indent-type              Indent type for output CSS (space | tab)
    --indent-width             Indent width; number of spaces or tabs (maximum value: 10)
    --linefeed                 Linefeed style (cr | crlf | lf | lfcr)
    --source-comments          Include debug info in output
    --source-map               Emit source map
    --source-map-contents      Embed include contents in map
    --source-map-embed         Embed sourceMappingUrl as data URI
    --source-map-root          Base path, will be emitted in source-map as is
    --include-path             Path to look for imported files
    --follow                   Follow symlinked directories
    --precision                The amount of precision allowed in decimal numbers
    --error-bell               Output a bell character on errors
    --importer                 Path to .js file containing custom importer
    --functions                Path to .js file containing custom functions
    --help                     Print usage info
```
## 预处理
CSS本身很有趣，但样式表变得越来越大，越来越复杂，难以维护。这是预处理器可以提供帮助的地方。Sass允许你使用CSS中不存在的功能，比如变量，嵌套，混合，继承和其他漂亮的好东西，使CSS再次变得有趣。

一旦你开始修改Sass，它将采用你的预处理Sass文件并将其保存为您可以在您的网站中使用的普通CSS文件。

实现这一目标的最直接方法是在您的终端。安装Sass后，您可以使用该sass命令将Sass编译为CSS 。您需要告诉Sass要构建哪个文件，以及将CSS输出到何处。例如，sass input.scss output.css从终端运行将获取单个Sass文件input.scss，并将该文件编译为output.css。

您还可以使用该--watch标志查看单个文件或目录。watch标志告诉Sass要查看源文件的更改，并在每次保存Sass时重新编译CSS。如果您想观看（而不是手动构建）您的input.scss文件，您只需将watch标志添加到您的命令中，如下所示：
```bash
sass --watch input.scss output.css
```
您可以使用文件夹路径作为输入和输出来观察和输出到目录，并使用冒号分隔它们。在这个例子中：
```bash
sass --watch app/sass:public/stylesheets
```
Sass会查看文件app/sass夹中的所有文件以进行更改，并将CSS编译到该public/stylesheets文件夹。