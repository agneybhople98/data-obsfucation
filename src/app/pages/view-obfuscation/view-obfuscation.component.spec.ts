import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObfuscationPlanComponent } from './view-obfuscation.component';

describe('ViewObfuscationPlanComponent', () => {
  let component: ViewObfuscationPlanComponent;
  let fixture: ComponentFixture<ViewObfuscationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewObfuscationPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewObfuscationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
