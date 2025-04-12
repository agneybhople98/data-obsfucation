import { TestBed } from '@angular/core/testing';

import { ObsfucationService } from './obsfucation.service';

describe('ObsfucationService', () => {
  let service: ObsfucationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObsfucationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
