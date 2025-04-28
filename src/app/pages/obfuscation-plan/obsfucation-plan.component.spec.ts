import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObfuscationPlan } from './obfuscation-plan.component';

describe('ObfuscationPlan', () => {
  let component: ObfuscationPlan;
  let fixture: ComponentFixture<ObfuscationPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObfuscationPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(ObfuscationPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
