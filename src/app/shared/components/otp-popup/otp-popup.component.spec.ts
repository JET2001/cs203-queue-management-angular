import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPopupComponent } from './otp-popup.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../../shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

describe('OtpPopupComponent', () => {
  let component: OtpPopupComponent;
  let fixture: ComponentFixture<OtpPopupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpPopupComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [NgbActiveModal],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(OtpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
