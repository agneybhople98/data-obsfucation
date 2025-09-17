import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiLoadingModalComponent } from './ai-loading-modal.component';

describe('AiLoadingModalComponent', () => {
  let component: AiLoadingModalComponent;
  let fixture: ComponentFixture<AiLoadingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiLoadingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiLoadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
