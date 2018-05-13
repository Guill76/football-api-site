import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FootDbApiService } from '../../foot-db-api.service';
import { NotificationService } from '../../notification.service';
import { FootballTeamsComponent } from './football-teams.component';



describe('FootballTeamsComponent', () => {
  let component: FootballTeamsComponent;
  let fixture: ComponentFixture<FootballTeamsComponent>;
  let service: FootDbApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [ FootballTeamsComponent ],
      providers: [ FootDbApiService, NotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FootballTeamsComponent);
    service = fixture.componentRef.injector.get(FootDbApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
