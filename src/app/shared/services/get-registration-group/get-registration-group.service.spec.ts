import { TestBed } from '@angular/core/testing';

import { GetRegistrationGroupService } from './get-registration-group.service';

describe('GetRegistrationGroupService', () => {
  let service: GetRegistrationGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRegistrationGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
