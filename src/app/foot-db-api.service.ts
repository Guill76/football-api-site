import { Injectable } from '@angular/core';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {NotificationService} from './notification.service';

@Injectable()
export class FootDbApiService {
  readonly apiUrl: string = 'http://api.football-data.org/v1/' ;
  // readonly apiToken : string ='3d2ff424c0454c4cbb1b6d182bd16f8e';
  readonly apiToken: string = '3d2ff424c0454c4cbb1b6d182bd16f8e';
  loaded: Boolean = false;
  resObs: Observable<any>;
  results: string[];
  constructor(private http: Http, private notifServ: NotificationService) { }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.notifServ.notify('Un problème est survenu lors du chargement des données de l\'API footdata' , 'WARN', 6000);
    this.loaded = true;
    return Observable.throw(error);
  }

  getObsRequest(name: string, paramXRespControl:  string = 'minified') {
    const headers = new Headers(
      {'X-Auth-Token': this.apiToken,
      'X-Response-Control': paramXRespControl });
    const options = new RequestOptions({ headers: headers });
    this.resObs = this.http.get(this.apiUrl + name, options).map(this.extractData).catch(this.handleError.bind(this));
    return this.resObs;
  }
  loadData(name: string) {
    this.loaded = false;
    this.results = null;
    this.getObsRequest(name);
    try {
    this.resObs.subscribe(data => {
      this.results = data;
      this.notifServ.notify('Les données de l\'API Foot Data ont été chargées avec succès', 'SUCCESS', 3000);
      this.loaded = true;
    });
    }catch (err) {
      this.notifServ.notify(err.message, 'SUCCESS', 3000);
    }
  }
}
