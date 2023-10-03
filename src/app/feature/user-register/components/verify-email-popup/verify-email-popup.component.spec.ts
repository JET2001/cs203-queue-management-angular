import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailPopupComponent } from './verify-email-popup.component';

describe('VerifyEmailPopupComponent', () => {
  let component: VerifyEmailPopupComponent;
  let fixture: ComponentFixture<VerifyEmailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailPopupComponent]
    });
    fixture = TestBed.createComponent(VerifyEmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
