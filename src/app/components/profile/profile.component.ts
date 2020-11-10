import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  role: string;

  constructor(private usersService: UsersService, private router: Router,
              private title: Title) {
                this.title.setTitle('profile');
  }

  public ngOnInit(): void {
    const id = this.usersService.getUserId()+'';
    const role = this.usersService.getUserRole();
    this.getUserProfile(id, role);
    // this.usersService.getUserProfile(id).subscribe(
    //   () => {
    //     this.userProfile = this.usersService.getProfile();
    //     this.profile.firstName = this.userProfile.firstName;
    //     this.profile.lastName = this.userProfile.lastName;
    //     this.profile.address = this.userProfile.address;
    //     this.profile.phoneNumber = this.userProfile.phoneNumber;
    //     this.profile.dateOfBirth = this.userProfile.dateOfBirth;
    //     this.profileForm.patchValue({ firstName: this.profile.firstName,
    //                                   lastName: this.profile.lastName,
    //                                   address: this.profile.address,
    //                                   phoneNumber: this.profile.phoneNumber
    //                                 });
    //     console.log(this.profileForm.value);
    //     this.profile.userName = this.userProfile.userName;
    //     this.profile.email = this.userProfile.email;
    //   }
    // )
    // this.profileForm = this.createFormGroup()
  }

  private getUserProfile(id: string, role: string): void {
    if (role === 'CUSTOMER') {
      this.role = role;
      this.getCustomerUserProfile(id);
      this.profileForm = this.createFormGroup(role);
    }
    if (role === 'ADMIN') {
      this.role = role;
      this.getAdminUserProfile(id);
      this.profileForm = this.createFormGroup(role);
    }
    if (role === 'COMPANY') {
      this.getCompanyUserProfile(id);
    }
  }

  private getCustomerUserProfile(id: string): void {
    this.usersService.getCustomerUserProfile(id).subscribe(
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
                                      phoneNumber: this.profile.phoneNumber,
                                      dateOfBirth: this.profile.dateOfBirth
                                    });
        console.log(this.profileForm.value);
        this.profile.userName = this.userProfile.userName;
        this.profile.email = this.userProfile.email;
      }
    );
    // this.profileForm = this.createFormGroup()
  }

  private getAdminUserProfile(id: string): void {
    this.usersService.getAdminUserProfile(id).subscribe(
      () => {
        this.userProfile = this.usersService.getProfile();
        this.profile.email = this.userProfile.email;
        this.profile.userName = this.userProfile.userName;
        this.profile.type = this.userProfile.type;
        this.profileForm.patchValue({ email: this.profile.email,
                                      userName: this.profile.userName,
                                      type: this.profile.type
                                    });
        console.log(this.profileForm.value);
      }
    );
  }

  private getCompanyUserProfile(id: string): void {}

  private createFormGroup(profileType: string): FormGroup {
    if (profileType === 'CUSTOMER') {
      console.log('in customer form');
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
          userName: new FormControl({ value: '', disabled: true }),
          email: new FormControl({ value: '', disabled: true })
        })
      })
    }
    if (profileType === 'ADMIN') {
      return new FormGroup({
        id: new FormControl(),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ]
        ),
        userName: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern('^[a-z][a-z0-9]*$')
          ]
        ),
        type: new FormControl('ADMIN')
      })
    }
  }

  public get firstName(): AbstractControl {
    return this.profileForm.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.profileForm.get('lastName');
  }

  public get address(): AbstractControl {
    return this.profileForm.get('address');
  }

  public get phoneNumber(): AbstractControl {
    return this.profileForm.get('phoneNumber');
  }

  public isMissing(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && control.errors.required;
  }

  public isInvalid(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid && !control.errors.required;
  }

  public onFormSubmit(): void {
    console.log(this.profile);
    const id = this.usersService.getUserId();
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
