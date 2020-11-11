import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class ValidationService {

    public isPasswordsMatch(formGroup: FormGroup): Object | null {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;
        return password === confirmPassword ? null : { passwordsNotMatch: { valid: false, message: 'passwords mismatch' } };
    }

    public ageValidator(formControl: AbstractControl): Object | null {
        const dateOfBirth = formControl.value;
        let birthday = +new Date(dateOfBirth);
        const age = ~~((Date.now() - birthday) / (31557600000));
        const isValid = age >= 18;
        return isValid ? null : { ageNotValid: true, value: 'You must be at least 18 to register' };
    }

    public greaterThanValidator(formControl: AbstractControl): Object | null {
      const num = formControl.value;
      return num > 0 ? null : { valid: false, message: 'number must be greater than zero' };
    }

}
