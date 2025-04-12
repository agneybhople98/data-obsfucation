import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObsfucationComponent } from './create-obsfucation.component';

describe('CreateObsfucationComponent', () => {
  let component: CreateObsfucationComponent;
  let fixture: ComponentFixture<CreateObsfucationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateObsfucationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateObsfucationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
