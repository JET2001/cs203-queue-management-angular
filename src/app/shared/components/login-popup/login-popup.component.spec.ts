import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared.module';
import { LoginPopupComponent } from './login-popup.component';

describe('LoginPopupComponent', () => {
  let component: LoginPopupComponent;
  let fixture: ComponentFixture<LoginPopupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopupComponent],
      imports:[SharedModule, HttpClientTestingModule],
      providers: [NgbActiveModal]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
