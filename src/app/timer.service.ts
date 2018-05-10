import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/rx';
//import { Observable } from 'rxjs/rx';
@Injectable()
export class TimerService {
  pTime:Observable<any>=null;
  sub:Subscription=null;
  exec=null;
  time=null;
  constructor() { 
    
  }
  public run ( intervalms : number, dat2str : boolean = true ) : void {
    this.pTime=new Observable(observer=>{
      this.exec=setInterval(()=>{
        observer.next(new Date() )
      },intervalms);
    });
    this.sub=this.pTime.subscribe(p=>{
      if (dat2str)
        this.time=p.toLocaleString();
      else this.time=p;
    });
  }
  public clear() : void {
    clearInterval(this.exec);
    this.exec=null;
  }
 
}
