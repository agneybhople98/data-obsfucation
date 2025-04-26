import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsfucationPlan } from './obsfucation-plan.component';

describe('ObsfucationPlan', () => {
  let component: ObsfucationPlan;
  let fixture: ComponentFixture<ObsfucationPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObsfucationPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsfucationPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
