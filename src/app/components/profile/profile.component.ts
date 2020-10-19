import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userId: number;
  profile: UserProfile = new UserProfile();
  userProfile: any;
  formSubmitted: boolean = false;
  formSubmitFailure = false;
  formFailureReason: string;

  constructor(private usersService: UsersService, private router: Router) {
    
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('id');
    this.usersService.getUserProfile(id).subscribe(
      () => {
        this.userProfile = this.usersService.getProfile();
        this.profile.firstName = this.userProfile.firstName;
        this.profile.lastName = this.userProfile.lastName;
        this.profile.address = this.userProfile.address;
        this.profile.phoneNumber = this.userProfile.phoneNumber;
        this.profile.dateOfBirth = this.userProfile.dateOfBirth;
        this.profileForm.patchValue({ firstName: this.profile.firstName,
                                      lastName: this.profile.lastName,
                                      address: this.profile.address,
                                      phoneNumber: this.profile.phoneNumber
                                    });
        console.log(this.profileForm.value);
        this.profile.userName = this.userProfile.userName;
        this.profile.email = this.userProfile.email;
      }
    )
    this.profileForm = this.createFormGroup()
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
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
          Validators.pattern(/^[a-zA-Z]+[ \'\-]?[a-zA-Z]+$/),
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
      dateOfBirth: new FormControl(),
      user: new FormGroup({
        type: new FormControl('CUSTOMER'),
        id: new FormControl(),
      //   email: new FormControl()
      })
    })
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }
  
  get lastName() {
    return this.profileForm.get('lastName');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
  
  isMissing(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && control.errors.required;
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && !control.errors.required;
  }

  onFormSubmit() {
    console.log(this.profile);
    const id = sessionStorage.getItem('id');
    this.profileForm.patchValue({ id: +id, 
                                  dateOfBirth: this.profile.dateOfBirth,
                                  user: { id: +id } });
    console.log(this.profileForm.value);
    this.usersService.updateUserProfile(this.profileForm.value).subscribe(
      response => {
        this.formSubmitted = true;
        this.formSubmitFailure = false;
      }, error => {
        console.warn(error.error);
        this.formSubmitFailure = true;
        this.formFailureReason = error.error.errorDescription;
      }
    );
  }

}
