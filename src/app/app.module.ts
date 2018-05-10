import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FootballPageComponent } from './football-page/football-page.component';
import { FootResultsComponent } from './football-page/foot-results/foot-results.component';
import { SoccerPitchComponent } from './football-page/soccer-pitch/soccer-pitch.component';

import { ConfigService } from './config.service';
import { UsersService } from './users.service';
import { TimerService } from './timer.service';
import { NotificationService } from './notification.service';
import { SoccerPitchService } from './soccer-pitch.service';
import { FootDbApiService } from './foot-db-api.service';
import { LiveService } from './live.service';
import { WebsocketService } from './websocket.service'

import { FirstToUpperPipe } from './first-to-upper.pipe';
import { FootballTeamsComponent } from './football-page/football-teams/football-teams.component';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainPageComponent,
    data: { title: 'Welcome' }
  },
  {
    path: 'soccer-results',
    component: FootballPageComponent,
    children: [{
      path: 'results/:id',
      component: FootResultsComponent,
      outlet: 'resultOut',
      children:[{
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
  },
  {
    path: 'soccerPitch',
    component: SoccerPitchComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  { path: '',  
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavbarComponent,
    FooterComponent,
    LoginComponent,
    MainPageComponent,
    LogoutComponent,
    FirstToUpperPipe,
    FootballPageComponent,
    FootResultsComponent,
    SoccerPitchComponent,
    FootballTeamsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes),
    HttpModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ConfigService,UsersService, TimerService, NotificationService, FootDbApiService, LiveService, SoccerPitchService, WebsocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
