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
import { SummonersComponent } from '../summoners/summoners.component';

describe('SummonersComponent', () => {
  let component: SummonersComponent;
  let fixture: ComponentFixture<SummonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummonersComponent],
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

    fixture = TestBed.createComponent(SummonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
