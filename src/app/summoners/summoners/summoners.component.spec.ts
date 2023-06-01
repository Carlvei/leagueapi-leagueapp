import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SummonersComponent } from './summoners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SummonersService } from '../summoners.service';
import { AuthService } from 'src/app/login/auth.service';
import {
  COOKIE_WRITER,
  CookieOptions,
  CookieOptionsProvider,
  CookieService,
} from 'ngx-cookie';
import { InjectionToken, Injector } from '@angular/core';



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

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (name: string) => 'test',
    },
  },
};

describe('SummonersComponent', () => {
  let component: SummonersComponent;
  let fixture: ComponentFixture<SummonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SummonersComponent],
      providers: [
        SummonersService,
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
          useValue: mockActivatedRoute,
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

    fixture = TestBed.createComponent(SummonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
