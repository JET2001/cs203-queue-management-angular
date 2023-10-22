import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentValidationComponent } from './payment-validation.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesModule } from 'primeng/messages';

describe('PaymentValidationComponent', () => {
  let component: PaymentValidationComponent;
  let fixture: ComponentFixture<PaymentValidationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentValidationComponent, HeaderComponent, InputFieldComponent, TextButtonComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, TextMaskModule, RouterTestingModule, MessagesModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PaymentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
