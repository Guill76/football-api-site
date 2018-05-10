import { Component, OnInit } from '@angular/core';

import { FootDbApiService } from '../foot-db-api.service';
import { NotificationService } from '../notification.service';
import { LiveService } from '../live.service';

@Component({
  selector: 'app-football-page',
  templateUrl: './football-page.component.html',
  styleUrls: ['./football-page.component.css']
})
export class FootballPageComponent implements OnInit {
  data: string[];
  loaded : boolean=false;

  constructor(private footApi : FootDbApiService, private notifSrv : NotificationService, private liveSrv: LiveService) {
  }
  
  onDisplay(){
    console.log(this.data);
  }

  ngOnInit() {
    this.footApi.getObsRequest('competitions/?season=2017').subscribe(data=>{
      this.data=data;
      this.notifSrv.notify('Les données de l\'API FootballData.org ont été chargées avec succès','SUCCESS',3000);
      this.loaded=true;
    });
  }

  showLive(){
    this.liveSrv.show=true;
  }
  
}
