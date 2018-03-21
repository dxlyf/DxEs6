/* @flow */

import printMe from './print';
import '../../assets/index.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
var aa:number=112;

function getDiv() {
  var { name, ...list } = {
    name: '李三',
    age: 19,
    address: 'ffd'
  };
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  var data=[1,2,3,4,5,6,7,8];
  var data2=[1,2,3,4,5,6,7,8];
  function getItems()
  {
    return data2;
  }
  return <div {...list}>{data.map((item,index)=><p>{getItems()[index]}</p>)}</div>;
}

function getDiv2()
{
  return   <div>
  { this.listType === 'picture-card' ? uploadList : ''}
  {
    this.$slots.trigger
      ? [uploadComponent, this.$slots.default]
      : uploadComponent
  }
  {this.$slots.tip}
  { this.listType !== 'picture-card' ? uploadList : ''}
</div>
}


if (module.hot) {
  module.hot.accept('./print', function () {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}