import { TestBed, inject } from '@angular/core/testing';

import { SoccerPitchService } from './soccer-pitch.service';

describe('SoccerPitchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoccerPitchService]
    });
  });

  it('should be created', inject([SoccerPitchService], (service: SoccerPitchService) => {
    expect(service).toBeTruthy();
  }));
});
