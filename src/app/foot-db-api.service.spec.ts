import { TestBed, inject } from '@angular/core/testing';

import { FootDbApiService } from './foot-db-api.service';
import { NotificationService } from './notification.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
// import { Http, HttpClient, HttpXhrBackend, HttpResponse } from '@angular/common/http';

describe('FootDbApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FootDbApiService, NotificationService]
    });
  });

  it('should be created', inject([FootDbApiService], (service: FootDbApiService) => {
    expect(service).toBeTruthy();
  }));
});
