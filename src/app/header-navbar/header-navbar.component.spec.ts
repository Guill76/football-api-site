import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { UsersService } from '../users.service';
import { NotificationService } from '../notification.service';
import { ConfigService } from '../config.service';
import { LiveService } from '../live.service';
import { WebsocketService } from '../websocket.service';
import { FootDbApiService } from '../foot-db-api.service';
import { FirstToUpperPipe } from '../first-to-upper.pipe';

import { HeaderNavbarComponent } from './header-navbar.component';

describe('HeaderNavbarComponent', () => {
  let component: HeaderNavbarComponent;
  let fixture: ComponentFixture<HeaderNavbarComponent>;
  let servConfig: ConfigService;
  let servUser: UsersService;
  let servNot: NotificationService;
  let servLive: LiveService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [ UsersService, ConfigService, WebsocketService, NotificationService, LiveService, FootDbApiService ],
      declarations: [ HeaderNavbarComponent, FirstToUpperPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavbarComponent);
    servConfig = fixture.componentRef.injector.get(ConfigService);
    servUser = fixture.componentRef.injector.get(UsersService);
    servNot = fixture.componentRef.injector.get(NotificationService);
    servLive = fixture.componentRef.injector.get(LiveService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
