const now = new Date();
export const serviceRes = JSON.stringify({
    count: 6,
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 2, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 3,
            competitionId: 448,
            date: '2018-05-09T14:00:00Z',
            status: 'FINISHED',
            matchday: 2,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 2, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 4,
            competitionId: 448,
            date: '2018-05-09T21:00:00Z',
            status: 'FINISHED',
            matchday: 2,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 4',
            awayTeamId: 4,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 5,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6,
            now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'FINISHED',
            matchday: 3,
            homeTeamName: 'Equipe 1',
            homeTeamId: 1,
            awayTeamName: 'Equipe 4',
            awayTeamId: 4,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 6,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'FINISHED',
            matchday: 3,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 7,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 4,
            homeTeamName: 'Equipe 1',
            homeTeamId: 1,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 2, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 8,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 4,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        }
    ]
});
export const serviceResNothing = JSON.stringify({});
export const serviceResEmptyFixtures = JSON.stringify({ count: 0, fixtures: []});
export const serviceResNoArray = JSON.stringify({ fixtures: null });
export const serviceResError = '{ress}';
export const serviceResRankingGoalsDiff = JSON.stringify({
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 3, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        }
    ]
});

export const serviceResCheckNextAndPrevBut = JSON.stringify({
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 3, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 3,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 2,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 4,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5,
            now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 2,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 5,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 3,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 6,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 3,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        }
    ]
});
export const serviceResRankingGoalsMore = JSON.stringify({
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 3, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 0, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        }
    ]
});
export const serviceResRankingexaequo = JSON.stringify({
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 0 } },
            odds: null
        }
    ]
});

export const serviceResOneDayCompetition = JSON.stringify({
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 0 } },
            odds: null
        }
    ]
});

export const serviceResNoNextMatch = JSON.stringify({
    count: 6,
    fixtures: [
        {
            id: 1,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 4',
            homeTeamId: 4,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 3, goalsAwayTeam: 1, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 2,
            competitionId: 448,
            date: '2018-05-01T14:00:00Z',
            status: 'FINISHED',
            matchday: 1,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 3',
            awayTeamId: 3,
            result: { goalsHomeTeam: 2, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 0 } },
            odds: null
        },
        {
            id: 3,
            competitionId: 448,
            date: '2018-05-09T14:00:00Z',
            status: 'FINISHED',
            matchday: 2,
            homeTeamName: 'Equipe 2',
            homeTeamId: 2,
            awayTeamName: 'Equipe 1',
            awayTeamId: 1,
            result: { goalsHomeTeam: 2, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 2, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 4,
            competitionId: 448,
            date: '2018-05-09T21:00:00Z',
            status: 'FINISHED',
            matchday: 2,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 4',
            awayTeamId: 4,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 5,
            competitionId: 448,
            date: '2018-05-10T21:00:00Z',
            status: 'FINISHED',
            matchday: 3,
            homeTeamName: 'Equipe 1',
            homeTeamId: 1,
            awayTeamName: 'Equipe 4',
            awayTeamId: 4,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        },
        {
            id: 6,
            competitionId: 448,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
            matchday: 3,
            homeTeamName: 'Equipe 3',
            homeTeamId: 3,
            awayTeamName: 'Equipe 2',
            awayTeamId: 2,
            result: { goalsHomeTeam: 1, goalsAwayTeam: 2, halfTime: { goalsHomeTeam: 0, goalsAwayTeam: 1 } },
            odds: null
        }
    ]
});
export const serviceResBigData = `
{
    "count": 380,
    "fixtures": [
      {
        "id": 161661,
        "competitionId": 450,
        "date": "2017-08-04T18:45:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "AS Monaco FC",
        "homeTeamId": 548,
        "awayTeamName": "Toulouse FC",
        "awayTeamId": 511,
        "result": {
          "goalsHomeTeam": 3,
          "goalsAwayTeam": 3,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161665,
        "competitionId": 450,
        "date": "2017-08-05T15:15:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "Paris Saint-Germain",
        "homeTeamId": 524,
        "awayTeamName": "Amiens SC",
        "awayTeamId": 530,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161662,
        "competitionId": 450,
        "date": "2017-08-05T18:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "Montpellier Hérault SC",
        "homeTeamId": 518,
        "awayTeamName": "SM Caen",
        "awayTeamId": 514,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161667,
        "competitionId": 450,
        "date": "2017-08-05T18:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "ES Troyes AC",
        "homeTeamId": 531,
        "awayTeamName": "Stade Rennais FC",
        "awayTeamId": 529,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161660,
        "competitionId": 450,
        "date": "2017-08-05T18:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "FC Metz",
        "homeTeamId": 545,
        "awayTeamName": "EA Guingamp",
        "awayTeamId": 538,
        "result": {
          "goalsHomeTeam": 3,
          "goalsAwayTeam": 3,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161663,
        "competitionId": 450,
        "date": "2017-08-05T18:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "Olympique Lyonnais",
        "homeTeamId": 523,
        "awayTeamName": "RC Strasbourg Alsace",
        "awayTeamId": 576,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161666,
        "competitionId": 450,
        "date": "2017-08-05T18:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "AS Saint-Étienne",
        "homeTeamId": 527,
        "awayTeamName": "OGC Nice",
        "awayTeamId": 522,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161659,
        "competitionId": 450,
        "date": "2017-08-06T13:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "OSC Lille",
        "homeTeamId": 521,
        "awayTeamName": "FC Nantes",
        "awayTeamId": 543,
        "result": {
          "goalsHomeTeam": 3,
          "goalsAwayTeam": 3,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161658,
        "competitionId": 450,
        "date": "2017-08-06T15:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "Angers SCO",
        "homeTeamId": 532,
        "awayTeamName": "FC Girondins de Bordeaux",
        "awayTeamId": 526,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161664,
        "competitionId": 450,
        "date": "2017-08-06T19:00:00Z",
        "status": "FINISHED",
        "matchday": 1,
        "homeTeamName": "Olympique de Marseille",
        "homeTeamId": 516,
        "awayTeamName": "Dijon FCO",
        "awayTeamId": 528,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161654,
        "competitionId": 450,
        "date": "2017-08-11T17:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "OGC Nice",
        "homeTeamId": 522,
        "awayTeamName": "ES Troyes AC",
        "awayTeamId": 531,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161655,
        "competitionId": 450,
        "date": "2017-08-11T18:45:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "Stade Rennais FC",
        "homeTeamId": 529,
        "awayTeamName": "Olympique Lyonnais",
        "awayTeamId": 523,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161653,
        "competitionId": 450,
        "date": "2017-08-12T15:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "FC Nantes",
        "homeTeamId": 543,
        "awayTeamName": "Olympique de Marseille",
        "awayTeamId": 516,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161657,
        "competitionId": 450,
        "date": "2017-08-12T18:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "Toulouse FC",
        "homeTeamId": 511,
        "awayTeamName": "Montpellier Hérault SC",
        "awayTeamId": 518,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161648,
        "competitionId": 450,
        "date": "2017-08-12T18:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "Amiens SC",
        "homeTeamId": 530,
        "awayTeamName": "Angers SCO",
        "awayTeamId": 532,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161649,
        "competitionId": 450,
        "date": "2017-08-12T18:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "FC Girondins de Bordeaux",
        "homeTeamId": 526,
        "awayTeamName": "FC Metz",
        "awayTeamId": 545,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161650,
        "competitionId": 450,
        "date": "2017-08-12T18:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "SM Caen",
        "homeTeamId": 514,
        "awayTeamName": "AS Saint-Étienne",
        "awayTeamId": 527,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161656,
        "competitionId": 450,
        "date": "2017-08-13T13:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "RC Strasbourg Alsace",
        "homeTeamId": 576,
        "awayTeamName": "OSC Lille",
        "awayTeamId": 521,
        "result": {
          "goalsHomeTeam": 3,
          "goalsAwayTeam": 3,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161651,
        "competitionId": 450,
        "date": "2017-08-13T15:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "Dijon FCO",
        "homeTeamId": 528,
        "awayTeamName": "AS Monaco FC",
        "awayTeamId": 548,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 3
          }
        },
        "odds": null
      },
      {
        "id": 161652,
        "competitionId": 450,
        "date": "2017-08-13T19:00:00Z",
        "status": "FINISHED",
        "matchday": 2,
        "homeTeamName": "EA Guingamp",
        "homeTeamId": 538,
        "awayTeamName": "Paris Saint-Germain",
        "awayTeamId": 524,
        "result": {
          "goalsHomeTeam": 3,
          "goalsAwayTeam": 3,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161639,
        "competitionId": 450,
        "date": "2017-08-18T18:45:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "FC Metz",
        "homeTeamId": 545,
        "awayTeamName": "AS Monaco FC",
        "awayTeamId": 548,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161642,
        "competitionId": 450,
        "date": "2017-08-19T15:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "Olympique Lyonnais",
        "homeTeamId": 523,
        "awayTeamName": "FC Girondins de Bordeaux",
        "awayTeamId": 526,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 2,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161640,
        "competitionId": 450,
        "date": "2017-08-19T18:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "Montpellier Hérault SC",
        "homeTeamId": 518,
        "awayTeamName": "RC Strasbourg Alsace",
        "awayTeamId": 576,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161641,
        "competitionId": 450,
        "date": "2017-08-19T18:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "OGC Nice",
        "homeTeamId": 522,
        "awayTeamName": "EA Guingamp",
        "awayTeamId": 538,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161646,
        "competitionId": 450,
        "date": "2017-08-19T18:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "AS Saint-Étienne",
        "homeTeamId": 527,
        "awayTeamName": "Amiens SC",
        "awayTeamId": 530,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 2,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161647,
        "competitionId": 450,
        "date": "2017-08-19T18:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "ES Troyes AC",
        "homeTeamId": 531,
        "awayTeamName": "FC Nantes",
        "awayTeamId": 543,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161645,
        "competitionId": 450,
        "date": "2017-08-19T18:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "Stade Rennais FC",
        "homeTeamId": 529,
        "awayTeamName": "Dijon FCO",
        "awayTeamId": 528,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161638,
        "competitionId": 450,
        "date": "2017-08-20T13:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "OSC Lille",
        "homeTeamId": 521,
        "awayTeamName": "SM Caen",
        "awayTeamId": 514,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161643,
        "competitionId": 450,
        "date": "2017-08-20T15:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "Olympique de Marseille",
        "homeTeamId": 516,
        "awayTeamName": "Angers SCO",
        "awayTeamId": 532,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161644,
        "competitionId": 450,
        "date": "2017-08-20T19:00:00Z",
        "status": "FINISHED",
        "matchday": 3,
        "homeTeamName": "Paris Saint-Germain",
        "homeTeamId": 524,
        "awayTeamName": "Toulouse FC",
        "awayTeamId": 511,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 2,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161636,
        "competitionId": 450,
        "date": "2017-08-25T18:45:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "Paris Saint-Germain",
        "homeTeamId": 524,
        "awayTeamName": "AS Saint-Étienne",
        "awayTeamId": 527,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161635,
        "competitionId": 450,
        "date": "2017-08-26T15:15:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "FC Nantes",
        "homeTeamId": 543,
        "awayTeamName": "Olympique Lyonnais",
        "awayTeamId": 523,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161637,
        "competitionId": 450,
        "date": "2017-08-26T18:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "Toulouse FC",
        "homeTeamId": 511,
        "awayTeamName": "Stade Rennais FC",
        "awayTeamId": 529,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161628,
        "competitionId": 450,
        "date": "2017-08-26T18:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "Amiens SC",
        "homeTeamId": 530,
        "awayTeamName": "OGC Nice",
        "awayTeamId": 522,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 2,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161632,
        "competitionId": 450,
        "date": "2017-08-26T18:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "Dijon FCO",
        "homeTeamId": 528,
        "awayTeamName": "Montpellier Hérault SC",
        "awayTeamId": 518,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161631,
        "competitionId": 450,
        "date": "2017-08-26T18:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "SM Caen",
        "homeTeamId": 514,
        "awayTeamName": "FC Metz",
        "awayTeamId": 545,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161630,
        "competitionId": 450,
        "date": "2017-08-26T18:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "FC Girondins de Bordeaux",
        "homeTeamId": 526,
        "awayTeamName": "ES Troyes AC",
        "awayTeamId": 531,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161633,
        "competitionId": 450,
        "date": "2017-08-27T13:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "EA Guingamp",
        "homeTeamId": 538,
        "awayTeamName": "RC Strasbourg Alsace",
        "awayTeamId": 576,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161629,
        "competitionId": 450,
        "date": "2017-08-27T15:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "Angers SCO",
        "homeTeamId": 532,
        "awayTeamName": "OSC Lille",
        "awayTeamId": 521,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161634,
        "competitionId": 450,
        "date": "2017-08-27T19:00:00Z",
        "status": "FINISHED",
        "matchday": 4,
        "homeTeamName": "AS Monaco FC",
        "homeTeamId": 548,
        "awayTeamName": "Olympique de Marseille",
        "awayTeamId": 516,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161619,
        "competitionId": 450,
        "date": "2017-09-08T17:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "OSC Lille",
        "homeTeamId": 521,
        "awayTeamName": "FC Girondins de Bordeaux",
        "awayTeamId": 526,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161620,
        "competitionId": 450,
        "date": "2017-09-08T18:45:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "FC Metz",
        "homeTeamId": 545,
        "awayTeamName": "Paris Saint-Germain",
        "awayTeamId": 524,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161622,
        "competitionId": 450,
        "date": "2017-09-09T15:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "OGC Nice",
        "homeTeamId": 522,
        "awayTeamName": "AS Monaco FC",
        "awayTeamId": 548,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 2,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161627,
        "competitionId": 450,
        "date": "2017-09-09T18:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "ES Troyes AC",
        "homeTeamId": 531,
        "awayTeamName": "Toulouse FC",
        "awayTeamId": 511,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161618,
        "competitionId": 450,
        "date": "2017-09-09T18:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "SM Caen",
        "homeTeamId": 514,
        "awayTeamName": "Dijon FCO",
        "awayTeamId": 528,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161626,
        "competitionId": 450,
        "date": "2017-09-09T18:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "RC Strasbourg Alsace",
        "homeTeamId": 576,
        "awayTeamName": "Amiens SC",
        "awayTeamId": 530,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161621,
        "competitionId": 450,
        "date": "2017-09-09T18:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "Montpellier Hérault SC",
        "homeTeamId": 518,
        "awayTeamName": "FC Nantes",
        "awayTeamId": 543,
        "result": {
          "goalsHomeTeam": 0,
          "goalsAwayTeam": 0,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161625,
        "competitionId": 450,
        "date": "2017-09-10T13:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "AS Saint-Étienne",
        "homeTeamId": 527,
        "awayTeamName": "Angers SCO",
        "awayTeamId": 532,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      },
      {
        "id": 161623,
        "competitionId": 450,
        "date": "2017-09-10T15:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "Olympique Lyonnais",
        "homeTeamId": 523,
        "awayTeamName": "EA Guingamp",
        "awayTeamId": 538,
        "result": {
          "goalsHomeTeam": 2,
          "goalsAwayTeam": 2,
          "halfTime": {
            "goalsHomeTeam": 1,
            "goalsAwayTeam": 0
          }
        },
        "odds": null
      },
      {
        "id": 161624,
        "competitionId": 450,
        "date": "2017-09-10T19:00:00Z",
        "status": "FINISHED",
        "matchday": 5,
        "homeTeamName": "Olympique de Marseille",
        "homeTeamId": 516,
        "awayTeamName": "Stade Rennais FC",
        "awayTeamId": 529,
        "result": {
          "goalsHomeTeam": 1,
          "goalsAwayTeam": 1,
          "halfTime": {
            "goalsHomeTeam": 0,
            "goalsAwayTeam": 1
          }
        },
        "odds": null
      }]}
      `;


