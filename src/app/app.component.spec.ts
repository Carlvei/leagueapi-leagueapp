import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-navbar', template: '' })
class MockNavbarComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavbarComponent],
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

  it('should render content', () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);

    // When
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Then
    expect(compiled.querySelector('.content')).toBeTruthy()
  });
});
