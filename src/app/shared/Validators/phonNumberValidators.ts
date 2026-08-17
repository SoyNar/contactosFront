import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null; 

    const clean = String(value).replace(/[^0-9]/g, '');

    if (clean.length < 7 || clean.length > 15) {
      return { phoneLength: { requiredRange: '7-15', actualLength: clean.length } };
    }

    return null;
  };
}