import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaRegistrationPopupComponent } from './ga-registration-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

describe('GaRegistrationPopupComponent', () => {
  let component: GaRegistrationPopupComponent;
  let fixture: ComponentFixture<GaRegistrationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaRegistrationPopupComponent],
      imports: [SharedModule],
      providers: [NgbActiveModal]
    });
    fixture = TestBed.createComponent(GaRegistrationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
