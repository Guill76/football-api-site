import { Injectable } from '@angular/core';
import { FootDbApiService } from './foot-db-api.service';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';

@Injectable()
export class LiveService {
  liveResults: any;
  liveComing: any;
  private tm;
  show = false;
  resObs: any;
  goSlowly = true;

  constructor(private fdbServ: FootDbApiService, private notSrv: NotificationService, private config: ConfigService) { }
  getLiveMatches(timeint) {
    this.tm = setInterval(() => {
      this.show = true;
      this.init();
    }, timeint);
  }

  init() {
    clearInterval(this.tm);
    this.tm = null;
    const now = new Date();
    let timeInterval;
    this.resObs = this.fdbServ.getObsRequest('fixtures').subscribe(res => {
      this.show = true;
      this.liveResults = res.fixtures.filter(val => val.status === 'IN_PLAY');
      this.liveComing = res.fixtures.filter(val => (val.status === 'TIMED' && val.date > now.toISOString()));
      // console.log("tableau next timeFrame",res.fixtures)
      timeInterval = (this.liveResults && this.liveResults.length > 0) ? this.config.liveTimer : this.config.slowLiveTimer;
      this.notSrv.notify('Le Timer du Live est actuellement à ' + timeInterval + ' ms', 'INFO', 2000);
      this.getLiveMatches(timeInterval);
    });
  }
}
