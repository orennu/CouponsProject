import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
                this.title.setTitle('Profile');
  }

  public ngOnInit(): void {
    const id = this.usersService.getUserId()+'';
    if (id === '0') {
      this.router.navigate(['forbidden']);
    }
    const role = this.usersService.getUserRole();
    this.getUserProfile(id, role);
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
      this.role = role;
      this.getCompanyUserProfile(id);
      this.profileForm = this.createFormGroup(role);
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

  private getCompanyUserProfile(id: string): void {
    this.usersService.getCompanyUserProfile(id).subscribe(
      () => {
        this.userProfile = this.usersService.getProfile();
        this.profile.email = this.userProfile.email;
        this.profile.userName = this.userProfile.userName;
        this.profile.type = this.userProfile.type;
        this.profile.company = this.userProfile.company;
        this.profileForm.patchValue({ email: this.profile.email,
                                      userName: this.profile.userName,
                                      type: this.profile.type + ' ADMIN',
                                      companyName: this.profile.company.name
                                    });
      }
    );
  }

  private createFormGroup(profileType: string): FormGroup {
    if (profileType === 'CUSTOMER') {
      console.log('in customer user form');
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
      console.log('in admin user form');
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
        type: new FormControl({ value: 'ADMIN', disabled: true })
      })
    }
    if (profileType === 'COMPANY') {
      console.log('in company user form');
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
        type: new FormControl({ value: '', disabled: true }),
        companyName: new FormControl({ value: '', disabled: true })
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
