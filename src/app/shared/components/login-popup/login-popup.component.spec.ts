import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupComponent } from './login-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputFieldComponent } from '../input-field/input-field.component';
import { TextButtonComponent } from '../text-button/text-button.component';
import { SharedModule } from '../../shared.module';

describe('LoginPopupComponent', () => {
  let component: LoginPopupComponent;
  let fixture: ComponentFixture<LoginPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopupComponent],
      imports:[SharedModule],
      providers: [NgbActiveModal]
    });
    fixture = TestBed.createComponent(LoginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
