import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './login/auth.service';
import { Observable, of } from 'rxjs';

class MockAuthService {
  user: Observable<any> = of({});
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavbarComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);

    // When
    const app = fixture.componentInstance;

    // Then
    expect(app).toBeTruthy();
  });

  it(`should have as title 'leagueapp'`, () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);

    // When
    const app = fixture.componentInstance;

    // Then
    expect(app.title).toEqual('leagueapp');
  });

  it('should render title', () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // When
    const compiled = fixture.nativeElement as HTMLElement;

    // Then
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'leagueapp app is running!'
    );
  });
});
