import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Subscription } from 'rxjs/rx';

@Injectable()
export class NotificationService {
  notifObs: Observable<any>;
  notif: any = null;
  sub: Subscription = null;
  private tm: any = null;
  constructor() { }
  notify(msg: string, notifLevel: string, timeDisplay: number ) {

    this.notif = {
        message: msg,
        level: notifLevel
    };
    console.log('notification Message: ', this.notif);
    this.notifObs = new Observable((observer => {
      this.tm = setTimeout(() => {
        observer.next(null);
      }, timeDisplay);
    }));
    this.sub = this.notifObs.subscribe( p => {
      this.notif = p;
      clearTimeout(this.tm);
      this.tm = null;
    });
  }
}
