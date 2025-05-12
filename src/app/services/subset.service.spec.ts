import { TestBed } from '@angular/core/testing';

import { SubsetService } from './subset.service';

describe('SubsetService', () => {
  let service: SubsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
