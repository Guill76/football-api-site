import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions} from '@angular/http';




import { ConfigService } from './config.service';

@Injectable()
export class SoccerPitchService {

  constructor(private http: Http, public config: ConfigService) {
  }
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
    return observableThrowError(error);
  }
  postProperties(props) {
    return this.http.post(this.config.baseUrlApi + '/api/soccerPitch', props).map(this.extractData).catch(this.handleError.bind(this));
  }
  getProperties() {
    return this.http.get(this.config.baseUrlApi + '/api/soccerPitch').map(this.extractData).catch(this.handleError.bind(this));
  }
  deleteProperties(id) {
    return this.http.delete(this.config.baseUrlApi + '/api/soccerPitch/' + id).map(this.extractData).catch(this.handleError.bind(this));
  }
  updateProperties(propertyObject) {
    // console.log('id transmis',propertyObject);
    return this.http.put(this.config.baseUrlApi + '/api/soccerPitch', propertyObject)
      .map(this.extractData).catch(this.handleError.bind(this));
  }


}
