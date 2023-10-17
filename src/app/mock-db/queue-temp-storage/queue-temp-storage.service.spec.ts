import { TestBed } from '@angular/core/testing';

import { QueueTempStorageService } from './queue-temp-storage.service';

describe('QueueTempStorageService', () => {
  let service: QueueTempStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueTempStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
