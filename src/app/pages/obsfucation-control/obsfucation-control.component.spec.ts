import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsfucationControl } from './obsfucation-control.component';

describe('ObsfucationControl', () => {
  let component: ObsfucationControl;
  let fixture: ComponentFixture<ObsfucationControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObsfucationControl],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsfucationControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
