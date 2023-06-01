import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken, Injector } from '@angular/core';
import { CookieService, CookieOptionsProvider, CookieOptions, COOKIE_WRITER } from 'ngx-cookie';
import { LoginComponent } from 'src/app/login/login/login.component';
import { AuthService } from 'src/app/login/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const COOKIE_OPTIONS: InjectionToken<CookieOptions> = new InjectionToken<CookieOptions>('COOKIE_OPTIONS');

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
  let activatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        CookieService,
        AuthService,
        {
          provide: CookieOptionsProvider,
          useFactory: () =>
            new CookieOptionsProvider(mockCookieOptions, TestBed.inject(Injector)),
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
          provide: ActivatedRoute,
          useValue: activatedRoute,
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
