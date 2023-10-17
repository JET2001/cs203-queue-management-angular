import { TestBed } from '@angular/core/testing';
import { GetShowInfoService } from './get-show-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('GetShowInfoService', () => {
  let service: GetShowInfoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });    service = TestBed.inject(GetShowInfoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
