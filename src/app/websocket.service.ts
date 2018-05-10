import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() { }

  private _subject: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this._subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this._subject;
  }

  get subject(): Rx.Subject<MessageEvent> {
    return this._subject;
  }
  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        // ws.onopen = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
    }).map(data => {
      console.log(typeof data.data, data.data);
      console.log(data.data);
      return (JSON.parse(data.data));
    });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

}
