import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  getPassCodeForm: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure = false;
  userEmail: string;
  emailTemplate: string;
  resetPassCode: string;

  constructor(private builder: FormBuilder,
              private contactService: ContactService,
              private usersService: UsersService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.getPassCodeForm = this.builder.group({
      email: new FormControl(
        '',
        [
          Validators.compose(
            [
              Validators.required,
              Validators.email
            ]
          )
        ]
      )
    });
  }

  onFormSubmit() {
    this.userEmail = this.getPassCodeForm.get('email').value;
    this.contactService.email = this.userEmail;
    this.createPassCode();
    this.addResetPassCode();
  }

  private sendMailToUser() {
    this.contactService.postForm(this.emailTemplate).subscribe(response => {
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({ error });
        this.formSubmitFailure = true;
    });
  }

  private addResetPassCode() {
    const resetPassCodeDetails = { email: this.userEmail, code: this.resetPassCode }
    this.usersService.createResetPassCode(resetPassCodeDetails).subscribe(response => {
      this.verifyPassCode(resetPassCodeDetails.code);
      this.formSubmitted = true;
    }, error => {
      console.error(error);
      this.formSubmitFailure = true;
    });
  }

  private createPassCode() {
    const rand = [...Array(256)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    this.resetPassCode = btoa(rand).replace(/\=+$/, '');
  }

  private createEmailTemplate(passCode: string) {
    return this.http.get('../../assets/emailTemplate.html', {responseType: 'text'});
  }

  private verifyPassCode(passCode: string) {
    this.usersService.verifyResetPassCode(passCode).subscribe(response => {
      console.log(passCode);
      this.createEmailTemplate(passCode).subscribe(data => {
        let re = /resetPassCode/gi;
        let htmlContent = data;
        this.emailTemplate = htmlContent.replace(re, passCode);
        console.log(this.emailTemplate.substring(5007, 5386));
        // this.sendMailToUser();
      }, error => {
        console.log(error);
      })
    }, error => {
      console.error(error);
    });
  }

}
