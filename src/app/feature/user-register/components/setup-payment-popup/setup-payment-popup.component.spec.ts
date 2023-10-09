import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPaymentPopupComponent } from './setup-payment-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('SetupPaymentPopupComponent', () => {
  let component: SetupPaymentPopupComponent;
  let fixture: ComponentFixture<SetupPaymentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupPaymentPopupComponent, TextButtonComponent],
      providers: [NgbActiveModal]
    });
    fixture = TestBed.createComponent(SetupPaymentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
