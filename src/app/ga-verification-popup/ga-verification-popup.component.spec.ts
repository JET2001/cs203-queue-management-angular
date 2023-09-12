import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaVerificationPopupComponent } from './ga-verification-popup.component';

describe('GaVerificationPopupComponent', () => {
  let component: GaVerificationPopupComponent;
  let fixture: ComponentFixture<GaVerificationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaVerificationPopupComponent]
    });
    fixture = TestBed.createComponent(GaVerificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
