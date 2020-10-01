import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  constructor(private validationService: ValidationService, 
              private usersService: UsersService) {
    this.registrationForm = this.createFormGroup();
  }

  ngOnInit(): void {
    // this.registrationForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(
        '', 
        [
          Validators.required, 
          Validators.pattern('[a-zA-Z]*'),
          this.validationService.whitespaceValidator
        ]
      ),
      lastName: new FormControl(
        '', 
        [
          Validators.required, 
          Validators.pattern('[a-zA-Z]*'),
          this.validationService.whitespaceValidator
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
          this.validationService.whitespaceValidator
        ]
      ),
      dateOfBirth: new FormControl('', [Validators.required]),
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
        password: new FormControl(
          '', 
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(16),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,16}$')
          ]
        ),
        confirmPassword: new FormControl(
          '', 
          [
            Validators.required
          ]
        ),
        email: new FormControl(
          '', 
          [
            Validators.required, 
            Validators.email
          ]
        ),
        type: new FormControl('CUSTOMER')
      }, {validators: [this.validationService.isPasswordsMatch]})
    })
  }

  onRevert() {
    this.registrationForm.reset();
  }

  onFormSubmit() {
    this.registrationForm.get('user').clearValidators();
    this.registrationForm.get('user').updateValueAndValidity();
    (this.registrationForm.get('user') as FormGroup).removeControl('confirmPassword');
    console.log(this.registrationForm);
    this.usersService.register(this.registrationForm.value).subscribe(response => {
      console.log(response);
      this.formSubmitted = true;
    }, error => {
      console.warn(error.responseText);
      console.log({ error });
      this.formSubmitFailure = true;
    });
  }

}
