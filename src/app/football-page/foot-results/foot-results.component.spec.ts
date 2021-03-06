import { Component, DebugElement  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { throwError as observableThrowError,  Observable } from 'rxjs';

import { FootResultsComponent, MODES } from './foot-results.component';

import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FootDbApiService } from '../../foot-db-api.service';
import { NotificationService } from '../../notification.service';

import { ConfigTestingData, MockFootDbApiService } from './foot-result-mock-service';
// import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';


@Component(
  {
  template: ''
  }
) class FootballPageComponent {}
@Component(
  {
  template: ''
  }
) class SoccerPitchComponent {}
@Component(
  {
  template: ''
  }
) class FootballTeamsComponent {}

describe('FootResultsComponent', () => {
  let component: FootResultsComponent;
  let serviceDb: FootDbApiService;
  let router: Router;
  // let serviceNotif: NotificationService;
  let fixture: ComponentFixture<FootResultsComponent>;
  let initMd: number;
  let num = 0;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ BrowserModule, HttpModule, FormsModule, RouterTestingModule.withRoutes(
        [{
          path: 'soccer-results',
          component: FootballPageComponent,
          children: [{
            path: 'results/:id',
            component: FootResultsComponent,
            outlet: 'resultOut',
            children: [{
              path: 'compo/:id/:awayTeamId/:homeTeamId',
              component: SoccerPitchComponent,
              outlet: 'CompoOutlet',
            },
            {
              path: 'team/:id/:league',
              component: FootballTeamsComponent,
              outlet: 'CompoOutlet',
            }
            ]
          }]
        }]
      )],
      providers: [FootDbApiService, NotificationService],
      declarations: [FootResultsComponent, FootballPageComponent, SoccerPitchComponent, FootballTeamsComponent]
    });
    TestBed.overrideComponent(FootResultsComponent, {
      set: {
        providers: [
          { provide: FootDbApiService, useClass: MockFootDbApiService },
          NotificationService
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootResultsComponent);
    ConfigTestingData.key = 'nominal';
    router = TestBed.get(Router);

    // serviceDb = TestBed.get(FootDbApiService);
    // serviceNotif = fixture.componentRef.injector.get(NotificationService);
    component = fixture.componentInstance;
    serviceDb = TestBed.get(FootDbApiService);
  });
  describe('Component Creation', () => {
    it(`Test n°${++num}:Should be created`, () => {
      expect(component).toBeTruthy();
    });
  });
  describe('On init loading data', () => {
    it(`Test n°${++num}:Should have got some results after onInit`,  async(() => {
        fixture.detectChanges();
        // console.log(ConfigTestingData);
        component.ngOnInit();
        fixture.whenStable().then(() => {
          expect(component.results).toBeDefined();
          expect(component.results.length).toBe(8);
          expect(component.filterRes.length).toBe(2);
        });
    }));
    it(`Test n°${++num}:Should get the matchday after on init and the total of fixtures`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.matchday).toBe(3);
        expect(component.numOfFix).toBe(4);
      });
    }));
  });

  describe('Switching result mode / ranking mode', () => {
    it(`Test n°${++num}:Should check the default mode to be result view`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.mode).toBe(MODES.RESULTS);
      });
    }));
    it(`Test n°${++num}:Should reset the previous mode to tableleague button if mode is allready tableleague`,  async(() => {
      fixture.detectChanges();
      component.mode = MODES.LEAGUETABLE;
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.mode).toBe(MODES.LEAGUETABLE);
      });
    }));
    it(`Test n°${++num}:Should switch to the result view`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.resultsClicked();
        expect(component.mode).toBe(MODES.RESULTS);
      });
    }));

    it(`Test n°${++num}:Should close result UI`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      component.close();
      fixture.whenStable().then(() => {
        expect(component.mode).toBe(MODES.RESULTS);
        expect(component.tm).toBeDefined();
      });
    }));

    it(`Test n°${++num}:Should build and switch to the table league view`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.mode).toBe(MODES.LEAGUETABLE);
      });
    }));

  });
  describe('Computing attributes matchday and status', () => {
    it(`Test n°${++num}:Should compute the next matchday`,  async(() => {
      const now = new Date();
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.nextMatchday.toLocaleDateString()).
          toBe(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10,
          now.getHours(), now.getMinutes(), now.getSeconds()).toLocaleDateString());
      });
    }));

    it(`Test n°${++num}:Should not compute nextMatchDay when no next match`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'noNextMatch';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.nextMatchday).
          toBeNull();
      });
    }));

    it(`Test n°${++num}:Should getStatus is null if status is unknown`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.getStatus('NAWAK')).toBeNull();
      });
    }));
  });

  describe('Computing ranking tables and checking the sort by each criterias', () => {
    it (`Test n°${++num}:Should compute ranking and should sort the table of fixtures with only null
    results to take goals 'for' into account`, async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'bigDataOnlyNullResults';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable.length).toBe(20);
      });
    }));

    it(`Test n°${++num}:Should sort ranking table with goals diff for exaequo first`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'goalDiff';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable[0].points).toBe(component.homeMadeTable[1].points);
        expect(component.homeMadeTable[0].goalDifference).toBeGreaterThan(component.homeMadeTable[1].goalDifference);
      });
    }));

    it(`Test n°${++num}:Should sort ranking table with goals diff for exaequo last`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'goalDiff';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable[2].points).toBe(component.homeMadeTable[3].points);
        expect(component.homeMadeTable[2].goalDifference).toBeGreaterThan(component.homeMadeTable[3].goalDifference);
      });
    }));

    it(`Test n°${++num}:Should sort ranking table with goals for exaequo first`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'goals';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable[0].points).toBe(component.homeMadeTable[1].points);
        expect(component.homeMadeTable[0].goalDifference).toBe(component.homeMadeTable[1].goalDifference);
        expect(component.homeMadeTable[0].goals).toBeGreaterThan(component.homeMadeTable[1].goals);
      });
    }));

    it(`Test n°${++num}:Should sort ranking table with goals for exaequo last`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'goals';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable[2].points).toBe(component.homeMadeTable[3].points);
        expect(component.homeMadeTable[2].goalDifference).toBe(component.homeMadeTable[3].goalDifference);
        expect(component.homeMadeTable[3].goals).toBeLessThan(component.homeMadeTable[2].goals);
      });
    }));

    it(`Test n°${++num}:Should not sort when all teams are exaequo`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'exaequo';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable[0].points).toBe(component.homeMadeTable[3].points);
        expect(component.homeMadeTable[0].goalDifference).toBe(component.homeMadeTable[3].goalDifference);
        expect(component.homeMadeTable[0].goals).toBe(component.homeMadeTable[3].goals);
        expect(component.homeMadeTable[0].rank).toBe(1);
        expect(component.homeMadeTable[3].rank).toBe(4);
      });
    }));

    it(`Test n°${++num}:Should check the recomputed ranking`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        component.tableLeagueClicked();
        expect(component.homeMadeTable.length).toBe(4);
        expect(component.homeMadeTable[0].rank).toBe(1);
      });
    }));
  });

  describe('Checking the limits cases of returned datas by service', () => {
    it(`Test n°${++num}:Should check if no data is returned`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'nothing';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.results.length).toBe(0);
      });
    }));

    it(`Test n°${++num}:Should check if array of empty fixtures is return`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'emptyFixtures';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.results.length).toBe(0);
      });
    }));

    it(`Test n°${++num}:Should check if no array of fixtures is returned`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'noArrayResult';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.results.length).toBe(0);
      });
    }));

    it(`Test n°${++num}:Should take subscrition error block when error is catch`,  async(() => {
      fixture.detectChanges();
      ConfigTestingData.key = 'error';
      component.ngOnInit();
      fixture.whenStable().then(() => {
        expect(component.errSub).toBe(true);
      });
    }));
  });
  describe('Checking methods call by click', () => {
    it(`Test n°${++num}:Should click on open pitch compo`,  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        spyOn(router, 'navigate').and.callFake( (a) => {
          console.log('router navigate open pitch compo', a);
        });
        component.openPitchCompo(1);
        fixture.whenStable().then(() => {
          expect(component.out).toBe(true);
        });
      });
    }));
    describe('check actions when changing matchday', () => {
      it(`Test n°${++num}:Should change match day after init to first match day`,  async(() => {
        fixture.detectChanges();
        component.ngOnInit();
        component.onChangeMatchDay(1);
        fixture.whenStable().then(() => {
          expect(component.matchday).toBe(1);
        });
      }));

      it(`Test n°${++num}:Should next button increment matchday`,  async(() => {
        fixture.detectChanges();
        ConfigTestingData.key = 'checkNextAndPrev';
        component.ngOnInit();
        fixture.whenStable().then(() => {
          initMd = component.matchday;
          component.nextD();
          fixture.whenStable().then(() => {
            expect(component.matchday).toBeGreaterThan(initMd);
          });
        });
      }));

      it(`Test n°${++num}:Should previous button decrement matchday`,  async(() => {
        fixture.detectChanges();
        ConfigTestingData.key = 'checkNextAndPrev';
        component.ngOnInit();
        fixture.whenStable().then(() => {
          initMd = component.matchday;
          component.lastD();
          fixture.whenStable().then(() => {
            expect(component.matchday).toBeLessThan(initMd);
          });
        });
      }));

      it(`Test n°${++num}:Should next button not increment matchday if last matchDay`,  async(() => {
        fixture.detectChanges();
        ConfigTestingData.key = 'oneDayCompet';
        component.ngOnInit();
        fixture.whenStable().then(() => {
          initMd = component.matchday;
          component.nextD();
          fixture.whenStable().then(() => {
            expect(component.matchday).toBe(initMd);
          });
        });
      }));

      it(`Test n°${++num}:Should previous button not decrement matchday if first matchDay`,  async(() => {
        fixture.detectChanges();
        ConfigTestingData.key = 'oneDayCompet';
        component.ngOnInit();
        fixture.whenStable().then(() => {
          initMd = component.matchday;
          component.lastD();
          fixture.whenStable().then(() => {
            expect(component.matchday).toBe(initMd);
          });
        });
      }));
    });
  });
});
