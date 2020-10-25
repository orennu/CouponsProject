import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  formData: FormGroup;
  formSubmitted: boolean = false;
  formSubmitFailure: boolean = false;

  constructor(private builder: FormBuilder, private contactService: ContactService) { }

  public ngOnInit(): void {
    this.formData = this.builder.group({
      fullName: new FormControl('', [Validators.required]),
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
      ),
      comment: new FormControl('', [Validators.required])
    });
  }

  public onFormSubmit(formData: string): void {
    this.contactService.email = 'orennu.cloud@gmail.com';
    this.contactService.postForm(formData).subscribe(response => {
      console.log(response);
      this.formSubmitted = true;
    }, error => {
      console.warn(error.responseText);
      console.log({ error });
      this.formSubmitFailure = true;
    });
  }

}
