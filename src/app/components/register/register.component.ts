import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure = false;

  constructor(private builder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.formData = this.builder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      user: new FormGroup({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
        type: new FormControl('CUSTOMER'),
      }),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
    });
  }

  onFormSubmit(formData: string) {
    this.usersService.register(formData).subscribe(response => {
      console.log(response);
      this.formSubmitted = true;
    }, error => {
      console.warn(error.responseText);
      console.log({ error });
      this.formSubmitFailure = true;
    });
  }

}
