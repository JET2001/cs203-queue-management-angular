import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { StoreRegistrationGroupInfoService } from './store-registration-group-info.service';

describe('StoreRegistrationGroupInfoService', () => {
  let service: StoreRegistrationGroupInfoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StoreRegistrationGroupInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
