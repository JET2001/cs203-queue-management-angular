import { TestBed } from '@angular/core/testing';

import { GetShowInfoService } from './get-show-info.service';

describe('GetShowInfoService', () => {
  let service: GetShowInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShowInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
