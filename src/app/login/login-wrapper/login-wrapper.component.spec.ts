import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginWrapperComponent } from './login-wrapper.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../login/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  COOKIE_WRITER,
  CookieOptions,
  CookieService,
  CookieOptionsProvider,
} from 'ngx-cookie';
import { InjectionToken } from '@angular/core';

const COOKIE_OPTIONS: InjectionToken<CookieOptions> =
  new InjectionToken<CookieOptions>('COOKIE_OPTIONS');

const mockCookieOptions: CookieOptions = {
  path: '/',
  domain: 'example.com',
  expires: new Date(),
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
  storeUnencoded: false,
};

describe('LoginWrapperComponent', () => {
  let component: LoginWrapperComponent;
  let fixture: ComponentFixture<LoginWrapperComponent>;
  let authService: AuthService;
  let isUserLoggedInSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginWrapperComponent, LoginComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        CookieService,
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map(),
            },
          },
        },
        {
          provide: COOKIE_OPTIONS,
          useValue: mockCookieOptions,
        },
        {
          provide: COOKIE_WRITER,
          useValue: {},
        },
        {
          provide: CookieOptionsProvider,
          useValue: {
            provide: COOKIE_OPTIONS,
            useValue: mockCookieOptions,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginWrapperComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    isUserLoggedInSpy = spyOn(authService, 'isUserLoggedIn').and.returnValue(
      true
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
