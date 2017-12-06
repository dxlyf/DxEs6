
 import printMe from './print';
 import '../assets/index.css'

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

 function square(n: number) {
    return n * n;
}
square("5454");
function getDiv()
{
    var {name,...list}={
        name:'李三',
        age:19,
        address:'ffd'
    };
    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
      };
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
      }
     return (<div {...list}>{formatName(user)}</div>);
}
if (module.hot) {
       module.hot.accept('./print', function() {
             console.log('Accepting the updated printMe module!');
             printMe();
   })
 }