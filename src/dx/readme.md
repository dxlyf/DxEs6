  
## 基本示例
html
```hmtl 
 <html>
  <head>
      <title>示例</title>
         <script src="/assets/js/require.min.js" main="></script>
      </head>
 <body>
     <div id="container">
        <button id="btn">提交</button>
     </div>
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
## 