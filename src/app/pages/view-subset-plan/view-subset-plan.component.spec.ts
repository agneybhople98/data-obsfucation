import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubsetPlanComponent } from './view-subset-plan.component';

describe('ViewSubsetPlanComponent', () => {
  let component: ViewSubsetPlanComponent;
  let fixture: ComponentFixture<ViewSubsetPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSubsetPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSubsetPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
