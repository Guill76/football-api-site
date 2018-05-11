import { throwError as observableThrowError,  Observable } from 'rxjs';
export const serviceRes = `
{
  "count":4,
  "fixtures":[
    {
      "id":1,
      "competitionId":448,
      "date":"2018-05-01T14:00:00Z",
      "status":"FINISHED",
      "matchday":1,
      "homeTeamName":"Equipe 4",
      "homeTeamId":4,
      "awayTeamName":"Equipe 1",
      "awayTeamId":1,
      "result": {"goalsHomeTeam":3,"goalsAwayTeam":1,
            "halfTime":{"goalsHomeTeam":2,"goalsAwayTeam":0}},
      "odds":null
    },
    {
        "id":2,
        "competitionId":448,
        "date":"2018-05-01T14:00:00Z",
        "status":"FINISHED",
        "matchday":1,
        "homeTeamName":"Equipe 2",
        "homeTeamId":2,
        "awayTeamName":"Equipe 3",
        "awayTeamId":3,
        "result":{"goalsHomeTeam":2,"goalsAwayTeam":2,
        "halfTime":{"goalsHomeTeam":2,"goalsAwayTeam":0}},
        "odds":null
      },
    {
      "id":3,
      "competitionId":448,
      "date":"2018-05-09T14:00:00Z",
      "status":"FINISHED",
      "matchday":2,
      "homeTeamName":"Equipe 2",
      "homeTeamId":2,
      "awayTeamName":"Equipe 1",
      "awayTeamId":1,
      "result":{"goalsHomeTeam":2,"goalsAwayTeam":2,"halfTime":{"goalsHomeTeam":2,"goalsAwayTeam":1}},
      "odds":null
    },
    {
      "id":4,
      "competitionId":448,
      "date":"2018-05-09T21:00:00Z",
      "status":"FINISHED",
      "matchday":2,
      "homeTeamName":"Equipe 3",
      "homeTeamId":3,
      "awayTeamName":"Equipe 4",
      "awayTeamId":4,
      "result":{"goalsHomeTeam":1,"goalsAwayTeam":2,"halfTime":{"goalsHomeTeam":0,"goalsAwayTeam":1}},
      "odds":null
    },
    {
      "id":5,
      "competitionId":448,
      "date":"2018-05-20T21:00:00Z",
      "status":"PLANNED",
      "matchday":3,
      "homeTeamName":"Equipe 1",
      "homeTeamId":1,
      "awayTeamName":"Equipe 4",
      "awayTeamId":4,
      "result":{"goalsHomeTeam":1,"goalsAwayTeam":2,"halfTime":{"goalsHomeTeam":0,"goalsAwayTeam":1}},
      "odds":null
    },
    {
      "id":6,
      "competitionId":448,
      "date":"2018-05-20T14:00:00Z",
      "status":"PLANNED",
      "matchday":3,
      "homeTeamName":"Equipe 3",
      "homeTeamId":3,
      "awayTeamName":"Equipe 2",
      "awayTeamId":2,
      "result":{"goalsHomeTeam":1,"goalsAwayTeam":2,"halfTime":{"goalsHomeTeam":0,"goalsAwayTeam":1}},
      "odds":null
    }
  ]
}
`;
export class MockFootDbApiService {
    readonly apiUrl: string = 'http://api.football-data.org/v1/' ;
    // readonly apiToken : string ='3d2ff424c0454c4cbb1b6d182bd16f8e';
    readonly apiToken: string = '3d2ff424c0454c4cbb1b6d182bd16f8e';
    loaded: Boolean = false;
    resObs: Observable<any>;
    results: string[];
    filterRes = null;
    getObsRequest(url: string): Observable<any> {
      // console.log('Mockservice', res);
      return Observable.of(serviceRes).map( resp => JSON.parse(resp) );
    }
  }
