import { AbstractControl, ValidatorFn } from '@angular/forms';
import { luhnCheck } from '../helpers/luhn.helper';

export function luhnValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = luhnCheck(control.value);
    if (control.value.length === 0) { 
        return null;
    }
    return isValid ? null : { luhn: true };
  };
}
