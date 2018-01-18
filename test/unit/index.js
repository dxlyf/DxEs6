
window.GLOBALREQUIRECONFIGS={permissions:[]};
// window.process={
//   env:{
//     globalvar:'dx'
//   }
// };
window.require=function()
{
   return {getUrl:function(){}};
}
var helper=require.context('./helper',true,/\.helper\.js$/);
helper.keys().map(helper);
var modules=require.context('./modules',true,/\.spec\.js$/);
modules.keys().map(modules);