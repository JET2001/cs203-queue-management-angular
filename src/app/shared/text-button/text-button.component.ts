import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent {
  @Input() buttonVariants: string = 'default';
  @Input() buttonText: string = 'Text';
  @Input() isDisabled: boolean = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.isDisabled) this.buttonClick.emit();
  }
}
