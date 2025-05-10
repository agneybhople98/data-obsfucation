import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubsetComponent } from './create-subset.component';

describe('CreateSubsetComponent', () => {
  let component: CreateSubsetComponent;
  let fixture: ComponentFixture<CreateSubsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubsetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
