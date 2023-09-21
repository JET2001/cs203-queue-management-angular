import { TestBed } from '@angular/core/testing';

import { BaseRestApiService } from './base-rest-api.service';

describe('BaseRestApiService', () => {
  let service: BaseRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
