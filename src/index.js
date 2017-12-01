
 import {Dx} from './base'
 import _ from 'lodash'
 import vue from 'vue'
 import printMe from './print';
 import '../assets/index.css'

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

window.onload=function()
{
    document.body.appendChild(document.createElement('input'))
    console.log('111');
}
function getDiv()
{
    var data={
        name:'李三',
        age:19
    };
    return (<div >6565</div>)
}
if (module.hot) {
       module.hot.accept('./print', function() {
             console.log('Accepting the updated printMe module!');
             printMe();
   })
 }