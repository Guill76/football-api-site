import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
//import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { FooterComponent } from './footer/footer.component';



import {
  RouterTestingModule
} from '@angular/router/testing';
@Component({
  selector: 'app-header-navbar',
  template: '',
  styleUrls: ['./header-navbar/header-navbar.component.css']
})
class HeaderNavbarComponent { }

// @NgModule({
//   declarations: [MockLoginComponent],
//   exports:      [MockLoginComponent]
// })
// class MockModule { }

// class MockRouter { public navigate() {}; }

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

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));
});
