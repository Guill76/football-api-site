import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LiveService } from './live.service';
import { FootDbApiService } from './foot-db-api.service';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';
describe('LiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [LiveService, NotificationService, ConfigService, FootDbApiService ]
    });
  });

  it('should be created', inject([LiveService], (service: LiveService) => {
    expect(service).toBeTruthy();
  }));
});
