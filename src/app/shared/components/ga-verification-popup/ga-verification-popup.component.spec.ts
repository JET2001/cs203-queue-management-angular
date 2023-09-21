import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaVerificationPopupComponent } from './ga-verification-popup.component';
import { SharedModule } from '../../shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('GaVerificationPopupComponent', () => {
  let component: GaVerificationPopupComponent;
  let fixture: ComponentFixture<GaVerificationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaVerificationPopupComponent],
      imports: [SharedModule],
      providers: [NgbActiveModal],
    });
    fixture = TestBed.createComponent(GaVerificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
