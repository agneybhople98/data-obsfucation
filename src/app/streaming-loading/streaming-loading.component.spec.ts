import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingLoadingComponent } from './streaming-loading.component';

describe('StreamingLoadingComponent', () => {
  let component: StreamingLoadingComponent;
  let fixture: ComponentFixture<StreamingLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamingLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
