import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CookieService,
  CookieOptionsProvider,
  COOKIE_OPTIONS,
  COOKIE_WRITER,
} from 'ngx-cookie';

import { SummonersService } from '../summoners.service';
import { AuthService } from 'src/app/login/auth.service';
import { SummonersWrapperComponent } from './summoners-wrapper.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-summoners', template: '' })
class MockSummonersComponent {
}

describe('SummonersWrapperComponent', () => {
  let component: SummonersWrapperComponent;
  let fixture: ComponentFixture<SummonersWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummonersWrapperComponent, MockSummonersComponent],
      imports: [HttpClientTestingModule],
      providers: [
        SummonersService,
        AuthService,
        CookieService,
        CookieOptionsProvider,
        { provide: COOKIE_OPTIONS, useValue: {} },
        { provide: COOKIE_WRITER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummonersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
