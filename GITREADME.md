# git
- [创建仓库](#创建仓库)
- [提交](#提交)
- [提交更新](#提交更新)
- [忽略文件](#忽略文件)
- [分支](#分支)
- [远程分支](#远程分支)
- [fetch](#fetch)
- [远程仓库](#远程仓库)
- [标签](#git-标签)

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
```bash
git clone [--template=<template_directory>]
	  [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
	  [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
	  [--dissociate] [--separate-git-dir <git dir>]
	  [--depth <depth>] [--[no-]single-branch] [--no-tags]
	  [--recurse-submodules[=<pathspec>]] [--[no-]shallow-submodules]
	  [--jobs <n>] [--] <repository> [<directory>]
```
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
指定分支:
```bash
git clone <-b|--branch> barnchName <repo> [directory]
```
## Git 标签

### 打标签
像其他版本控制系统（VCS）一样，Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）。 在本节中，你将会学习如何列出已有的标签、如何创建新标签、以及不同类型的标签分别是什么。

### 列出标签
在 Git 中列出已有的标签是非常简单直观的。 只需要输入 git tag：

$ git tag
v0.1
v1.3
这个命令以字母顺序列出标签；但是它们出现的顺序并不重要。

你也可以使用特定的模式查找标签。 例如，Git 自身的源代码仓库包含标签的数量超过 500 个。 如果只对 1.8.5 系列感兴趣，可以运行：
```bash
$ git tag -l 'v1.8.5*'
v1.8.5
v1.8.5-rc0
v1.8.5-rc1
v1.8.5-rc2
v1.8.5-rc3
v1.8.5.1
v1.8.5.2
v1.8.5.3
v1.8.5.4
v1.8.5.5
```
### 创建标签
Git 使用两种主要类型的标签：轻量标签（lightweight）与附注标签（annotated）。

一个轻量标签很像一个不会改变的分支 - 它只是一个特定提交的引用。

然而，附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；并且可以使用 GNU Privacy Guard （GPG）签名与验证。 通常建议创建附注标签，这样你可以拥有以上所有信息；但是如果你只是想用一个临时的标签，或者因为某些原因不想要保存那些信息，轻量标签也是可用的。

### 附注标签
在 Git 中创建一个附注标签是很简单的。 最简单的方式是当你在运行 tag 命令时指定 -a 选项：
```bash
$ git tag -a v1.4 -m 'my version 1.4'
$ git tag
v0.1
v1.3
v1.4
```
-m 选项指定了一条将会存储在标签中的信息。 如果没有为附注标签指定一条信息，Git 会运行编辑器要求你输入信息。

通过使用 git show 命令可以看到标签信息与对应的提交信息：
```bash
$ git show v1.4
tag v1.4
Tagger: Ben Straub <ben@straub.cc>
Date:   Sat May 3 20:19:12 2014 -0700

my version 1.4

commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```
输出显示了打标签者的信息、打标签的日期时间、附注信息，然后显示具体的提交信息。

### 轻量标签
另一种给提交打标签的方式是使用轻量标签。 轻量标签本质上是将提交校验和存储到一个文件中 - 没有保存任何其他信息。 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：
```bash
$ git tag v1.4-lw
$ git tag
v0.1
v1.3
v1.4
v1.4-lw
v1.5
```
这时，如果在标签上运行 git show，你不会看到额外的标签信息。 命令只会显示出提交信息：
```bash
$ git show v1.4-lw
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```
### 后期打标签
你也可以对过去的提交打标签。 假设提交历史是这样的：
```bash
$ git log --pretty=oneline
15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
4682c3261057305bdd616e23b64b0857d832627b added a todo file
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```
现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “`updated rakefile`” 提交。 你可以在之后补上标签。 要在那个提交上打标签，你需要在命令的末尾指定提交的校验和（或部分校验和）:
```bash
$ git tag -a v1.2 9fceb02
```
可以看到你已经在那次提交上打上标签了：
```bash
$ git tag
v0.1
v1.2
v1.3
v1.4
v1.4-lw
v1.5

$ git show v1.2
tag v1.2
Tagger: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Feb 9 15:32:16 2009 -0800

version 1.2
commit 9fceb02d0ae598e95dc970b74767f19372d61af8
Author: Magnus Chacon <mchacon@gee-mail.com>
Date:   Sun Apr 27 20:43:35 2008 -0700

    updated rakefile
...
```
### 共享标签
默认情况下，`git push` 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。 这个过程就像共享远程分支一样 - 你可以运行 `git push origin [tagname]`。
```bash
$ git push origin v1.5
Counting objects: 14, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (14/14), 2.05 KiB | 0 bytes/s, done.
Total 14 (delta 3), reused 0 (delta 0)
To git@github.com:schacon/simplegit.git
 * [new tag]         v1.5 -> v1.5
 ```
如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。 这将会把所有不在远程仓库服务器上的标签全部传送到那里。
```bash
$ git push origin --tags
Counting objects: 1, done.
Writing objects: 100% (1/1), 160 bytes | 0 bytes/s, done.
Total 1 (delta 0), reused 0 (delta 0)
To git@github.com:schacon/simplegit.git
 * [new tag]         v1.4 -> v1.4
 * [new tag]         v1.4-lw -> v1.4-lw
 ```
现在，当其他人从仓库中克隆或拉取，他们也能得到你的那些标签。

### 检出标签
在 Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。 如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 `git checkout -b [branchname] [tagname]` 在特定的标签上创建一个新分支：
```bash
$ git checkout -b version2 v2.0.0
Switched to a new branch 'version2'
```
当然，如果在这之后又进行了一次提交，version2 分支会因为改动向前移动了，那么 version2 分支就会和 v2.0.0 标签稍微有些不同，这时就应该当心了。

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

**glob 语法：**
```“Globs”是你ls *.js在命令行中输入内容时所键入的模式，或者放在build/*一个.gitignore文件中。
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
```

**文件 .gitignore 的格式规范如下：**
- 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
- 匹配模式可以以（/）开头防止递归。
- 匹配模式可以以（/）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

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
## 提交
**检查当前文件状态**
要查看哪些文件处于什么状态，可以用 git status 命令。 如果在克隆仓库后立即使用此命令，会看到类似这样的输出：
```bash
$ git status
```
**跟踪新文件**
使用命令 git add 开始跟踪一个文件。 所以，要跟踪 README 文件，运行：
```bash
$ git add README
```
**状态简览**
`git status` 命令的输出十分详细，但其用语有些繁琐。 如果你使用 `git status -s` 命令或 `git status --short` 命令，你将得到一种更为紧凑的格式输出。 运行 `git status -s` ，状态报告输出如下：
## 忽略文件
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以创建一个名为 `.gitignore` 的文件，列出要忽略的文件模式。 来看一个实际的例子：
```txt
$ cat .gitignore
*.[oa]
*~
```
文件 .gitignore 的格式规范如下：

所有空行或者以 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
- 匹配模式可以以（/）开头防止递归。
- 匹配模式可以以（/）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。 星号（*）匹配零个或多个任意字符；[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）。 使用两个星号（*) 表示匹配任意中间目录，比如`a/**/z` 可以匹配 a/z, a/b/z 或 `a/b/c/z`等。
**glob 语法**

“Globs”是你ls *.js在命令行中输入内容时所键入的模式，或者放在build/*一个.gitignore文件中。
在解析路径部分模式之前，支撑部分被扩展为一个集合。带括号的部分以任何数量的以逗号分隔的部分开始{和结束}。支撑部分可能包含斜线字符，所以a{/b/c,bcd}会扩展成a/b/c和abcd。
以下字符在路径部分使用时具有特殊的魔法含义：
```
* 匹配单个路径部分中的0个或更多个字符
? 匹配1个字符
[...]匹配一系列字符，与RegExp范围类似。如果范围的第一个字符是!或^然后它匹配任何不在范围内的字符。
!(pattern|pattern|pattern) 匹配任何不符合提供的任何模式的东西。
?(pattern|pattern|pattern) 匹配提供的模式零次或一次。
+(pattern|pattern|pattern) 匹配一个或多个出现的模式。
*(a|b|c) 匹配零次或多次出现的模式
@(pattern|pat*|pat?erN) 完全匹配提供的模式之一
**如果“globstar”在路径部分单独存在，则匹配零个或多个目录和搜索匹配的子目录。它不抓取符号链接的目录。
 ```

**查看已暂存和未暂存的修改**
查看已暂存
```bash
$ git status
```
未暂存的修改
```bash
$ git diff
```
若要查看已暂存的将要添加到下次提交里的内
```bash
git diff --cached 
```
## 提交更新
现在的暂存区域已经准备妥当可以提交了。 在此之前，请一定要确认还有什么修改过的或新建的文件还没有 `git add` 过，否则提交的时候不会记录这些还没暂存起来的变化。 这些修改过的文件只保留在本地磁盘。 所以，每次准备提交前，先用 `git status `看下，是不是都已暂存起来了， 然后再运行提交命令 `git commit`：
```bash
$ git commit -m 'mess'
```
**跳过使用暂存区域**
尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。 Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 `git commit` 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：
```bash
git commit -a -m 'ff'
```
**移除文件**
git rm 命令后面可以列出文件或者目录的名字，也可以使用 glob 模式。 比方说：
```bash
$ git rm log/\*.log
```
注意到星号 * 之前的反斜杠 \， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 log/ 目录下扩展名为 .log 的所有文件。 类似的比如：
```bash
$ git rm \*~
```
该命令为删除以 ~ 结尾的所有文件。
```bash
git rm PROJECTS.md
git rm <filename> -f   如果删除之前修改过并且已经放到暂存区域的话
git rm --cached README 移除暂存区
```
**移动文件**
```bash
$ git mv file_from file_to
```
**撤销操作**
```bash
git commit --amend
```
## 分支
基本命令
```bash
git branch -all
git branch --list 
git branch --remotes
```
**创建**
创建分支，并检出设为当前分支
```bash
git checkout -b branchname
```
它是下面两条命令的简写：
```bash
$ git branch iss53
$ git checkout iss53
```
把当前分支添加到远程仓库并设置为本地分支跟踪远程分支
```bash
git push -u origin branchname 
```
**删除分支**
```bash
$ git branch -d hotfix
```
**分支的合并**
```bash
git checkout master
git merge <branchname>

git mergetool
```
## 远程分支

**推送**
当你想要公开分享一个分支时，需要将其推送到有写入权限的远程仓库上。 本地的分支并不会自动与远程仓库同步 - 你必须显式地推送想要分享的分支。 这样，你就可以把不愿意分享的内容放到私人分支上，而将需要和别人协作的内容推送到公开分支。

如果希望和别人一起在名为 serverfix 的分支上工作，你可以像推送第一个分支那样推送它。 运行 `git push (remote) (branch)`:
```bash
$ git push origin serverfix
Counting objects: 24, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (24/24), 1.91 KiB | 0 bytes/s, done.
Total 24 (delta 2), reused 0 (delta 0)
To https://github.com/schacon/simplegit
 * [new branch]      serverfix -> serverfix
```
这里有些工作被简化了。 Git 自动将 serverfix 分支名字展开为 refs/heads/serverfix:refs/heads/serverfix，那意味着，“推送本地的 serverfix 分支来更新远程仓库上的 serverfix 分支。” 我们将会详细学习 Git 内部原理 的 refs/heads/ 部分，但是现在可以先把它放在儿。 你也可以运行 `git push origin serverfix:serverfix`，它会做同样的事 - 相当于它说，“推送本地的 serverfix 分支，将其作为远程仓库的 serverfix 分支” 可以通过这种格式来推送本地分支到一个命名不相同的远程分支。 如果并不想让远程仓库上的分支叫做 serverfix，可以运行 `git push origin serverfix:awesomebranch` 来将本地的 serverfix 分支推送到远程仓库上的 awesomebranch 分支。
```txt
Note
如何避免每次输入密码
如果你正在使用 HTTPS URL 来推送，Git 服务器会询问用户名与密码。
默认情况下它会在终端中提示服务器是否允许你进行推送。

如果不想在每一次推送时都输入用户名与密码，你可以设置一个 “credential cache”。
最简单的方式就是将其保存在内存中几分钟，
可以简单地运行 git config --global credential.helper cache 来设置它。
```

想要了解更多关于不同验证缓存的可用选项，查看 凭证存储。
**创建分支，并跟踪远程分支。**
从一个远程跟踪分支检出一个本地分支会自动创建一个叫做 “跟踪分支”（有时候也叫做 “上游分支”）。 跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 git pull，Git 能自动地识别去哪个服务器上抓取、合并到哪个分支。

当克隆一个仓库时，它通常会自动地创建一个跟踪 origin/master 的 master 分支。 然而，如果你愿意的话可以设置其他的跟踪分支 - 其他远程仓库上的跟踪分支，或者不跟踪 master 分支。 最简单的就是之前看到的例子，运行 `git checkout -b [branch] [remotename]/[branch]`。 这是一个十分常用的操作所以 Git 提供了 --track 快捷方式：
```bash
$ git checkout -b [branch] [remotename]/[branch]
$ git checkout --track origin/serverfix 
Branch serverfix set up to track remote branch serverfix from origin.
Switched to a new branch 'serverfix'
```
如果想要将本地分支与远程分支设置为不同名字，你可以轻松地增加一个不同名字的本地分支的上一个命令：
```bash
$ git checkout -b sf origin/serverfix
Branch sf set up to track remote branch serverfix from origin.
Switched to a new branch 'sf'
```
现在，本地分支 sf 会自动从 origin/serverfix 拉取。

设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支，你可以在任意时间使用 -u 或 --set-upstream-to 选项运行 git branch 来显式地设置。
```bash
$ git branch -u origin/serverfix
Branch serverfix set up to track remote branch serverfix from origin.
```
**查看分支信息**
如果想要查看设置的所有跟踪分支，可以使用 git branch 的 -vv 选项。 这会将所有的本地分支列出来并且包含更多的信息，如每一个分支正在跟踪哪个远程分支与本地分支是否是领先、落后或是都有。
```bash
$ git branch -vv
  iss53     7e424c3 [origin/iss53: ahead 2] forgot the brackets
  master    1ae2a45 [origin/master] deploying index fix
* serverfix f8674d9 [teamone/server-fix-good: ahead 3, behind 1] this should do it
  testing   5ea463a trying something new
```
**删除远程分支**
假设你已经通过远程分支做完所有的工作了 - 也就是说你和你的协作者已经完成了一个特性并且将其合并到了远程仓库的 master 分支（或任何其他稳定代码分支）。 可以运行带有 --delete 选项的 git push 命令来删除一个远程分支。 如果想要从服务器上删除 serverfix 分支，运行下面的命令：
```bash
$ git push origin --delete serverfix
To https://github.com/schacon/simplegit
 - [deleted]         serverfix
```
基本上这个命令做的只是从服务器上移除这个指针。 Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的

## fetch
更新
```bash
git fetch origin
git fetch origin/dev
git fetch [<options>] [<repository> [<refspec>…​]]
git fetch [<options>] <group>
git fetch --multiple [<options>] [(<repository> | <group>)…​]
git fetch --all [<options>]
```
合并
```bash
git merge origin/dev
```
## 远程仓库
**获取克隆远程仓库**
```bash
$ git clone https://github.com/schacon/ticgit
```
你也可以指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。
```bash
$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
```
**添加远程仓库**
我在之前的章节中已经提到并展示了如何添加远程仓库的示例，不过这里将告诉你如何明确地做到这一点。 运行 `git remote add <shortname> <url>` 添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写：
```bash
git remote
origin
$ git remote add pb https://github.com/paulboone/ticgit
$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
pb	https://github.com/paulboone/ticgit (fetch)
pb	https://github.com/paulboone/ticgit (push)
```
现在你可以在命令行中使用字符串 pb 来代替整个 URL。 例如，如果你想拉取 Paul 的仓库中有但你没有的信息，可以运行 git fetch pb：
```bash
$ git fetch pb
remote: Counting objects: 43, done.
remote: Compressing objects: 100% (36/36), done.
remote: Total 43 (delta 10), reused 31 (delta 5)
Unpacking objects: 100% (43/43), done.
From https://github.com/paulboone/ticgit
 * [new branch]      master     -> pb/master
 * [new branch]      ticgit     -> pb/ticgit
```
**从远程仓库中抓取与拉取**
就如刚才所见，从远程仓库中获得数据，可以执行：
```bash
$ git fetch [remote-name]
```
这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，`git fetch origin` 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 git fetch 命令会将数据拉取到你的本地仓库 - 它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

如果你有一个分支设置为跟踪一个远程分支（阅读下一节与 Git 分支 了解更多信息），可以使用 git pull 命令来自动的抓取然后合并远程分支到当前分支。 这对你来说可能是一个更简单或更舒服的工作流程；默认情况下，`git clone `命令会自动设置本地 master 分支跟踪克隆的远程仓库的 master 分支（或不管是什么名字的默认分支）。 运行` git pull` 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。
**推送到远程仓库**
当你想分享你的项目时，必须将其推送到上游。 这个命令很简单：`git push [remote-name] [branch-name]`。 当你想要将 master 分支推送到 origin 服务器时（再次说明，克隆时通常会自动帮你设置好那两个名字），那么运行这个命令就可以将你所做的备份到服务器：
```bash
$ git push origin master
```
**查看远程仓库**
```bash
git remote show origin
```
**远程仓库的移除与重命名**
如果想要重命名引用的名字可以运行 git remote rename 去修改一个远程仓库的简写名。 例如，想要将 pb 重命名为 paul，可以用 git remote rename 这样做：
```bash
$ git remote rename pb paul
$ git remote
origin
paul
```
值得注意的是这同样也会修改你的远程分支名字。 那些过去引用 pb/master 的现在会引用 paul/master。

如果因为一些原因想要移除一个远程仓库 - 你已经从服务器上搬走了或不再想使用某一个特定的镜像了，又或者某一个贡献者不再贡献了 - 可以使用 `git remote rm` ：
```bash
$ git remote rm paul
$ git remote
origin
```