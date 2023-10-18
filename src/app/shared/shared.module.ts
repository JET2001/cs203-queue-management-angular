import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GaVerificationPopupComponent } from './components/ga-verification-popup/ga-verification-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { OtpPopupComponent } from './components/otp-popup/otp-popup.component';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    GaVerificationPopupComponent,
    LoginPopupComponent,
    OtpPopupComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    MessagesModule,
  ],
  exports: [
    CommonModule,
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    FormsModule,
    CarouselModule,
    GaVerificationPopupComponent,
    LoginPopupComponent,
    ReactiveFormsModule,
    OtpPopupComponent,
    TextMaskModule,
    MessagesModule
  ],
})
export class SharedModule {}
