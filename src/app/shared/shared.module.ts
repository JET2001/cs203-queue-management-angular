import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { CarouselComponent } from '../feature/home/components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [TextButtonComponent, CarouselComponent, InputFieldComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    TextButtonComponent,
    CarouselComponent,
    InputFieldComponent,
  ],
})
export class SharedModule {}
