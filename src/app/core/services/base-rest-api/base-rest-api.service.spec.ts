import { TestBed } from '@angular/core/testing';

import { BaseRestApiService } from './base-rest-api.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { baseURL } from '../../constants/api-paths';

class TestingApiService1 extends BaseRestApiService {
  protected override httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      email: 'abc@example.com',
      password: 'abc',
    }),
    body: {
      userID: '1112222333444-55555',
      showID: '1',
      eventID: '2',
    },
  };
}

describe('BaseRestApiService', () => {
  let service: BaseRestApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [HttpClient, TestingApiService1, HttpHandler]
    });
    service = TestBed.inject(TestingApiService1);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
