# git
- [创建仓库](#创建仓库)


## 创建仓库

本章节我们将为大家介绍如何创建一个 Git 仓库。

你可以使用一个已经存在的目录作为Git仓库。

## git init

Git 使用 git init 命令来初始化一个 Git 仓库，Git 的很多命令都需要在 Git 的仓库中运行，所以 git init 是使用 Git 的第一个命令。

在执行完成 git init 命令后，Git 仓库会生成一个 .git 目录，该目录包含了资源的所有元数据，其他的项目目录保持不变（不像 SVN 会在每个子目录生成 .svn 目录，Git 只在仓库的根目录生成 .git 目录）。

使用方法
使用当前目录作为Git仓库，我们只需使它初始化。
```bash
git init
```
该命令执行完后会在当前目录生成一个 .git 目录。

使用我们指定目录作为Git仓库。
```bash
git init newrepo
```
初始化后，会在 newrepo 目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

如果当前目录下有几个文件想要纳入版本控制，需要先用 git add 命令告诉 Git 开始对这些文件进行跟踪，然后提交：
```bash
$ git add *.c
$ git add README
$ git commit -m '初始化项目版本'
```
以上命令将目录下以 .c 结尾及 README 文件提交到仓库中。

## git clone

我们使用 git clone 从现有 Git 仓库中拷贝项目（类似 svn checkout）。

克隆仓库的命令格式为：
```bash
git clone <repo>
```
如果我们需要克隆到指定的目录，可以使用以下命令格式：
```bash
git clone <repo> <directory>
```
参数说明：

- repo:Git 仓库。
- directory:本地目录。
比如，要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令：
```bash
$ git clone git://github.com/schacon/grit.git
```
执行该命令后，会在当前目录下创建一个名为grit的目录，其中包含一个 .git 的目录，用于保存下载下来的所有版本记录。

如果要自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：
```bash
$ git clone git://github.com/schacon/grit.git mygrit
```
## Git 标签
如果你达到一个重要的阶段，并希望永远记住那个特别的提交快照，你可以使用 git tag 给它打上标签。

比如说，我们想为我们的 runoob 项目发布一个"1.0"版本。 我们可以用 git tag -a v1.0 命令给最新一次提交打上（HEAD）"v1.0"的标签。

-a 选项意为"创建一个带注解的标签"。 不用 -a 选项也可以执行的，但它不会记录这标签是啥时候打的，谁打的，也不会让你添加个标签的注解。 我推荐一直创建带注解的标签。
```
$ git tag -a v1.0 
```
当你执行 git tag -a 命令时，Git 会打开你的编辑器，让你写一句标签注解，就像你给提交写注解一样。

现在，注意当我们执行 git log --decorate 时，我们可以看到我们的标签了：
```bash
$ git log --oneline --decorate --graph
*   88afe0e (HEAD, tag: v1.0, master) Merge branch 'change_site'
|\  
| * d7e7346 (change_site) changed the site
* | 14b4dca 新增加一行
|/  
* 556f0a0 removed test2.txt
* 2e082b7 add test2.txt
* 048598f add test.txt
* 85fc7e7 test comment from runoob.com
```
如果我们忘了给某个提交打标签，又将它发布了，我们可以给它追加标签。

例如，假设我们发布了提交 85fc7e7(上面实例最后一行)，但是那时候忘了给它打标签。 我们现在也可以：
```bash
$ git tag -a v0.9 85fc7e7
$ git log --oneline --decorate --graph
*   88afe0e (HEAD, tag: v1.0, master) Merge branch 'change_site'
|\  
| * d7e7346 (change_site) changed the site
* | 14b4dca 新增加一行
|/  
* 556f0a0 removed test2.txt
* 2e082b7 add test2.txt
* 048598f add test.txt
* 85fc7e7 (tag: v0.9) test comment from runoob.com
```
如果我们要查看所有标签可以使用以下命令：
```bash
$ git tag
v0.9
v1.0
```
指定标签信息命令：
```bash
git tag -a <tagname> -m "runoob.com标签"
```
PGP签名标签命令：
```bash
git tag -s <tagname> -m "runoob.com标签"
```
 Git 查看提交历史 Git 远程仓库(Github) 
### 笔记列表
   宋某人c

  sya***g@iroogoo.com

#### 1、标签介绍

发布一个版本时，我们通常先在版本库中打一个标签（tag），这样就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。

所以，标签也是版本库的一个快照。

Git 的标签虽然是版本库的快照，但其实它就是指向某个 commit 的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。
```
Git有commit，为什么还要引入tag？
"请把上周一的那个版本打包发布，commit号是6a5819e…"
"一串乱七八糟的数字不好找！"
如果换一个办法：
"请把上周一的那个版本打包发布，版本号是v1.2"
"好的，按照tag v1.2查找commit就行！"
所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。
```
同大多数 VCS 一样，Git 也可以对某一时间点上的版本打上标签。人们在发布某个软件版本（比如 v1.0 等等）的时候，经常这么做。

本节我们一起来学习如何列出所有可用的标签，如何新建标签，以及各种不同类型标签之间的差别。

### 新建标签
Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated）。

轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。

而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。

一般我们都建议使用含附注型的标签，以便保留相关信息；

当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

#### 2 创建标签
```bash
[root@Git git]# git tag v1.0
3 查看已有标签
[root@Git git]# git tag
v1.0
[root@Git git]# git tag v1.1
[root@Git git]# git tag
v1.0
v1.1
```
#### 4 删除标签
```bash
[root@Git git]# git tag -d v1.1
Deleted tag ‘v1.1’ (was 91388f0)
[root@Git git]# git tag
v1.0
```
#### 5 查看此版本所修改的内容
```bash
[root@Git git]# git show v1.0
commit 91388f0883903ac9014e006611944f6688170ef4
Author: "syaving" <"819044347@qq.com">
Date: Fri Dec 16 02:32:05 2016 +0800
commit dir
diff –git a/readme b/readme
index 7a3d711..bfecb47 100644
— a/readme
+++ b/readme
@@ -1,2 +1,3 @@
text
hello git
+use commit
[root@Git git]# git log –oneline
91388f0 commit dir
e435fe8 add readme
2525062 add readme
```
## git忽略文件
```cpp
# 此为注释 – 将被 Git 忽略
1）配置语法：
以斜杠“/”开头表示目录；
以星号“*”通配多个字符；
以问号“?”通配单个字符
以方括号“[]”包含单个字符的匹配列表；
以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；

*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```
## 模式
```
空行不匹配任何文件，所以它可以作为可读性的分隔符。

以＃开头的行作为注释。将一个反斜杠（“ \”）放在第一个散列的前面，以散列开始的模式。

尾部空格将被忽略，除非用反斜杠（“ \”）引用。

一个可选的前缀“ !”，否定模式; 任何先前模式排除的匹配文件将再次包含在内。如果排除该文件的父目录，则不可能重新包含文件。由于性能的原因，Git没有列出排除的目录，所以包含文件的任何模式都不起作用，不管它们在哪里定义。\在第一个“ !”之前放置一个反斜杠（“ ”），用于以“ ”开始的模式，!例如“ \!important!.txt”。

如果模式以斜线结尾，则为了以下描述的目的将其移除，但是它只能找到与目录匹配的内容。换句话说，foo/将匹配一个目录foo和下面的路径，但不匹配一个普通的文件或符号链接foo（这与在Git中通常如何工作的方式是一致的）。

如果模式不包含斜杠/，Git会将其视为shell glob模式，并检查与.gitignore文件位置相关的路径名（如果不是来自.gitignore文件，则相对于工作树顶层）的 匹配。

否则，Git会将该模式视为适合fnmatch（3）与FNM_PATHNAME标志一起使用的shell glob：模式中的通配符不会与路径名中的/匹配。例如，“Documentation / *。html”匹配“Documentation / git.html”，但不匹配“Documentation / ppc / ppc.html”或“tools / perf / Documentation / perf.html”。

前导斜杠匹配路径名的开头。例如，“/*.c”与“cat-file.c”匹配，但不匹配“mozilla-sha1 / sha1.c”。

**与全路径匹配的模式中的两个连续的星号（“ ”）可能具有特殊的含义：

前面的“ **”后跟一个斜杠表示所有目录匹配。例如，“ **/foo”与文件或目录“ ”相匹配foo，与模式“ foo” 相同。“ **/foo/bar”与bar直接位于目录“ foo” 下的任何地方匹配文件或目录“ ”。

尾随“ /**”匹配内部的一切。例如，“ abc/**”匹配文件abc位置相对于目录“ ” 内的所有.gitignore文件，具有无限深度。

斜杠后跟两个连续的星号，则斜线匹配零个或多个目录。例如，“ a/**/b”匹配“ a/b”，“ a/x/b”，“ a/x/y/b”等。

其他连续的星号被认为是无效的。
```