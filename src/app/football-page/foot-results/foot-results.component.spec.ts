import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { throwError as observableThrowError,  Observable } from 'rxjs';

import { FootResultsComponent, MODES } from './foot-results.component';
import { browser } from 'protractor';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FootDbApiService } from '../../foot-db-api.service';
import { NotificationService } from '../../notification.service';

import { serviceRes, MockFootDbApiService } from './foot-result-mock-service';


@Component(
  {
  template: ''
  }
) class FootballPageComponent {}
describe('FootResultsComponent', () => {
  let component: FootResultsComponent;
  let serviceDb: FootDbApiService;
  // let serviceNotif: NotificationService;
  let fixture: ComponentFixture<FootResultsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ BrowserModule, HttpModule, FormsModule, RouterTestingModule.withRoutes(
        [{
          path: 'soccer-results',
          component: FootballPageComponent
        }]
      )],
      providers: [FootDbApiService, NotificationService],
      declarations: [ FootResultsComponent, FootballPageComponent ]
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
    // serviceDb = TestBed.get(FootDbApiService);
    // serviceNotif = fixture.componentRef.injector.get(NotificationService);
    component = fixture.componentInstance;
    serviceDb = TestBed.get(FootDbApiService);
    // spyOn( serviceDb, 'getObsRequest').and.returnValue(Observable.of(res));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have got some results after onInit',  async(() => {
      fixture.detectChanges();
      component.ngOnInit();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.results).toBeDefined();
        expect(component.results.length).toBe(6);
        expect(component.filterRes.length).toBe(2);
      });
  }));
  it('should get the matchday after on init and the total of fixtures',  async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.matchday).toBe(2);
      expect(component.numOfFix).toBe(3);
    });
  }));
  it('Should check the default mode to be result view',  async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.mode).toBe(MODES.RESULTS);
    });
  }));
  it('Should compute the next matchday',  async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.nextMatchday.toLocaleDateString()).
        toBe(new Date('2018-05-20T14:00:00Z').toLocaleDateString());
    });
  }));
  it('Should build and switch to the table league view',  async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.tableLeagueClicked();
      expect(component.mode).toBe(MODES.LEAGUETABLE);
    });
  }));
  it('Should switch to the result view',  async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.resultsClicked();
      expect(component.mode).toBe(MODES.RESULTS);
    });
  }));

});
