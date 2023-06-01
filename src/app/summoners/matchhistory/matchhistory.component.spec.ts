import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchhistoryService } from '../matchhistory.service';
import { MatchhistoryComponent } from './matchhistory.component';
import { AppConfigService } from 'src/app/config/app-config.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MatchhistoryComponent', () => {
  let component: MatchhistoryComponent;
  let fixture: ComponentFixture<MatchhistoryComponent>;

  beforeEach(async () => {
    const mockAppConfigService: Partial<AppConfigService> = {
      matchhistoryUrl: 'http://localhost:8080/api/matchhistory',
    };

    await TestBed.configureTestingModule({
      declarations: [MatchhistoryComponent],
      imports: [HttpClientTestingModule],
      providers: [
        MatchhistoryService,
        { provide: AppConfigService, useValue: mockAppConfigService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add the CUSTOM_ELEMENTS_SCHEMA here to ignore the loadingspinner
    }).compileComponents();

    fixture = TestBed.createComponent(MatchhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
