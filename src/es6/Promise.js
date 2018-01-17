


export default function LoadImage(src)
{
    var img=new Image();
    return new Promise((resolve,reject)=>{
            img.onload=resolve;
            img.onabort=img.onerror=reject;
            img.src=src;
    })
}
