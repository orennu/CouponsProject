import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure = false;
  emailTemplate: string;

  constructor(private builder: FormBuilder, 
              private contactService: ContactService, 
              private activeRoute: ActivatedRoute, 
              private http: HttpClient) {
                activeRoute.queryParams.subscribe((params) => {
                  console.log(params);
                });
              }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.resetPassForm = this.builder.group({
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
    this.createEmailTemplate();
  }

  onFormSubmit() {
    this.contactService.email = this.resetPassForm.get('email').value;
    this.createEmailTemplate();
    this.contactService.postForm(this.emailTemplate).subscribe(response => {
      console.log(response);
      this.formSubmitted = true;
    }, error => {
      console.warn(error.responseText);
      console.log({ error });
      this.formSubmitFailure = true;
    });
  }

  private randomString(): string {
    const rand = [...Array(256)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    return rand;
  }

  private createEmailTemplate() {
    this.http.get('../../assets/emailTemplate.html', {responseType: 'text'})
    .subscribe(
        data => {
            let re = /resetPassCode/gi;
            let htmlContent = data;
            this.emailTemplate = htmlContent.replace(re, btoa(this.randomString()));
        },
        error => {
            console.log(error);
        }
    );
  }

}
