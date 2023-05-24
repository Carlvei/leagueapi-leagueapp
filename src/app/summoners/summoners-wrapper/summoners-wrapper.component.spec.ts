import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonersWrapperComponent } from './summoners-wrapper.component';

describe('SummonersWrapperComponent', () => {
  let component: SummonersWrapperComponent;
  let fixture: ComponentFixture<SummonersWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummonersWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
