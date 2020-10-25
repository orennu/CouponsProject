import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-reset-password-edit',
  templateUrl: './reset-password-edit.component.html',
  styleUrls: ['./reset-password-edit.component.css']
})
export class ResetPasswordEditComponent implements OnInit {

  resetPassForm: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure: boolean = false;
  resetPassCode: string;

  constructor(private router: Router,
              private usersService: UsersService,
              private validationService: ValidationService,
              private title: Title) {
                this.title.setTitle('reset password');
              }

  public ngOnInit(): void {
    this.resetPassForm = this.createFormGroup();
    const urlArray = this.router.url.split('/');
    this.resetPassCode = urlArray[urlArray.length -1];
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      password: new FormControl(
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(16),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,16}$'),
          ])
        ]
      ),
        confirmPassword: new FormControl(
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(16),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,16}$'),
          ])
        ]
      )
    },
    {
      validators: [
        this.validationService.isPasswordsMatch,
        ]
    }
    )
  }

  public isMissing(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && control.errors.required;
  }

  public isPasswordsMismatch(control: AbstractControl): boolean {
    return (control.dirty || control.touched)
            && this.resetPassForm.hasError('passwordsNotMatch')
            && control.errors === null;
  }

  public onFormSubmit(): void {
    const password = this.resetPassForm.get('password').value;
    const resetPasswordData = { password: password, code: this.resetPassCode }
    console.log(resetPasswordData);
    this.usersService.resetPassword(resetPasswordData).subscribe(response => {
      this.formSubmitted = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }, error => {
      console.error(error.error);
      this .formSubmitFailure = true;
      if (error.error.errorCode == 404) {
        this.router.navigate(['/not-found']);
      }
    })
  }

}
