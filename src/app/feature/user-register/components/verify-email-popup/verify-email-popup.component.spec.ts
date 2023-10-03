import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailPopupComponent } from './verify-email-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

describe('VerifyEmailPopupComponent', () => {
  let component: VerifyEmailPopupComponent;
  let fixture: ComponentFixture<VerifyEmailPopupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailPopupComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [NgbActiveModal],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(VerifyEmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
