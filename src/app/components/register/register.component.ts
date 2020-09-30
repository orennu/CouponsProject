import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.builder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      // email: new FormControl(
      //   '', 
      //   [
      //     Validators.compose(
      //       [
      //         Validators.required, 
      //         Validators.email
      //       ]
      //     )
      //   ]
      // ),
      user: new FormGroup({
        email: new FormControl(''),
        type: new FormControl('CUSTOMER'),
      }),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
    });
  }

  onFormSubmit(formData: string) {
    console.log(formData);
  }

}
