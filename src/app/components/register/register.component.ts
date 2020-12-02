import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  formSubmitted: boolean = false;
  formSubmitFailure = false;
  formFailureReason: string;

  constructor(private validationService: ValidationService,
              private usersService: UsersService,
              private router: Router,
              private title: Title) {
                this.title.setTitle('registration');
  }

  public ngOnInit(): void {
    this.registrationForm = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+[ \'\-]?[a-zA-Z]+$/),
        ]
      ),
      lastName: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+[ \'\-]?[a-zA-Z]+$/)
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
          Validators.pattern(/^[a-zA-Z0-9\s\.,'-]*$/)
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
            Validators.pattern('^[a-z][a-z0-9_]*$')
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

  public get firstName(): AbstractControl {
    return this.registrationForm.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.registrationForm.get('lastName');
  }

  public get phoneNumber(): AbstractControl {
    return this.registrationForm.get('phoneNumber');
  }

  public get address(): AbstractControl {
    return this.registrationForm.get('address');
  }

  public get dateOfBirth(): AbstractControl {
    return this.registrationForm.get('dateOfBirth');
  }

  public get userName(): AbstractControl {
    return this.registrationForm.get('user').get('userName');
  }

  public get password(): AbstractControl {
    return this.registrationForm.get('user').get('passwords').get('password');
  }

  public get confirmPassword(): AbstractControl {
    return this.registrationForm.get('user').get('passwords').get('confirmPassword');
  }

  public get email(): AbstractControl {
    return this.registrationForm.get('user').get('email');
  }

  public isMissing(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && control.errors.required;
  }

  public isInvalid(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && !control.errors.required;
  }

  public isPasswordsMismatch(control: AbstractControl): boolean {
    return (control.dirty || control.touched)
            && this.registrationForm.get('user').get('passwords').hasError('passwordsNotMatch')
            && control.errors === null;
  }

  private removeValidators(formGroup: FormGroup): void {
    for (const key in formGroup.controls) {
      formGroup.get(key).clearValidators();
      formGroup.get(key).updateValueAndValidity();
    }
  }

  public onRevert(): void {
    this.removeValidators(this.registrationForm);
    this.registrationForm.reset();
    this.registrationForm = this.createFormGroup();
  }

  public onFormSubmit(): void {
    this.usersService.register(this.registrationForm.value).subscribe(response => {
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
