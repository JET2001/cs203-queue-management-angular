import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [TextButtonComponent, InputFieldComponent, HeaderComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    FormsModule,
    CarouselModule
  ],
})
export class SharedModule {}
