export default function update(text:string)
{
    //225545454
    let element=document.getElementById('app');
    if(element!=null)
    {
        element.innerHTML=text+Date.now();
    }
}
