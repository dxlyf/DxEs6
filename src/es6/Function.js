
// 箭头函数
var f = v => v;

const  call =(key,...args)=>  context  => context [key](... args);

// 参数解板
function args55(name,{age = 43,name2 = '4'}={})
{

}
function args8(options={age=43}={})
{
    let p=options.age;
}
function args999(options={
  cateid=0,
  lowerprice=0,
  orderfield=0,
  orderform=0,
  pageindex=1,
  pagesize=10,
  sortid='',
  upperprice=0
  }={cateid:0,
    lowerprice:0,
    orderfield:0,
    orderform:0,
    pageindex:1,
    pagesize:10,
    sortid:'',
    upperprice:0}){



      var cateid=options.cateid;
  }
// // 参数解板2
// function args2(name,options={age=43,name='4'}={})
// {

// }
// // 参数解板3
// function args2(name,{age,name}={age=43,name='4'})
// {

// }
// // 参数解板4
// function args2(name,{age:age4,name:name4}={age:43,name'4'})
// {

// }
// // 参数解板4
// function args2(name,{age,name}={age:43,name:'4'})
// {

// }
// 参数解板4
function args33(name,{age:age4=3,name:name4}={age:43,name:'4'})
{

}
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
  
export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
      const store = createStore(...args)
      let dispatch = () => {
        throw new Error(
          `Dispatching while constructing your middleware is not allowed. ` +
            `Other middleware would not be applied to this dispatch.`
        )
      }
      let chain = []
  
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)
  
      return {
        ...store,
        dispatch
      }
    }
  }
  