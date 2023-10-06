import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentValidationComponent } from './payment-validation.component';

describe('PaymentValidationComponent', () => {
  let component: PaymentValidationComponent;
  let fixture: ComponentFixture<PaymentValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentValidationComponent]
    });
    fixture = TestBed.createComponent(PaymentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
