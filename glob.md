## 通配符插件
- glob
- globby
- micromatch




### glob

“Globs”是你ls *.js在命令行中输入内容时所键入的模式，或者放在build/*一个.gitignore文件中。
在解析路径部分模式之前，支撑部分被扩展为一个集合。带括号的部分以任何数量的以逗号分隔的部分开始{和结束}。支撑部分可能包含斜线字符，所以a{/b/c,bcd}会扩展成a/b/c和abcd。
以下字符在路径部分使用时具有特殊的魔法含义：
* 匹配单个路径部分中的0个或更多个字符
? 匹配1个字符
[...]匹配一系列字符，与RegExp范围类似。如果范围的第一个字符是!或^然后它匹配任何不在范围内的字符。
!(pattern|pattern|pattern) 匹配任何不符合提供的任何模式的东西。
?(pattern|pattern|pattern) 匹配提供的模式零次或一次。
+(pattern|pattern|pattern) 匹配一个或多个出现的模式。
*(a|b|c) 匹配零次或多次出现的模式
@(pattern|pat*|pat?erN) 完全匹配提供的模式之一
**如果“globstar”在路径部分单独存在，则匹配零个或多个目录和搜索匹配的子目录。它不抓取符号链接的目录。

### globby
只是一个快速的概述。

* 匹配任意数量的字符，但不匹配 /
? 匹配单个字符，但不匹配 /
**匹配任意数量的字符，包括/，只要它是路径部分中唯一的东西
{} 允许以逗号分隔的“或”表达式列表
! 在模式的开头将否定匹配
各种模式和预期的匹配。

有关
multimatch - 匹配列表而不是文件系统
matcher - 简单的通配符匹配
del - 删除文件和目录
make-dir - 如果需要，创建一个目录及其父目录


###  micromatch
为什么要使用micromatch？
micromatch是一个下拉更换为minimatch和multimatch

支持所有的相同的匹配特征minimatch和multimatch
Micromatch使用snapdragon进行解析和编译globs，以易于理解，推理和维护的方式对整个转换过程进行精细控制。
比minimatch更精确的匹配，超过36,000个测试断言来证明它。
比minimatch和multimatch更完整地支持Bash 4.3规范。事实上，micromatch 从bash 传递了所有规范测试，包括一些bash仍然失败的测试。
通过优化的glob模式，更快的算法和正则表达式缓存的组合，更快地进行匹配。
Micromatch更安全，不受带有支撑图案的DoS的影响，如minimatch和multimatch。
比minimatch和multimatch更可靠的窗口支持。

匹配功能
支持多个glob模式（不需要像multimatch这样的包装器）
通配符（**，*.js）
否定（'!a/*.js'，'*!(b).js']）
extglobs（+(x|y)，!(a|b)）
POSIX字符类（[[:alpha:][:digit:]]）
支撑扩展（foo/{1..5}.md，bar/{a,b,c}.js）
正则表达式字符类（foo-[1-5].js）
正则表达式逻辑“或”（foo/(abc|xyz).js）

Support for multiple glob patterns (no need for wrappers like multimatch)
Wildcards (**, *.js)
Negation ('!a/*.js', '*!(b).js'])
extglobs (+(x|y), !(a|b))
POSIX character classes ([[:alpha:][:digit:]])
brace expansion (foo/{1..5}.md, bar/{a,b,c}.js)
regex character classes (foo-[1-5].js)
regex logical "or" (foo/(abc|xyz).js)

