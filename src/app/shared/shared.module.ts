import { CommonModule } from '@angular/common';
import { NgModule, ViewEncapsulation } from '@angular/core';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { CarouselComponent } from '../feature/home/components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TextButtonComponent, CarouselComponent],
  imports: [CommonModule, CarouselModule, ButtonModule],
  exports: [CommonModule, TextButtonComponent, CarouselComponent],
})
export class SharedModule {}
