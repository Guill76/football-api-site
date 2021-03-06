import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { NotificationService } from '../../notification.service';
import { FootDbApiService } from '../../foot-db-api.service';
import { isArray } from 'util';


export const ALLSTATUS = {
  'FINISHED': 'Fini', 'TIMED': 'Plan.', 'SCHEDULED': 'A def.',
  'CANCELED': 'Ab.', 'IN_PLAY': 'En C.', 'POSTPONED': 'Rep.'
};

export const enum MODES {
  LEAGUETABLE = 0,
  RESULTS = 1,
  NONE = 2
}

@Component({
  selector: 'app-foot-results',
  templateUrl: './foot-results.component.html',
  styleUrls: ['./foot-results.component.css']
})
export class FootResultsComponent implements OnInit, OnDestroy {
  // match ID
  id: number;

  subscription = null;

  errSub = false;

  lastTblLeagueId: number;

  // tab pour les journees
  matchDaysArr;

  // timeout pour fermer la popup avec effet
  tm: any;

  out: boolean;
  // Journee
  matchday: number;

  nextMatchday: Date;
  lastMatchday: Date;
  // resultats
  results: any;

  // Flag Resultats visibles
  closed = false;

  // Observables Resultats
  resObs: any;

  // Observables Leaguetable
  lTbObs: any;

  // chargé pour indiquer si les données sont charger (Flag pour animation loader)
  loaded = false;

  // Resultats a afficher avec filtre sur journée
  filterRes = null;

  // Nombre de journées liées au championnat choisi
  numOfFix = 0;

  // myTable
  homeMadeTable;

  // Popup d'affichage
  @ViewChild('popup') dspPopup;

  // Mode
  mode: number = MODES.RESULTS;

  constructor(private route: ActivatedRoute,
    private router: Router, private api: FootDbApiService, private notifSrv: NotificationService) {
  }

  ngOnInit() {
    this.out = false;
    // let result$:Observable<any>;
    this.subscription = this.route.params.switchMap((val) => {
      this.id = val.id;
      return this.api.getObsRequest('competitions/' + this.id + '/fixtures');
    }).map((data) => {
      if ( data && data.fixtures && isArray(data.fixtures) ) {
        this.results = data.fixtures;
        // console.log('Data OK: ', data);
        return data.fixtures.filter((val: any) =>  (val.status === 'FINISHED' || val.status === 'IN_PLAY'));
      } else {
        this.results = [];
        console.log('Data of null objects: ', data);
        return ([]);
      }
    })
    .subscribe(
      (result) => {
        // console.log('res subscribe', result);
        const prevMode = this.mode;
        this.loaded = true;
        this.filterRes = result;
        this.notifSrv.notify('Les données de l\'API FootballData.org ont été chargées avec succès', 'SUCCESS', 2000);
        if (this.results.length > 0) {
          this.numOfFix = parseInt( this.results[this.results.length - 1].matchday, 10);
          this.matchday = parseInt(this.filterRes[this.filterRes.length - 1].matchday, 10);
          this.lastMatchday = new Date(this.filterRes[this.filterRes.length - 1].date);
          const tabNmd = this.results.filter(val => {
              return(val.matchday === this.matchday + 1) ;
          });
          this.nextMatchday = (tabNmd && tabNmd.length > 0) ? new Date(tabNmd[0].date) : null;
          const now = new Date();
          if (this.nextMatchday) {
            if ( (this.nextMatchday.getTime() - now.getTime() < now.getTime() - this.lastMatchday.getTime() &&
              this.matchday !== this.numOfFix) ) {
                this.matchday++;
            }
          } else {
            console.log('No next Match ');
          }
          this.matchDaysArr = Array(this.numOfFix);
          this.matchDaysArr = this.matchDaysArr.fill().map((x, i) => i + 1);
          this.filterRes = this.results.filter(val =>  parseInt(val.matchday, 10) === this.matchday);
        } else {
          console.log('No datas found');
        }
        this.closed = false;
        if (prevMode === MODES.LEAGUETABLE) {
          this.tableLeagueClicked();
        }
      },
      (err) => {
        this.loaded = true;
        this.closed = true;
        this.errSub = true;
        console.log('erreur', err);
        this.notifSrv.notify('Problème lors du chragement des données de l\'api footballData.org', 'WARN', 2000);
        this.router.navigateByUrl('soccer-results');
        // location.reload(true);
        this.id = null;
      }
      // ,
      // () => {
      //   console.log('Completed');
      // }
    );
  }

//   displayLog() {
//     console.log(this.results);
//  }

  openPitchCompo(id) {
    this.out = true;
    this.router.navigate([[{outlets: {CompoOutlet: ['compo', id]}}]]);
    // console.log(this.router.parseUrl(this.router.url));
    // console.log(id);
    // console.log(this.router);
    // console.log(this.router.url);
  }
  onChangeMatchDay(newVal) {
    this.matchday = parseInt(newVal, 10);
    this.filterRes = null;
    this.filterRes = this.results.filter( p => p.matchday === this.matchday );
  }
  getStatus(status: string) {
    if (ALLSTATUS[status]) {
      return ALLSTATUS[status];
    } else {
      return null;
    }
  }
  close() {
    const el = this.dspPopup.nativeElement;
    this.mode = MODES.RESULTS;
    clearTimeout(this.tm);
    this.tm = null;
    el.className = 'closeContainer';
    // attendre jusqu'a la fin de l'animation à la fermeture.
    this.tm = setTimeout( () => {
      this.closed = true;
      this.router.navigateByUrl('soccer-results');
    }, 460);
  }
  ngOnDestroy() {
    this.closed = true;
    if (this.results && this.results.length > 0) {
      this.results.splice(0, this.results.length);
      this.results = null;
    }
    if (this.filterRes && this.filterRes.length > 0) {
      this.filterRes.splice(0, this.filterRes.length);
      this.filterRes = null;
    }
    console.log('Clearing objects');
    if (this.tm) {
      clearTimeout(this.tm);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  lastD() {
    let newVal = this.matchday;
    if (this.matchday > 1) {
      newVal--;
    }
    this.onChangeMatchDay(newVal.toString());
  }
  nextD() {
    let newVal = this.matchday;
    if (this.matchday < this.numOfFix) {
      newVal++;
    }
    this.onChangeMatchDay(newVal.toString());
  }
  resultsClicked() {
    this.mode = MODES.RESULTS;
  }

  buildTable() {
    const tplObject = {
      teamId: 0, team: '', won: 0, lost: 0, nulls: 0, goals: 0,
      goalsAgainst: 0, points: 0, goalDifference: 0, playedGames: 0
    };
    const a = tplObject;
    const h = tplObject;
    const arObjTeams: any[] = [];
    const tmp = this.results.filter(p => p.matchday === 1);
    for (let i = 0; i < tmp.length * 2; i++) {
      arObjTeams.push(a);
    }
    for (let i = 0, j = 0; i < tmp.length; i++, j = j + 2 ) {
      arObjTeams[j] = {
        teamId: tmp[i].awayTeamId, team: tmp[i].awayTeamName, won: 0, lost: 0,
        nulls: 0, goals: 0, goalsAgainst: 0, points: 0, goalDifference: 0
      };
      arObjTeams[j + 1] = {
        teamId: tmp[i].homeTeamId, team: tmp[i].homeTeamName, won: 0, lost: 0,
        nulls: 0, goals: 0, goalsAgainst: 0, points: 0, goalDifference: 0
      };
    }
    let w, l, n, g, ga, pts, pl, d;
    for (let i = 0; i < arObjTeams.length; i++) {
      w = 0, l = 0, n = 0, g = 0, ga = 0, pts = 0, d = 0, pl = 0;
      for (const obj of this.results.filter(
        p => (p.status === 'FINISHED' && (p.awayTeamId === arObjTeams[i].teamId || p.homeTeamId === arObjTeams[i].teamId)))) {
        pl++;
        if (arObjTeams[i].teamId === obj.homeTeamId) {
          g = g + obj.result.goalsHomeTeam; ga = ga + obj.result.goalsAwayTeam;
          if ( obj.result.goalsHomeTeam > obj.result.goalsAwayTeam) {
            w++;
          } else {
            if (obj.result.goalsHomeTeam === obj.result.goalsAwayTeam) {
              n++;
            } else {
              l++;
            }
          }
        } else {
          ga = ga + obj.result.goalsHomeTeam; g = g + obj.result.goalsAwayTeam;
          if (obj.result.goalsHomeTeam < obj.result.goalsAwayTeam) {
            w++;
          } else {
            if (obj.result.goalsHomeTeam === obj.result.goalsAwayTeam) {
              n++;
            } else {
              l++;
            }
          }
        }
      }
      pts = 3 * w + n;
      d = g - ga;
      arObjTeams[i] = {
        rank: i, teamId: arObjTeams[i].teamId, team: arObjTeams[i].team, won: w, lost: l,
        nulls: n, goals: g, goalsAgainst: ga, points: pts, goalDifference: d, playedGames: pl
      };
    }
    arObjTeams.sort(( o1: any, o2: any ) => {
      if (o1.points > o2.points) { return 1; }
      if (o1.points < o2.points) { return -1; }
      if (o1.goalDifference > o2.goalDifference) { return 1; }
      if (o1.goalDifference < o2.goalDifference) { return -1; }
      if (o1.goals > o2.goals) { return 1; }
      if (o1.goals < o2.goals) { return -1; }
      return 0;
    });
    this.notifSrv.notify('Le classement de la competition ' + this.id + ' vient d\'être recalculé!', 'INFO', 2000);
    this.homeMadeTable = arObjTeams;
    this.homeMadeTable.reverse();
    for (let i = 0; i < this.homeMadeTable.length; i++) {
      this.homeMadeTable[i] = {
        rank: i + 1, teamId: this.homeMadeTable[i].teamId, team: this.homeMadeTable[i].team,
        won: this.homeMadeTable[i].won, lost: this.homeMadeTable[i].lost,
        nulls: this.homeMadeTable[i].nulls, goals: this.homeMadeTable[i].goals,
        goalsAgainst: this.homeMadeTable[i].goalsAgainst, points: this.homeMadeTable[i].points,
        goalDifference: this.homeMadeTable[i].goalDifference, playedGames: this.homeMadeTable[i].playedGames};
    }
  }

  tableLeagueClicked() {
    this.buildTable();
    this.mode = MODES.LEAGUETABLE;
    this.loaded = true;
  }

}
