import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class ValidationService {

    // whitespaceValidator(formControl: AbstractControl): { [key: string]: any } | null {
    //     console.log(formControl.value);
    //     const isWhitespace = (formControl.value).trim().length === 0 && formControl.value !== '';
    //     const isValid = !isWhitespace;
    //     return isValid ? null : { onlyWhite: { valid: false, value: 'value' } };
    // }

    isPasswordsMatch(formGroup: FormGroup) {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;
        return password === confirmPassword ? null : { passwordsNotMatch: { valid: false, message: 'passwords mismatch' } };
    }

    ageValidator(formControl: AbstractControl) {
        const dateOfBirth = formControl.value;
        let birthday = +new Date(dateOfBirth);
        const age = ~~((Date.now() - birthday) / (31557600000));
        const isValid = age >= 18;
        return isValid ? null : { ageNotValid: true, value: 'You must be at least 18 to register' };
    }

}