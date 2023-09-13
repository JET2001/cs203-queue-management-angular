import { TestBed } from '@angular/core/testing';

import { StoreRegistrationGroupInfoService } from './store-registration-group-info.service';

describe('StoreRegistrationGroupInfoService', () => {
  let service: StoreRegistrationGroupInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreRegistrationGroupInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
