import { TestBed, inject } from '@angular/core/testing';

import { FootDbApiService } from './foot-db-api.service';

describe('FootDbApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootDbApiService]
    });
  });

  it('should be created', inject([FootDbApiService], (service: FootDbApiService) => {
    expect(service).toBeTruthy();
  }));
});
