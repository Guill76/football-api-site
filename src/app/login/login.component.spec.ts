import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError as observableThrowError,  Observable } from 'rxjs';

import { NotificationService } from '../notification.service';
// import { SoccerPitchService } from '../../soccer-pitch.service';
import { UsersService } from '../users.service';
import { ConfigService } from '../config.service';
import { WebsocketService } from '../websocket.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let userService: UsersService;
  let notif: NotificationService;
  let isConnected = false;
  let navigate = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [UsersService, ConfigService, WebsocketService, NotificationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    isConnected = false;
    navigate = false;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    notif = TestBed.get(NotificationService);
    userService = TestBed.get(UsersService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it ('Should can connect in onInit', async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      const userName = component.rForm.controls['login'];
      const passWord = component.rForm.controls['password'];
      fixture.whenStable().then( () => {
        fixture.detectChanges();
        userName.setValue('guill');
        passWord.setValue('guill');
        // fixture.detectChanges();
        fixture.whenStable().then( () => {
          setTimeout( () => {
            // expect(component.rForm.valid).toBe(false);
            console.log(component.rForm.valid);
            expect(component.rForm.valid).toBe(true);
          }, 500);
        });
      });
    });
  }));

  it ('Should cannot connect in onInit with unauthorized user', async(() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      const userName = component.rForm.controls['login'];
      const passWord = component.rForm.controls['password'];
      fixture.whenStable().then( () => {
        fixture.detectChanges();
        userName.setValue('chuck');
        passWord.setValue('guill');
        // fixture.detectChanges();
        fixture.whenStable().then( () => {
          setTimeout( () => {
            // expect(component.rForm.valid).toBe(false);
            console.log(component.rForm.valid);
            expect(component.rForm.valid).toBe(false);
          }, 200);
        });
      });
    });
  }));

  it ('Should check is connected in onInit', async(() => {
    fixture.detectChanges();
    spyOn(userService, 'isConnected').and.callFake( () => {
      isConnected = true;
      return true;
    });
    spyOn(router, 'navigate').and.callFake( () => {
      navigate = true;
    });
    component.ngOnInit();
    fixture.whenStable().then( () => {
      expect(isConnected).toBe(true);
      expect(navigate).toBe(true);
    });
  }));

  it ('Should not can connect if error', async(() => {
    fixture.detectChanges();
    spyOn(userService, 'isConnected').and.callFake( () => {
      isConnected = true;
      return true;
    });
    spyOn(router, 'navigate').and.callFake( () => {
      navigate = true;
    });
    component.ngOnInit();
    fixture.whenStable().then( () => {
      component.connect();
      expect(component.isAuthenticated).not.toBe(true);
    });
  }));

  it ('Should cannot connect if connect is direct', async(() => {
    fixture.detectChanges();
    component.connect();
    fixture.whenStable().then( () => {
      expect(component.isAuthenticated).not.toBe(true);
    });
  }));

});
