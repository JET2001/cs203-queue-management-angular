import { TestBed } from '@angular/core/testing';

import {
  StoreEventInfoService
} from './store-event-info.service';

describe('StoreEventInfoService', () => {
  let service: StoreEventInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreEventInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should store the eventInfo when set', () => {
  //   service.eventInfo = {
  //     eventID: 3,
  //     userID: 4,
  //   };
  //   expect(service.eventInfo.eventID).toEqual(3);
  //   expect(service.eventInfo.userID).toEqual(4);
  // });

  // it('should be able to set eventID without userID', () => {
  //   service.eventInfo = {
  //     eventID: 4,
  //   };
  //   expect(service.eventInfo.eventID).toEqual(4);
  //   expect(service.eventInfo.userID).toBeFalsy();
  // });
});
