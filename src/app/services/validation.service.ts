import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class ValidationService {

    whitespaceValidator(formControl: AbstractControl): { [key: string]: any } | null {
        const isWhitespace = (formControl.value).trim().length === 0 && formControl.value !== '';
        const isValid = !isWhitespace;
        return isValid ? null : { invalidInput: { valid: false, value: formControl.value } };
    }

    isPasswordsMatch(formGroup: FormGroup) {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;
        console.log('foo');
        return password === confirmPassword ? null : { passwordsNotMatch: true }
    }
}