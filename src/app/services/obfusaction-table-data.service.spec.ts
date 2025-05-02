import { TestBed } from '@angular/core/testing';

import { ObfusactionTableDataService } from './obfusaction-table-data.service';

describe('ObfusactionTableDataService', () => {
  let service: ObfusactionTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObfusactionTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
