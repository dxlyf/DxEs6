欢迎来到 Mock.js 1.0 Wiki!

> [Mock.js 0.1 文档](http://mockjs.com/0.1/)

* **[开始 & 安装](Getting-Started)**
* **[语法规范](Syntax-Specification.md)**
    * [数据模板定义规范](Syntax-Specification#数据模板定义规范-dtd)
        <br>
        [String](Syntax-Specification#1-属性值是字符串-string),
        [Number](Syntax-Specification#2-属性值是数字-number),
        [Boolean](Syntax-Specification#3-属性值是布尔型-boolean),
        [Object](Syntax-Specification#4-属性值是对象-object),
        [Array](Syntax-Specification#5-属性值是数组-array),
        [Function](Syntax-Specification#6-属性值是函数-function),
        [RegExp](Syntax-Specification#7-属性值是正则表达式-regexp)
    * [数据占位符定义规范](Syntax-Specification#数据占位符定义规范-dtd)
* **[Mock.mock()](Mock.mock())**
* **[Mock.setup()](Mock.setup())**
* **[Mock.Random](Mock.Random)**
    * [Basic](Basic)
        <br>
        [boolean](Basic#randomboolean-min-max-current-),
        [natural](Basic#randomnatural-min-max-),
        [integer](Basic#randominteger-min-max-),
        [float](Basic#randomfloat-min-max-dmin-dmax-),
        [character](Basic#randomcharacter-pool-),
        [string](Basic#randomstring-pool-min-max-),
        [range](Basic#randomrange-start-stop-step-)
    * [Date](Date)
        <br>
        [date](Date#randomdate-format-),
        [time](Date#randomtime-format-),
        [datetime](Date#randomdatetime-format-),
        [now](Date#randomnow-unit-format-)
    * [Image](Image)
        <br>
        [img](Image#randomimage-size-background-foreground-format-text-),
        [dataImage](Image#randomdataimage-size-text-)
    * [Color](Color)
        <br>
        [color](Color#randomcolor),
        [hex](Color#randomhex),
        [rgb](Color#randomrgb),
        [rgba](Color#randomrgba),
        [hsl](Color#randomhsl)
    * [Text](Text)
        <br>
        [paragraph](Text#randomparagraph-min-max-),
        [sentence](Text#randomsentence-min-max-),
        [word](Text#randomword-min-max-),
        [title](Text#randomtitle-min-max-),
        [cparagraph](Text#randomcparagraph-min-max-),
        [csentence](Text#randomcsentence-min-max-),
        [cword](Text#randomcword-pool-min-max-),
        [ctitle](Text#randomctitle-min-max-)
    * [Name](Name)
        <br>
        [first](Name#randomfirst),
        [last](Name#randomlast),
        [name](Name#randomname-middle-),
        [cfirst](Name#randomcfirst),
        [clast](Name#randomclast),
        [cname](Name#randomcname)
    * [Web](Web)
        <br>
        [url](Web#randomurl-protocol-host-),
        [domain](Web#randomdomain),
        [protocol](Web#randomprotocol),
        [tld](Web#randomtld),
        [email](Web#randomemail-domain-),
        [ip](Web#randomip)
    * [Address](Address)
        <br>
        [region](Address#randomregion),
        [province](Address#randomprovince),
        [city](Address#randomcity-prefix-),
        [county](Address#randomcounty-prefix-),
        [zip](Address#randomzip)
    * [Helper](Helper)
        <br>
        [capitalize](Helper#randomcapitalize-word-),
        [upper](Helper#randomupper-str-),
        [lower](Helper#randomlower-str-),
        [pick](Helper#randompick-arr-),
        [shuffle](Helper#randomshuffle-arr-)
    * [Miscellaneous](Miscellaneous)
        <br>
        [guid](Miscellaneous#randomguid),
        [id](Miscellaneous#randomid),
        [increment](Miscellaneous#randomincrement-step-)
* **[Mock.valid()](Mock.valid())**
* **[Mock.toJSONSchema()](Mock.toJSONSchema())**
* **[感谢 & 贡献者](Thanks-&-Contributors)**