import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextButtonComponent } from './text-button/text-button.component';

@NgModule({
  declarations: [TextButtonComponent],
  imports: [CommonModule],
  exports: [CommonModule, TextButtonComponent],
})
export class SharedModule {}
