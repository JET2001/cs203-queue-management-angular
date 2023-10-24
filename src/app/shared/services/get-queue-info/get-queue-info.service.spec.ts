import { TestBed } from '@angular/core/testing';

import { GetQueueInfoService } from './get-queue-info.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GetQueueInfoService', () => {
  let service: GetQueueInfoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GetQueueInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
