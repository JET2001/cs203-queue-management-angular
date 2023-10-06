import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { getValidationConfigFromCardNo } from './helpers/card.helper';
import { luhnValidator } from './validators/luhn-validator';
import { TextMaskConfig } from '@myndmanagement/text-mask/core';

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
  @Input() inputType:
    | 'mobile'
    | 'text'
    | 'email'
    | 'password'
    | 'auth-code'
    | 'credit-card'
    | 'expiration-date'
    | 'cvv'
    | 'zip' = 'text';
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
    } else if (this.inputType === 'credit-card') {
      this.inputValue.addValidators([
        Validators.minLength(12),
        luhnValidator(),
      ]);
    } else if (this.inputType === 'expiration-date') {
      this.inputValue.addValidators(
        Validators.pattern(/^(0[1-9]|1[0-2])\d{2}$/)
      );
    } else if (this.inputType === 'cvv') {
      this.inputValue.addValidators(Validators.pattern(/^\d{3,4}$/));
    } else if (this.inputType === 'zip') {
      this.inputValue.addValidators(
        Validators.pattern(/^[a-zA-Z0-9 -]{1,10}$/)
      );
    }
    this.inputValue.updateValueAndValidity();
  }

  cardMask(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

  inputMaskWrapper(): TextMaskConfig {
    const digitMask = (numDigits: number) => Array(numDigits).fill(/\d/);
    if (this.inputType === 'credit-card') {
      return { mask: this.cardMask, guide: false, showMask: true };
    } else if (this.inputType === 'auth-code') {
      return {
        mask: digitMask(6),
        guide: false,
        showMask: true,
      };
    } else if (this.inputType === 'mobile') {
      return {
        mask: [/\+/, ...digitMask(10)],
        guide: false,
        showMask: true,
      };
    } else if (this.inputType === 'expiration-date') {
      return {
        mask: [/^[0-1]$/, /^[0-9]$/, /^\d$/, /^\d$/],
        guide: false,
        showMask: true,
      };
    } else if (this.inputType === 'cvv') {
      return {
        mask: digitMask(4),
        guide: false,
        showMask: true,
      };
    } else if (this.inputType === 'zip') {
      return {
        mask: digitMask(10),
        guide: false,
        showMask: true,
      };
    }
    return {};
  }
}
