import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsetPlanComponent } from './subset-plan.component';

describe('SubsetPlanComponent', () => {
  let component: SubsetPlanComponent;
  let fixture: ComponentFixture<SubsetPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsetPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsetPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
