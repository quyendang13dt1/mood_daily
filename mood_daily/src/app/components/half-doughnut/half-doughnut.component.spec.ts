import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfDoughnutComponent } from './half-doughnut.component';

describe('HalfDoughnutComponent', () => {
  let component: HalfDoughnutComponent;
  let fixture: ComponentFixture<HalfDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfDoughnutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
