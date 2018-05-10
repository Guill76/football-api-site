import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballTeamsComponent } from './football-teams.component';

describe('FootballTeamsComponent', () => {
  let component: FootballTeamsComponent;
  let fixture: ComponentFixture<FootballTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
