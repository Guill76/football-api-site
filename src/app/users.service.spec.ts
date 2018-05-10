import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { WebsocketService } from './websocket.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UsersService, ConfigService, NotificationService, WebsocketService]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
