import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FootDbApiService } from '../../foot-db-api.service';
import { NotificationService } from '../../notification.service';
import { SoccerPitchComponent } from './soccer-pitch.component';
import { SoccerPitchService } from '../../soccer-pitch.service';
import { UsersService } from '../../users.service';
import { ConfigService } from '../../config.service';
import { WebsocketService } from '../../websocket.service';
describe('SoccerPitchComponent', () => {
  let component: SoccerPitchComponent;
  let fixture: ComponentFixture<SoccerPitchComponent>;
  let serviceDb: FootDbApiService;
  let serviceNotif: NotificationService;
  let serviceUsers: UsersService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ BrowserModule, HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ SoccerPitchComponent ],
      providers: [ NotificationService, FootDbApiService, UsersService, SoccerPitchService, ConfigService, WebsocketService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerPitchComponent);
    component = fixture.componentInstance;
    serviceDb = fixture.componentRef.injector.get(FootDbApiService);
    serviceNotif = fixture.componentRef.injector.get(NotificationService);
    serviceUsers = fixture.componentRef.injector.get(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
