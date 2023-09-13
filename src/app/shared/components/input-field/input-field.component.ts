import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit {
  @Input() inputType: 'mobile' | 'text' | 'email' | 'password' | 'auth-code';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = true;
  @Input() inputValue: FormControl = new FormControl('', []);

  ngOnInit(): void {
    this.updateValidators();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.inputValue.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputValue.disable();
    } else {
      this.inputValue.enable();
    }
  }

  getInputType() {
    return this.inputType === 'password' ? 'password' : 'text';
  }

  updateValidators() {
    if (this.isRequired) {
      this.inputValue.setValidators(Validators.required);
    }
    if (this.inputType === 'email') {
      this.inputValue.addValidators(Validators.email);
    } else if (this.inputType === 'mobile') {
      this.inputValue.addValidators(Validators.pattern(/^\+65[89]\d{7}$/));
    } else if (this.inputType === 'auth-code') {
      this.inputValue.addValidators(Validators.pattern(/^\d{6}$/));
    }
    this.inputValue.updateValueAndValidity();
  }
}
