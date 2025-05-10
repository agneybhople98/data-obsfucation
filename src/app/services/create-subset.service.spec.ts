import { TestBed } from '@angular/core/testing';

import { CreateSubsetService } from './create-subset.service';

describe('CreateSubsetService', () => {
  let service: CreateSubsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSubsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
