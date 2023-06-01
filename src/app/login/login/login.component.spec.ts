import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken, Injector } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  CookieService,
  CookieOptionsProvider,
  CookieOptions,
  COOKIE_WRITER,
} from 'ngx-cookie';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        CookieService,
        AuthService,
        {
          provide: CookieOptionsProvider,
          useFactory: () =>
            new CookieOptionsProvider(
              mockCookieOptions,
              TestBed.inject(Injector)
            ),
        },
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
