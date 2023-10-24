import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AccountCreationComponent } from './account-creation.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { MessagesModule } from 'primeng/messages';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { of } from 'rxjs';

describe('AccountCreationComponent', () => {
  let component: AccountCreationComponent;
  let fixture: ComponentFixture<AccountCreationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let getUserInfoService: GetUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountCreationComponent,
        HeaderComponent,
        TextButtonComponent,
        InputFieldComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TextMaskModule,
        MessagesModule,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    getUserInfoService = TestBed.inject(GetUserInfoService);
    fixture = TestBed.createComponent(AccountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error if email already exists', fakeAsync(() => {
    component.emailFC.setValue('abc@gmail.com');
    spyOn(getUserInfoService, 'loadUserInfo').and.returnValue(of(true));
    // trigger change detection
    component.verifyEmail();
    fixture.detectChanges();
    const emailExistsFailure =
      fixture.nativeElement.querySelector('.failure-message');
    expect(emailExistsFailure).toBeTruthy();
  }));

  it('should render error if mobile already exists', () => {
    component.mobileNumberExists = true;
    fixture.detectChanges();
    const mobileExistsFailure =
      fixture.nativeElement.querySelector('.failure-message');
    const showOTPButton = component.showOTPButton;
    expect(mobileExistsFailure).toBeTruthy();
    expect(showOTPButton).toBeFalsy();
  });

  it('should have error if passwords do not match', () => {
    const passwordField1FC = component.password1FC;
    const passwordField2FC = component.password2FC;

    passwordField1FC.setValue('test');
    passwordField2FC.setValue('test123');

    fixture.detectChanges();
    const passwordMismatchError =
      fixture.nativeElement.querySelector('.password-error');
    expect(passwordMismatchError).toBeTruthy();
  });

  it('should show OTP button', fakeAsync(() => {
    component.mobileFC.setValue('+6591234567');

    spyOn(getUserInfoService, 'existingMobileNumber').and.returnValue(
      of(false)
    );
    component.handleShowOTPButton();
    fixture.detectChanges();
    console.log(component.showOTPButton)
      console.log(component.mobileNumberExists)
    const showOTPButton = component.showOTPButton;
    expect(showOTPButton).toBeTruthy();
  }));
});
