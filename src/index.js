 import {Dx} from './base'
 import _ from 'lodash'
 import printMe from './print';
 import style from '../assets/index.css'

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

window.onload=function()
{
    document.body.appendChild(document.createElement('input'))
    console.log('111');
}
if (module.hot) {
       module.hot.accept('./print', function() {
             console.log('Accepting the updated printMe module!');
             printMe();
   })
 }