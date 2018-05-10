import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FootballPageComponent } from './football-page.component';
import { HttpModule } from '@angular/http';
import { FootDbApiService } from '../foot-db-api.service';
import { NotificationService } from '../notification.service';
import { LiveService } from '../live.service';
import { ConfigService } from '../config.service';
describe('FootballPageComponent', () => {
  let component: FootballPageComponent;
  let fixture: ComponentFixture<FootballPageComponent>;
  let serviceDb: FootDbApiService;
  let serviceNotif: NotificationService;
  let serviceLive: LiveService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ BrowserModule, HttpModule,  RouterTestingModule],
      declarations: [ FootballPageComponent ],
      providers: [LiveService, NotificationService, FootDbApiService, ConfigService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballPageComponent);
    serviceDb = fixture.componentRef.injector.get(FootDbApiService);
    serviceNotif = fixture.componentRef.injector.get(NotificationService);
    serviceLive = fixture.componentRef.injector.get(LiveService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
