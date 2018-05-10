import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootResultsComponent } from './foot-results.component';

describe('FootResultsComponent', () => {
  let component: FootResultsComponent;
  let fixture: ComponentFixture<FootResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
