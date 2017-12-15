GitHub中README.MD的使用
[转载自]:http://blogread.cn/it/article/7333?f=hot1&utm_source=tuicool&utm_medium=referral

GitHub中的README文件，使用markdown格式的文件。这种文件语法比较简单，特别容易上手。

Markdown的语法简洁明了、学习容易，而且功能比纯文本更强，因此有很多人用它写博客。世界上最流行的博客平台WordPress和大型CMS如joomla、drupal都能很好的支持Markdown。

下面简单介绍下相关语法：

大标题：
====

大标题一般显示工程名,你只要在标题下面跟上=====即可（“=”个数无限制）

中标题：
---

中标题一般显示重点项,你只要在标题下面输入——即可（“-”个数无限制）

小标题：

小标题的格式如下 ### 小标题，注意#和标题字符中间要有空格

也可以使用1到6个“#”来表示六级标题：

# 这是 H1
## 这是 H2
### 这是 H3
#### 这是 H4
##### 这是 H5
###### 这是 H6

斜体：

可以使用* 或 _ 包围文字，例如*Hello World*

加粗：

用两个 * 或 _ 包起来的话，达到加粗字体的左右，例如**Hello Markdown**

如果你的 * 和 _ 两边都有空白的话，它们就只会被当成普通的符号

单行文本框：

只要两个Tab再输入文字即可                               
        
    单行      

多行文本框：

你可以写入代码等,每行文字只要输入两个Tab再输入文字即可

    多行
    多行

引用：

> 这是一个有两段文字的引用,
> 无意义的占行文字1.
> 无意义的占行文字2.
> 
> 无意义的占行文字3.
> 无意义的占行文字4.

多层引用
>>> 请问 Markdwon 怎么用？ - 小白

>> 自己看教程！ - 愤青

> 教程在哪？ - 小白

### 列表：

无序列表
使用 *，+，- 表示无序列表。

- 无序列表项 一
- 无序列表项 二
- 无序列表项 三

有序列表

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三


定义型列表

Markdown
:   轻量级文本标记语言，可以转换成html，pdf等格式（左侧有一个可见的冒号和四个不可见的空格

代码块 2
:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）
        代码块（左侧有八个不可见的空格）

列表缩进

*   轻轻的我走了， 正如我轻轻的来； 我轻轻的招手， 作别西天的云彩。
那河畔的金柳， 是夕阳中的新娘； 波光里的艳影， 在我的心头荡漾。 
软泥上的青荇， 油油的在水底招摇； 在康河的柔波里， 我甘心做一条水草！ 
*   那榆荫下的一潭， 不是清泉， 是天上虹； 揉碎在浮藻间， 沉淀着彩虹似的梦。 
寻梦？撑一支长篙， 向青草更青处漫溯； 满载一船星辉， 在星辉斑斓里放歌。 
但我不能放歌， 悄悄是别离的笙箫； 夏虫也为我沉默， 沉默是今晚的康桥！ 
悄悄的我走了， 正如我悄悄的来； 我挥一挥衣袖， 不带走一片云彩。

### 超链接：

Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。
欢迎来到[梵居闹市](http://blog.leanote.com/freewalk)
欢迎来到[梵居闹市](http://blog.leanote.com/freewalk "梵居闹市")

参考式链接：

我经常去的几个网站[Google][1]、[Leanote][2]以及[自己的博客][3]
[Leanote 笔记][2]是一个不错的[网站][]。

[1]:http://www.google.com "Google"
[2]:http://www.leanote.com "Leanote"
[3]:http://blog.leanote.com/freewalk "梵居闹市"
[网站]:http://blog.leanote.com/freewalk

### 自动链接:

<http://example.com/>
<address@example.com>

### 锚点:{#index}

跳转到[目录](#index)

### 图片：

图片的语法和超链接非常相似。只显示图片：

![github](http://p1.img.cctvpic.com/xiyou/userimage/2009/11/02/16383412571511144836026.jpgcropped.jpg "gu")

点击图片进入另一个网页：

[![image]](http://www.example.com/)

[image]: http://p1.img.cctvpic.com/xiyou/userimage/2009/11/02/16383412571511144836026.jpgcropped.jpg "example"

### 插入图片

行内式

美丽花儿： 
![美丽花儿](http://p1.img.cctvpic.com/xiyou/userimage/2009/11/02/16383412571511144836026.jpgcropped.jpg "美丽花儿")

参考式

美丽花儿：

![美丽花儿][flower]

[flower]:http://p1.img.cctvpic.com/xiyou/userimage/2009/11/02/16383412571511144836026.jpgcropped.jpg  "美丽花儿"


### 注脚

使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2], 你可以使用 Leanote[^Le] 编辑器进行书写。

[^1]:Markdown是一种纯文本标记语言

[^2]:HyperText Markup Language 超文本标记语言

[^Le]:开源笔记平台，支持Markdown和笔记直接发为博文


### 表格

学号|姓名|分数
-|-|-
小明|男|75
小红|女|79
小陆|男|92

|学号|姓名|分数|
|-|-|-|
|小明|男|75|
|小红|女|79|
|小陆|男|92|

产品|价格
-|-:
Leanote 高级账号|60元/年
Leanote 超级账号|120元/年

分隔线

* * *
***
*****
- - -
---------------------------------------

### 代码
对于程序员来说这个功能是必不可少的，插入程序代码的方式有两种，一种是利用缩进(Tab), 另一种是利用”`”符号（一般在ESC键下方）包裹代码。

语法说明：

插入行内代码，即插入一个单词或者一句代码的情况，使用`code`这样的形式插入。
插入多行代码，可以使用缩进或者“` code “`,具体看示例。
注意： 缩进式插入前方必须有空行

行内式

C语言里的函数 `scanf()` 怎么使用？

缩进式多行代码
缩进 4 个空格或是 1 个制表符

一个代码区块会一直持续到没有缩进的那一行（或是文件结尾）。

    #include <stdio.h>
    int main(void)
    {
        printf("Hello world\n");
    }

用六个`包裹多行代码

```
#include <stdio.h>
int main(void)
{
    printf("Hello world\n");
}
```

HTML 原始码

<div class="footer" style="color:red">
   © 2004 Foo Corporation
</div>