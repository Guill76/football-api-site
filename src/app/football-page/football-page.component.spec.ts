import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballPageComponent } from './football-page.component';

describe('FootballPageComponent', () => {
  let component: FootballPageComponent;
  let fixture: ComponentFixture<FootballPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
