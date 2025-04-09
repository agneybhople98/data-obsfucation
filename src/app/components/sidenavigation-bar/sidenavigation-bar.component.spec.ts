import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavigationBarComponent } from './sidenavigation-bar.component';

describe('SidenavigationBarComponent', () => {
  let component: SidenavigationBarComponent;
  let fixture: ComponentFixture<SidenavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavigationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
