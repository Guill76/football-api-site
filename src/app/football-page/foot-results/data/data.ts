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
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1,
                now.getHours(), now.getMinutes(), now.getSeconds()).toJSON(),
            status: 'PLANNED',
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

export const serviceResNothing = JSON.stringify({});
export const serviceResEmptyFixtures = JSON.stringify({ count: 0, fixtures: []});
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