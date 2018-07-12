#npm 使用
* [初始化](#初始化)
* [npm install](#installpackage)
* [npm link](#npmlink)
* [npm view](#viewinstallpackage)
* [查看包版本](#查看版本)
* [检查过时包](#检查过时包)
* [搜索包](#搜索)
* [配置](#配置)
* [更新](#更新)
* [卸载](#卸载)
* [删除多余的包](#delpackage)
* [更新NPM和NODE](#更新npm和node)
* [package配置](#package配置)
* [版本](#版本)
---
## 安装nodek
[node下载](#http://nodejs.cn/download/)

## 全局化文件夹自定义设置
### 创建文件夹
在nodejs 下面创建两个文件夹
- node_cache
- node_global
```
c:/Program Files/nodejs/node_cache
c:/Program Files/nodejs/node_global
```
### 设置NPM安装路径
`npm config list` 查看配置
```bash
npm config set prefix "c:\Program Files\nodejs\node_global"
npm config set cache "c:\Program Files\nodejs\node_cache"
```
或者通过打开C:\Program Files\nodejs\node_modules\npm\npmrc 添加
```
prefix=C:\Program Files\nodejs\node_global
cache=C:\Program Files\nodejs\node_cache
```
### 设置环境变识别安装路径
安装到用户变量或者系统变量
- 当执行node 或npm 命令时,window系统会环境变量PATH中提供的路径去查找可执行程序。
- 当node 执行命令时，先查找当前目录node_modules，找不到时再查找NODE_PATH提供路径
#### 用户变量
- NODE_PATH  C:\Program Files\nodejs\node_global\node_modules
- PATH  C:\Program Files\nodejs\;C:\Program Files\nodejs\node_global;

#### 系统变量
- NODE_PATH  C:\Program Files\nodejs\node_global\node_modules
- PATH  C:\Program Files\nodejs\;C:\Program Files\nodejs\node_global;

## NPM-CLI 命令
命令|描述      
--|--   
access        | 设置已发布软件包的访问级别
adduser       |  添加一个注册表用户帐户
bin           |  显示npm bin文件夹
bugs          |  在Web浏览器中的一个包的错误也许
build         |  建立一个包
bundle        |  REMOVED
cache         |  操作软件包缓存
completion    |  标签完成为npm
config        |  管理npm配置文件
dedupe        |  减少重复
deprecate     |  弃用软件包的版本
dist-tag      |  修改程序包分发标签
docs          |  文件在网页浏览器中的包也许
doctor        |  检查你的环境
edit          |  编辑已安装的软件包
explore       |  浏览已安装的软件包
help          |  获得有关npm的帮助
help-search   |  搜索npm帮助文档
init          |  交互式创建一个package.json文件
install       |  安装一个软件包
install-test|
link          |  符号链接包文件夹
logout        |   注销注册表
ls            |  列出安装的软件包
npm           |  JavaScript包管理器
outdated      |  检查过期的软件包
owner         |   管理包裹所有者
pack          |   从包中创建一个tarball
ping          |  Ping npm注册表
prefix        |   显示前缀
profile       |   更改注册表配置文件中的设置
prune         |   删除多余的包
publish       |  发布一个包
rebuild       |  重建一个包
repo          |  在浏览器中打开软件包存储库页面
restart       |  重新启动一个包
root          |  显示npm root
run-script    |  运行任意包脚本
search        |  搜索包
shrinkwrap    |  锁定用于发布的依赖版本
star          |   标记你最喜欢的包
stars         |   查看标记为收藏的软件包
start         |   开始一个包
stop          |   停止一个包裹
team          |   管理组织团队和团队成员
test          |   测试一个包
token         |   管理您的身份验证令牌
uninstall     |   取出一个包裹
unpublish     |   从注册表中删除一个包
update        |   更新软件包
version       |   撞包版本
view          |   查看注册表信息
whoami        |   显示npm用户名
在命令行上解析下面的短文：
- -v： --version
- -h，-?，--help，-H：--usage
- -s，--silent：--loglevel silent
- -q，--quiet：--loglevel warn
- -d： --loglevel info
- -dd，--verbose：--loglevel verbose
- -ddd： --loglevel silly
- -g： --global
- -C： --prefix
- -l： --long
- -m： --message
- -p，--porcelain：--parseable
- -reg： --registry
- -f： --force
- -desc： --description
- -S： --save
- -P： --save-prod
- -D： --save-dev
- -O： --save-optional
- -B： --save-bundle
- -E： --save-exact
- -y： --yes
- -n： --yes false
- ll和la命令：ls --long
###### 检查版本
```bash
> node -v
> npm -v
查看配置
> npm config ls -l

-v： --version
-h，-?，--help，-H：--usage
-s，--silent：--loglevel silent
-q，--quiet：--loglevel warn
-d： --loglevel info
-dd，--verbose：--loglevel verbose
-ddd： --loglevel silly
-g： --global
-C： --prefix
-l： --long
-m： --message
-p，--porcelain：--parseable
-reg： --registry
-f： --force
-desc： --description
-S： --save
-P： --save-prod
-D： --save-dev
-O： --save-optional
-B： --save-bundle
-E： --save-exact
-y： --yes
-n： --yes false
ll和la命令：ls --long

```
## 初始化
```bash
> npm init
 ``` 
要获得默认值package.json，请npm init使用--yes 或-y标志运行：
- name：当前目录名称
- version：总是 1.0.0
- description：自述文件中的信息，或者一个空字符串 ""
- main：总是 index.js
- scripts：默认情况下创建一个空的test脚本
- keywords：空的
- author：空的
- license： ISC
- bugs：来自当前目录的信息（如果存在）
- homepage：来自当前目录的信息（如果存在）

您还可以为init命令设置多个配置选项。一些有用的：
```bash
> npm set init.author.email "wombat@npmjs.com" 
> npm set init.author.name "ag_dubs"  
> npm set init.license "MIT"  
```
## <span id="installpackage">安装包</psan>
```bash
> npm install (with no args, in package dir)
> npm install [<@scope>/]<name>
> npm install [<@scope>/]<name>@<tag>
> npm install [<@scope>/]<name>@<version>
> npm install [<@scope>/]<name>@<version range>
> npm install <git-host>:<git-user>/<repo-name>
> npm install <git repo url>
> npm install <tarball file>
> npm install <tarball url>
> npm install <folder>
> npm install -g jshint 全局安装
alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```
#### 安装package.json 依赖包
``
latest除非使用该--tag选项，否则发布程序包会将标记设置为已发布的版本 。例如npm publish --tag=beta。
默认情况下npm install <pkg>（没有任何@<version>或@<tag> 说明符）安装latest标签。

默认情况下，latest标记由npm用来标识包的当前版本，并且npm install <pkg>（没有任何@<version>或者@<tag> 说明符）安装latest标签。通常情况下，项目只使用latest 稳定版本的标签，并将其他标签用于不稳定的版本，例如预发行版本。
* `npm dist-tag ls <pck>` 列出包的标签
* `npm install <name>@<tag>` 安装指定版本程序包
* `npm install --tag <tag>` 安装指定版本所有程序包
* `npm install` 安装所有程序包
* `npm install --save` 安装dependencies 下面程序包
* `npm install --save-dev` 安装devDependencies 下面程序包
* `npm install --save-optional` 安装optionalDependencies 下面程序包
* @scope 可选
* `npm install [<@scope>/]<name>@<tag>` 安装指定标签引用的包的版本。如果标签不存在于该包的注册表数据中，则将失败。

### data-tag
添加，删除和枚举包中的分发标签：
- add：为指定的标签指定版本的包，或者--tag如果未指定， 则为config。您要添加的标签是，latest并且您在验证和写入时拥有双因素身份验证，那么您需要在命令行中包含一个otp --otp。
- rm：清除软件包中不再使用的标签。
- ls：显示包的所有dist-tags，默认为当前前缀中的包。

```bash
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
aliases: dist-tags
```
## 安装依赖
* -P, --save-prod：包会出现在你的dependencies。这是默认的，除非-D或-O存在。
* -D, --save-dev：包会出现在你的devDependencies。
* -O, --save-optional：包会出现在你的optionalDependencies。
* --no-save：防止保存到dependencies。  

**当使用上述任何选项来保存package.json的依赖时，还有两个附加的可选标志**
* -E, --save-exact：保存的依赖关系将使用精确的版本进行配置，而不是使用npm的默认的semver范围运算符。
* -B, --save-bundle：保存的依赖关系也将被添加到您的bundleDependencies列表中。

**此外，如果你有一个npm-shrinkwrap.json或package-lock.json那么它也会被更新。**

## <span id="npmlink">NPM链接</span>

```bash
> npm link (in package dir)
> npm link [<@scope>/]<pkg>[@<version>]
alias: npm ln
```
如果需要require全局包，可以先npm link到local。
无论你在哪个文件夹 执行 npm link xxx , 如果没有xxx模块, 那么xxx就会先安装在全局, 然后再从全局link过来
* npm unlink 从全局包模块位置删除当前包
* npm link 在一个包文件夹中，将在全局文件夹中创建一个符号链接 ，链接到npm link执行该命令的包.如果下面有package.json 会安装文件里面的依赖
* npm link package-name 将创建一个从全局安装package-name到node_modules/ 当前文件夹的符号链接。
## 更新
```bash
> npm update [-g] [<pkg>...]
aliases: up, upgrade
>npm update <package> -g or --global 更新全局程序包
>npm update <package> --save  更新dependencies
>npm update <package> --save-dev or --dev 更新devDependencies
>npm update <package> --save-optional  更新optionalDependencies
```

### 如何更新全局包
需要版本2.6.1或更高版本。如果您使用的是旧版本，请参阅下文。
要更新全局程序包，请键入：
`npm update -g <package>`
例如，要更新一个名为jshint的包，你可以输入：
`npm update -g jshint`
要找出哪些包需要更新，请键入：
`npm outdated -g --depth=0 `
要更新所有全局包，请键入：
`npm update -g`

## 卸载
```bash
> npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]
aliases: remove, rm, r, un, unlink

> npm uninstall <package> -g or --global 卸载全局程序包。
> npm uninstall <package> --save 包将被删除dependencies。
> npm uninstall @scope/<package> --save
> npm uninstall <package> --save-dev  包将被删除devDependencies。
> npm uninstall <package> --save-optional 包将被删除optionalDependencies。
> npm uninstall <package> --no-save  包将不会从您的package.json文件中删除。
```

## <span id="viewinstallpackage">查看安装包</span>
```bash
> npm view [<@scope>/]<name>[@<version>] [<field>[.<subfield>]...]
aliases: info, show, v
```
* `npm view <package> repository.url` 显示package.json 信息
* `npm view <package>` 显示最新版本
## 搜索
```bash
npm search [-l|--long] [--json] [--parseable] [--no-description] [search terms ...]
aliases: s, se, find
```

## 查看版本
```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

'npm [-v | --version]' to print npm version
'npm view <pkg> version' to view a package's published version
'npm ls' to inspect current package/dependency versions
```
* `npm view <pkg> version` 查看包发布最新版本
* `npm view <pkg> versions` 查看包版本历史记录
* `npm ls <pck> --depth=0` 列出包所有依赖版本

#### 列出来安装的软件包
`npm ls --global --depth 0` 查看全局安装
`npm ls --dev --depth 0` 查看本地开发安装
```bash
npm ls [[<@scope>/]<pkg> ...]
aliases: list, la, ll
```
json
:  * Default: false
  * Type: Boolean
  * 以JSON格式显示信息。

long
:  * Default: false
  * Type: Boolean
  * 显示扩展的信息。

parseable
:  * Default: false
  * Type: Boolean
  * 显示可解析的输出而不是树视图。

global
:  * Default: false
  * Type: Boolean
  * 在全局安装前缀中而不是在当前项目中列出软件包。

depth
:  * Type: Int
  * 依赖关系树的最大显示深度。

prod / production
:  * Type: Boolean
  * Default: false
  * 仅显示包中的包的依赖关系树dependencies。.

dev
:  * Type: Boolean
  * Default: false
  * 仅显示包中的包的依赖关系树devDependencies。

only
:  * Type: String
  * 当“dev”或“development”，是一个别名dev。
  * 当“prod”或“production”是别名时production。

link
:  * Type: Boolean
  * Default: false
  * 仅显示链接的依赖关系

## 配置
```bash
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key>
npm config list [-l] [--json]
npm config edit
npm get <key>
npm set <key> <value> [-g|--global]
aliases: c
```
`npm config set key value` 将配置键设置为该值。如果省略了值，则将其设置为“true”
`npm config get key` 将配置值回显到stdout。
`npm config list` 显示所有的配置设置。使用-l也显示默认值。用于--json 以json格式显示设置
`npm config delete key` 从所有配置文件中删除密钥。
`npm config edit` 在编辑器中打开配置文件。使用该--global标志来编辑全局配置。

## 检查过时包
```bash
> npm outdated [[<@scope>/]<pkg> ...]
```
此命令将检查注册表以查看是否有任何（或特定）安装的软件包当前已过时。

在输出中：
wanted是满足在中指定的semver范围的软件包的最大版本package.json。如果没有可用的semver 范围（即，您正在运行npm outdated --global，或者该软件包未包含在内 package.json），则会wanted显示当前安装的版本。
latest是在注册表中标记为最新的软件包的版本。npm publish在没有特殊配置的情况下运行将以dist标签发布该软件包latest。这可能是也可能不是软件包的最大版本，也可能不是该软件包的最新发布版本，具体取决于软件包的开发人员如何管理最新的dist-tag。
location是程序包所在的依赖关系树中的哪个位置。请注意， npm outdated默认深度为0，因此除非您覆盖该深度，否则始终只会看到过时的顶级依赖项。
package type（使用--long/时-l）会告诉你这个包是a dependency还是a devDependency。未包含的软件包package.json 始终标记dependencies。
```cmd
$ npm outdated
Package      Current   Wanted   Latest  Location
glob          5.0.15   5.0.15    6.0.1  test-outdated-output
nothingness    0.0.3      git      git  test-outdated-output
npm            3.5.1    3.5.2    3.5.1  test-outdated-output
local-dev      0.0.3   linked   linked  test-outdated-output
once           1.3.2    1.3.3    1.3.3  test-outdated-output
```
配置
参数|类型|默认|描述
-|-|-|-
json|boolean|false|以JSON格式显示信息。
long|boolean|false|显示扩展的信息。
parseable|boolean|false|显示可解析的输出而不是树视图。
global|boolean|false|检查全局安装前缀中的包而不是当前项目中的包。
depth|int|0|检查依赖关系树的最大

## <span id="delpackage">删除多余的包</span>
```bash
> npm prune [[<@scope>/]<pkg>...] [--production]
```
这个命令删除“无关”的包。如果提供了一个包名称，那么只有与所提供的名称匹配的包才会被删除。
无关程序包是父程序包的依赖项列表中未列出的程序包。
如果--production标志被指定或者NODE_ENV环境变量被设置为production，这个命令将删除在你指定的包devDependencies。设置--production=false将取消NODE_ENV设置production。

## 更新NPM和NODE
清除缓存
```baseh
npm cache clear --force
```
## package配置



### 版本
有关指定版本范围的更多详细信息，请参阅semver。
```
version必须version完全匹配
>version 必须大于 version
>=version 等等
<version
<=version
~version“大致等同于版本”请参阅semver
^version“与版本兼容”请参阅semver
1.2.x 1.2.0，1.2.1等，但不是1.3.0
http://... 请参阅下面的“URLs作为依赖关系”
\* 匹配任何版本
"" （只是一个空字符串）与 *
version1 - version2和...一样>=version1 <=version2。
range1 || range2 如果满足范围1或范围2，则通过。
git... 请参阅下面的'Git URLs作为依赖关系'
user/repo 请参阅下面的'GitHub网址'
tag一个特定的版本标记并发布为tag Seenpm-dist-tag
path/path/path请参阅下面的本地路径
```
范围
A version range是一组comparators指定满足范围的版本。

A comparator由an operator和a 组成version。该原语的集合operators是：

< 少于
<= 小于或等于
> 比...更棒
>= 大于或等于
=等于。如果没有指定运算符，则假定相等，因此该运算符是可选的，但可以包含它。
例如，比较器>=1.2.7将匹配的版本 1.2.7，1.2.8，2.5.3，和1.3.9，但不是版本1.2.6 或1.1.0。

比较器可以通过空格连接起来形成一个comparator set，这可以通过它包含的所有比较器的交集来满足。

范围由一个或多个比较器集合组成，并由其连接||。当且仅当至少一个||分离的比较器组中的每个比较器都满足该版本时，版本才匹配范围。

例如，范围>=1.2.7 <1.3.0将匹配的版本 1.2.7，1.2.8和1.2.99，而不是版本1.2.6，1.3.0或1.1.0。

范围1.2.7 || >=1.2.9 <2.0.0将匹配版本1.2.7， 1.2.9和1.4.6，但不是版本1.2.8或2.0.0。

预发标签
如果一个版本有一个预发布标签（例如1.2.3-alpha.3），那么只有至少有一个具有相同[major, minor, patch]元组的比较器也有一个预发布标签时，它才会被允许满足比较器集。

例如，虽然技术上根据SemVer排序规则“大于” ，但范围>1.2.3-alpha.3将被允许​​与版本匹配1.2.3-alpha.7，但不能满足 该范围。版本范围只接受版本上的预发布标签。该版本将满足范围，因为它没有预售标志，并且大于。3.4.5-alpha.93.4.5-alpha.91.2.3-alpha.31.2.33.4.5 3.4.51.2.3-alpha.7

这种行为的目的是双重的。首先，预发布版本经常更新得非常快，并包含许多（作者的设计）尚未适合公共消费的重大更改。因此，默认情况下，它们被排除在范围匹配语义之外。

其次，选择使用预发布版本的用户已明确表示有意使用该特定版本的alpha / beta / rc版本。通过在该范围内包含预发行标签，用户表示他们意识到了风险。但是，假定他们选择在下一套预发布版本中选择承担类似风险仍然不合适。

售前标识符
该方法.inc接受一个额外的identifier字符串参数，它将把字符串的值附加为预发布标识符：

semver 。inc （' 1.2.3 '，' prerelease '，' beta '）  
//  '1.2.4-beta.0'
命令行示例：

$ semver 1.2.3 -i prerelease --preid beta
1.2.4-beta.0
然后可以用来进一步增加：

$ semver 1.2.4-beta.0 -i prerelease
1.2.4-beta.1
高级范围语法
高级范围语法以确定性方式向基本比较器发布。

高级范围可以与使用空格或者空格的基本比较器相同的方式进行组合||。

连字符的范围 X.Y.Z - A.B.C
指定一个包含集。

1.2.3 - 2.3.4 ：= >=1.2.3 <=2.3.4
如果部分版本是作为包含范围中的第一个版本提供的，那么将缺少的部分替换为零。

1.2 - 2.3.4 ：= >=1.2.0 <=2.3.4
如果部分版本是作为包含范围中的第二个版本提供的，则所有以该元组的提供部分开头的版本都将被接受，但没有比提供的元组部分更大的版本。

1.2.3 - 2.3 ：= >=1.2.3 <2.4.0
1.2.3 - 2 ：= >=1.2.3 <3.0.0
X-范围 1.2.x 1.X 1.2.* *
任何“ X，x”或“ *可以用于”代表[major, minor, patch]元组中的一个数值。

*：= >=0.0.0（任何版本满足）
1.x：= >=1.0.0 <2.0.0（匹配主版本）
1.2.x：= >=1.2.0 <1.3.0（匹配主要和次要版本）
部分版本范围被视为X范围，所以特殊字符实际上是可选的。

""（空字符串）：= *：=>=0.0.0
1：= 1.x.x：=>=1.0.0 <2.0.0
1.2：= 1.2.x：=>=1.2.0 <1.3.0
蒂尔德山脉 ~1.2.3 ~1.2 ~1
如果在比较器上指定了次要版本，则允许修补程序级别的更改。如果不是，允许轻微更改。

~1.2.3：= >=1.2.3 <1.(2+1).0：=>=1.2.3 <1.3.0
~1.2：= >=1.2.0 <1.(2+1).0：= >=1.2.0 <1.3.0（相同1.2.x）
~1：= >=1.0.0 <(1+1).0.0：= >=1.0.0 <2.0.0（相同1.x）
~0.2.3：= >=0.2.3 <0.(2+1).0：=>=0.2.3 <0.3.0
~0.2：= >=0.2.0 <0.(2+1).0：= >=0.2.0 <0.3.0（相同0.2.x）
~0：= >=0.0.0 <(0+1).0.0：= >=0.0.0 <1.0.0（相同0.x）
~1.2.3-beta.2：= >=1.2.3-beta.2 <1.3.0请注意1.2.3，如果版本大于或等于，则版本中的预售版将被允许beta.2。所以，1.2.3-beta.4会被允许，但 1.2.4-beta.2不会，因为它是一个不同[major, minor, patch]元组的预发布。
Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4
允许修改不会修改[major, minor, patch]元组中最左边的非零数字 。换句话说，这允许版本的补丁和次要更新1.0.0及以上，对版本补丁更新0.X >=0.1.0，并没有对版本的更新0.0.X。

许多作者认为0.x版本x是主要的“突破性”指标。

插入符范围是理想的，当一个作家可能会使之间的重大更改0.2.4和0.3.0释放，这是一种常见的做法。但是，它假定在和之间不会发生突变 。根据通常观察到的做法，它允许推测为加性（但不破坏）的变化。0.2.40.2.5

^1.2.3 ：= >=1.2.3 <2.0.0
^0.2.3 ：= >=0.2.3 <0.3.0
^0.0.3 ：= >=0.0.3 <0.0.4
^1.2.3-beta.2：= >=1.2.3-beta.2 <2.0.0请注意1.2.3，如果版本大于或等于，则版本中的预售版将被允许beta.2。所以，1.2.3-beta.4会被允许，但 1.2.4-beta.2不会，因为它是一个不同[major, minor, patch]元组的预发布。
^0.0.3-beta：= >=0.0.3-beta <0.0.4 注意的是，在prereleases 0.0.3版本只将被允许，如果他们是大于或等于beta。所以，0.0.3-pr.2会被允许的。
解析插入符号范围时，缺失patch值会解除数字0，但会在该值范围内提供灵活性，即使主要版本和次要版本都兼容0。

^1.2.x ：= >=1.2.0 <2.0.0
^0.0.x ：= >=0.0.0 <0.1.0
^0.0 ：= >=0.0.0 <0.1.0
即使主要版本为零，缺失值minor和patch值也会解除为零，但也允许在这些值内具有灵活性。

^1.x ：= >=1.0.0 <2.0.0
^0.x ：= >=0.0.0 <1.0.0
