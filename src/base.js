var Dx=Object.create(null);

function LoadImage(src)
{
    let image=new Image();   
    return new Promise(function(resolve,reject){
        image.onload=resolve;
        image.onabort=image.onerror=reject;
        image.src=src;
    });
}
Dx.LoadImage=LoadImage;
export {Dx}