import { TestBed } from '@angular/core/testing';

import { GetQueueInfoService } from './get-queue-info.service';

describe('GetQueueInfoService', () => {
  let service: GetQueueInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQueueInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
