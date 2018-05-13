import { throwError as observableThrowError,  Observable } from 'rxjs';
import { serviceRes, serviceResNoNextMatch, serviceResNothing,
    serviceResEmptyFixtures, serviceResRankingGoalsDiff,
    serviceResRankingGoalsMore, serviceResRankingexaequo,
    serviceResNoArray, serviceResCheckNextAndPrevBut,
    serviceResError, serviceResOneDayCompetition, serviceResBigData } from './data/data';
export class ConfigTestingData {
    private static _key = 'nominal';
    static set key(key: string) {
        /* istanbul ignore else */
        if (this.hasOwnProperty(key) && key !== '_key' ) {
            ConfigTestingData._key = key;
        }
    }
    static get key() {
        return ConfigTestingData._key;
    }
    private static nominal = serviceRes;
    private static noNextMatch = serviceResNoNextMatch;
    private static nothing = serviceResNothing;
    private static emptyFixtures = serviceResEmptyFixtures;
    private static goalDiff = serviceResRankingGoalsDiff;
    private static goals = serviceResRankingGoalsMore;
    private static exaequo = serviceResRankingexaequo;
    private static noArrayResult = serviceResNoArray;
    private static checkNextAndPrev = serviceResCheckNextAndPrevBut;
    private static oneDayCompet = serviceResOneDayCompetition;
    private static bigDataOnlyNullResults = serviceResBigData;
    private static error = serviceResError;
}

export class MockFootDbApiService {
    readonly apiUrl: string = 'http://api.football-data.org/v1/' ;
    // readonly apiToken : string ='3d2ff424c0454c4cbb1b6d182bd16f8e';
    readonly apiToken: string = '3d2ff424c0454c4cbb1b6d182bd16f8e';
    loaded: Boolean = false;
    resObs: Observable<any>;
    results: string[];
    filterRes = null;
    config: ConfigTestingData;
    getObsRequest(url: string): Observable<any> {
      // console.log('Mockservice', res);
      return Observable.of(ConfigTestingData[ConfigTestingData['key']]).map( resp => JSON.parse(resp));
    }
  }
