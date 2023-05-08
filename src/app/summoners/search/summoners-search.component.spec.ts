import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonersSearchComponent } from './summoners-search.component';

describe('SearchComponent', () => {
  let component: SummonersSearchComponent;
  let fixture: ComponentFixture<SummonersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummonersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
