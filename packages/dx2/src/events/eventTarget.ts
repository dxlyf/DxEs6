
interface EventTargetInterface{
    addEventListener(type:string,name:string,callback:(e:Event)=>void):void;
    removeEventListener(type:string,name:string,callback:(e:Event)=>void):void;
}
class EventInit{
     bubbles:boolean=false;
     cancelable:boolean=false;
     composed:boolean=false;
}

export class Event{
    private bubbles:boolean=false;
    private cancelable:boolean=false;
    private composed:boolean=false;
    constructor(type:string,eventInit:EventInit)
    {
        this.bubbles=eventInit.bubbles;
    }
}

export class EventTarget implements  EventTargetInterface {
    constructor()
    {

    }
    addEventListener(type:string,name:string,callback:Function)
    {

    }
    removeEventListener(type:string,name:string,callback:Function)
    {

    }
    dispatch(event:Event)
    {

    }
}

