import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ConfigService } from './config.service';

import { SoccerPitchService } from './soccer-pitch.service';

describe('SoccerPitchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SoccerPitchService, ConfigService]
    });
  });

  it('should be created', inject([SoccerPitchService], (service: SoccerPitchService) => {
    expect(service).toBeTruthy();
  }));
});
