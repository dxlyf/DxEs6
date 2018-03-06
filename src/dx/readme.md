# Mjb.js API文档教程
## 开发
html
```xml 
 <html>
  <head>
      <title>示例</title>
         <script src="/assets/js/require.min.js" main="></script>
      </head>
 <body>
     <div id="container"></div>
 </body>
</html>
```
js:
```javascript
    /** 
     * 加载mjb基础库
     * 加载compoents 自定义组件库
    */
    require(['mjb','components'],function(){

            mjb.View({
                el:"#cotainer",//
                Model:{

                },
                initialize:function(){

                }
            });
    })
```