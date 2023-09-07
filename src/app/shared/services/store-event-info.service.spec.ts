import { TestBed } from '@angular/core/testing';

import { StoreEventInfoService } from './store-event-info.service';

describe('StoreEventInfoService', () => {
  let service: StoreEventInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreEventInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the eventID when set', () => {
    service.eventID = 2;
    expect(service.eventID).toEqual(2);
  });
});
