import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GaVerificationPopupComponent } from '../ga-verification-popup/ga-verification-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TextButtonComponent } from './components/text-button/text-button.component';


@NgModule({
  declarations: [TextButtonComponent, InputFieldComponent, HeaderComponent, GaVerificationPopupComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    FormsModule,
    CarouselModule,
    GaVerificationPopupComponent
  ],
})
export class SharedModule {}
