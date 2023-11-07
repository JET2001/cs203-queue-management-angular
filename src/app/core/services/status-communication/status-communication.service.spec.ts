import { TestBed } from '@angular/core/testing';

import { StatusCommunicationService } from './status-communication.service';

describe('StatusCommunicationService', () => {
  let service: StatusCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
