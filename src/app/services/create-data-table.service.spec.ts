import { TestBed } from '@angular/core/testing';

import { CreateDataTableService } from './create-data-table.service';

describe('CreateDataTableService', () => {
  let service: CreateDataTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
