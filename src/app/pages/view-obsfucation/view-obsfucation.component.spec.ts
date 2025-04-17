import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObsfucationComponent } from './view-obsfucation.component';

describe('ViewObsfucationComponent', () => {
  let component: ViewObsfucationComponent;
  let fixture: ComponentFixture<ViewObsfucationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewObsfucationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewObsfucationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
