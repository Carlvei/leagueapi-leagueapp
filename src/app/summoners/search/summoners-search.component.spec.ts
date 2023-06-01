import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SummonersSearchComponent } from './summoners-search.component';
import { ActivatedRoute } from '@angular/router';

describe('SummonersSearchComponent', () => {
  let component: SummonersSearchComponent;
  let fixture: ComponentFixture<SummonersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummonersSearchComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map(),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummonersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
