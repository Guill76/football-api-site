import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
// import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
// import { FooterComponent } from './footer/footer.component';



import {
  RouterTestingModule
} from '@angular/router/testing';
@Component({
  selector: 'app-header-navbar',
  template: '',
  styleUrls: ['./header-navbar/header-navbar.component.css']
})
class HeaderNavbarComponent { }
@Component({
  selector: '<app-footer></app-footer>',
  template: '',
  styleUrls: ['./footer/footer.component.css']
})
class FooterComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderNavbarComponent,
        FooterComponent
      ],
      imports: [
          RouterTestingModule
        ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should have a router-outlet tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeDefined();
  }));
});
