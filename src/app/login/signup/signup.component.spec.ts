import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';
import { CookieModule, CookieService } from 'ngx-cookie';
import { PasswordMatcherDirective } from 'src/app/directives/password-matcher/password-matcher.directive';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent, PasswordMatcherDirective],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CookieModule.withOptions(),
      ],
      providers: [AuthService, CookieService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    spyOn(authService, 'isUserLoggedIn').and.returnValue(true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
