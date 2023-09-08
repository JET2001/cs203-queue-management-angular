import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { CarouselComponent } from '../feature/home/components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [TextButtonComponent, CarouselComponent, InputFieldComponent],
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
    CarouselComponent,
    InputFieldComponent,
    FormsModule
  ],
})
export class SharedModule {}
