import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FootDbApiService } from '../../foot-db-api.service';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-football-teams',
  templateUrl: './football-teams.component.html',
  styleUrls: ['./football-teams.component.css']
})
export class FootballTeamsComponent implements OnInit {

  subscription$:any;
  leagueId:number;
  players$:Observable<any>;
  fixtures$:Observable<any>;
  team$:Observable<any>;
  results$:Observable<any>[]=[];
  teams:any;
  id:number;
  toggleCaption:string='Calendrier';
  fixtureMode:boolean=false; // true => calendrier des matchs // false liste des joueurs
  constructor(public api:FootDbApiService, private route:ActivatedRoute, private router: Router ) { }

  ngOnInit() {
      this.subscription$=this.route.params.switchMap((val)=>{
        this.id = val.id;
        this.leagueId = val.league;
        this.players$=this.api.getObsRequest('teams/'+this.id+'/players');
        this.fixtures$=this.api.getObsRequest('teams/'+this.id+'/fixtures');
        this.team$=this.api.getObsRequest('teams/'+this.id);
        return Observable.merge(this.team$,this.players$,this.fixtures$); 
        }).map((data)=>{
          if (data.id){
            this.team$=data;
          }
          if (data.players){
            this.players$=data;
          }
          if (data.season){
            this.fixtures$=data;
          }
          return data;
        })
        .subscribe(
          (data)=>{
            console.log(data);
            this.results$.push(data);
          },
          (error)=>{
            console.log(error);
          }
        );
  }

  close(){
    this.subscription$.unsubscribe();
    this.router.navigateByUrl(`soccer-results/(resultOut:results/${this.leagueId})`);
  }
  displayCal(){
    this.toggleCaption=(this.fixtureMode?'Calendrier':'Effectif');
    this.fixtureMode=!this.fixtureMode;
  }

}
