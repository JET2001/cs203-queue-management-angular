import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentValidationComponent } from './payment-validation.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesModule } from 'primeng/messages';
import { StoreUserInfoService } from 'src/app/shared/services/store-user-info/store-user-info.service';
import { of } from 'rxjs';

describe('PaymentValidationComponent', () => {
  let component: PaymentValidationComponent;
  let fixture: ComponentFixture<PaymentValidationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let storeUserInfoService: StoreUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentValidationComponent,
        HeaderComponent,
        InputFieldComponent,
        TextButtonComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TextMaskModule,
        RouterTestingModule,
        MessagesModule,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    storeUserInfoService = TestBed.inject(StoreUserInfoService);
    fixture = TestBed.createComponent(PaymentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show save card button', () => {
    component.cardNumberFC.setValue('4032031913843438');
    component.expDateFC.setValue('0425');
    component.nameFC.setValue('John Doe');
    component.streetFC.setValue('Sesame Street');
    component.cityFC.setValue('Singapore');
    component.stateFC.setValue('Singapore');
    component.zipFC.setValue('512345');
    component.emailFC.setValue('johndoe@gmail.com');
    component.mobileFC.setValue('+6581234567');
    component.billingFG.markAllAsTouched();
    component.cardNumberFG.markAllAsTouched();

    fixture.detectChanges();
    const result = component.showSaveButton();

    expect(result).toBe(true);
  });

  it('should not show save card button', () => {
    component.cardNumberFC.setValue('403203191384343');
    component.expDateFC.setValue('0425');
    component.nameFC.setValue('John Doe');
    component.streetFC.setValue('Sesame Street');
    component.cityFC.setValue('Singapore');
    component.stateFC.setValue('Singapore');
    component.zipFC.setValue('512345');
    component.emailFC.setValue('johndoe@gmail.com');
    component.mobileFC.setValue('+6581234567');
    component.billingFG.markAllAsTouched();
    component.cardNumberFG.markAllAsTouched();

    fixture.detectChanges();
    const result = component.showSaveButton();

    expect(result).toBe(false);
  });

  it('should save card', () => {
    const storePaymentSpy = spyOn(storeUserInfoService, 'storePaymentInfo').and.returnValue(of(false));
    component.cardNumberFC.setValue('4032031913843438');
    component.expDateFC.setValue('0425');
    component.nameFC.setValue('John Doe');
    component.streetFC.setValue('Sesame Street');
    component.cityFC.setValue('Singapore');
    component.stateFC.setValue('Singapore');
    component.zipFC.setValue('512345');
    component.emailFC.setValue('johndoe@gmail.com');
    component.mobileFC.setValue('+6581234567');
    component.billingFG.markAllAsTouched();
    component.cardNumberFG.markAllAsTouched();

    fixture.detectChanges();
    component.saveCard();

    expect(storePaymentSpy).toHaveBeenCalled();
  });
});
