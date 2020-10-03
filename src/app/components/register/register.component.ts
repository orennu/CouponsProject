import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  // confirmPasswordControl = new FormControl('', [Validators.required])
  formSubmitted: boolean = false;
  formSubmitFailure = false;
  formFailureReason: string;
  
  constructor(private validationService: ValidationService, 
              private usersService: UsersService,
              private router: Router) {
    // this.registrationForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.registrationForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z]+[ \'\-]?[a-zA-Z]+$/),
          // this.validationService.whitespaceValidator
        ]
      ),
      lastName: new FormControl(
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z]+[ \'\-]?[a-zA-Z]+$/),
          // this.validationService.whitespaceValidator
        ]
      ),
      phoneNumber: new FormControl(
        '', 
        [
          Validators.required, 
          Validators.pattern('^\\+?(?:[0-9] ?){6,14}[0-9]$'),
          Validators.minLength(6), 
          Validators.maxLength(14),
        ]
      ),
      address: new FormControl(
        '', 
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern('[a-zA-Z0-9 .,]+'),
          // this.validationService.whitespaceValidator
        ]
      ),
      dateOfBirth: new FormControl(
        '', 
        [
          Validators.required,
          this.validationService.ageValidator
        ]
      ),
      user: new FormGroup({
        userName: new FormControl(
          '', 
          [
            Validators.required, 
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern('^[a-z][a-z0-9]*$')
          ]
        ),
        passwords: new FormGroup({
          password: new FormControl(
            '', 
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(16),
              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,16}$'),
            ]
          ),
          confirmPassword: new FormControl(
            '', 
            [
              Validators.required
            ]
          )
        },
        {
          validators: [
            this.validationService.isPasswordsMatch,
          ]
        }
        ),
        email: new FormControl(
          '', 
          [
            Validators.required, 
            Validators.email
          ]
        ),
        type: new FormControl('CUSTOMER')
      })
    })
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }

  get userName() {
    return this.registrationForm.get('user').get('userName');
  }

  get password() {
    return this.registrationForm.get('user').get('passwords').get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('user').get('passwords').get('confirmPassword');
  }

  get email() {
    return this.registrationForm.get('user').get('email');
  }

  isMissing(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && control.errors.required;
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && !control.errors.required;
  }

  isPasswordsMismatch(control: AbstractControl): boolean {
    return (control.dirty || control.touched) 
            && this.registrationForm.get('user').get('passwords').hasError('passwordsNotMatch')
            && control.errors === null;
  }
  
  private removeValidators(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      formGroup.get(key).clearValidators();
      formGroup.get(key).updateValueAndValidity();
    }
  }

  onRevert() {
    this.removeValidators(this.registrationForm);
    this.registrationForm.reset();
    this.registrationForm = this.createFormGroup();
  }

  onFormSubmit() {
    // reuse removeValidators() here
    // this.registrationForm.get('user').clearValidators();
    // this.registrationForm.get('user').updateValueAndValidity();
    // (this.registrationForm.get('user') as FormGroup).removeControl('confirmPassword');
    // console.log(this.registrationForm.value);
    this.usersService.register(this.registrationForm.value).subscribe(response => {
      // console.log(response);
      this.formSubmitted = true;
      this.formSubmitFailure = false;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      console.warn(error.error);
      this.formSubmitFailure = true;
      this.formFailureReason = error.error.errorDescription;
    });
  }

}
