import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobControlComponent } from './job-control.component';

describe('JobControlComponent', () => {
  let component: JobControlComponent;
  let fixture: ComponentFixture<JobControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
