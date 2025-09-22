import { TestBed } from '@angular/core/testing';

import { LlmStreamingService } from './llm-streaming.service';

describe('LlmStreamingService', () => {
  let service: LlmStreamingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlmStreamingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
