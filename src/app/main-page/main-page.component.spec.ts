import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FootDbApiService } from '../foot-db-api.service';
import { NotificationService } from '../notification.service';
// import { SoccerPitchComponent } from './soccer-pitch.component';
// import { SoccerPitchService } from '../soccer-pitch.service';
import { UsersService } from '../users.service';
import { ConfigService } from '../config.service';
import { WebsocketService } from '../websocket.service';
import { FirstToUpperPipe } from '../first-to-upper.pipe';
import { MainPageComponent } from './main-page.component';
// import { componentFactoryName } from '@angular/compiler';
@Component(
  {template: ''}
)
class LoginComponent {}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([
                      {path : 'login', component: LoginComponent},
                      {path: '', redirectTo: 'login', pathMatch: 'full'}
                  ] ), ReactiveFormsModule, HttpModule ],
      declarations: [ MainPageComponent, FirstToUpperPipe, LoginComponent],
      providers: [UsersService, NotificationService, ConfigService, WebsocketService]
    })
    .compileComponents().catch(err => console.log(err));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', async(() => {
    fixture.detectChanges();
    setTimeout(() => {
      expect(component).toBeDefined();
    }, 100);
  }));
});
