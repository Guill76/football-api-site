import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerPitchComponent } from './soccer-pitch.component';

describe('SoccerPitchComponent', () => {
  let component: SoccerPitchComponent;
  let fixture: ComponentFixture<SoccerPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
