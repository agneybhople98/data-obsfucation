import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObfuscationPlanComponent } from './create-obfuscation.component';

describe('CreateObfuscationPlanComponent', () => {
  let component: CreateObfuscationPlanComponent;
  let fixture: ComponentFixture<CreateObfuscationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateObfuscationPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateObfuscationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
