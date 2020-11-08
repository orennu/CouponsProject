import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Company } from 'src/app/models/company.model';
import { UserProfile } from 'src/app/models/userProfile.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: UserProfile[] = [];
  private user: UserProfile;
  public userId: number;
  public userState: string;
  public usersCount: number;
  public userSearch = "";
  // public isUserNew: boolean;
  public userForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public isSubmitFailed: boolean = false;
  public formFailureReason: string;
  public isCompany: boolean;
  public company: Company;
  public companies: Company[] = [];
  public companiesMap: object = {};

  constructor(private usersService: UsersService, private companiesService: CompaniesService,
              private modalService: ModalService, private validationService: ValidationService) { }

  ngOnInit(): void {
    this.userId = this.usersService.getUserId();
    this.usersService.getAllUsers().subscribe((response) => {
      console.log(response);
      for (let index = 0; index < response.length; index++) {
        this.user = new UserProfile();
        this.user.id = response[index]?.id;
        this.user.email = response[index]?.email;
        this.user.userName = response[index]?.userName;
        this.user.type = response[index]?.type;
        this.user.isLocked = response[index]?.lockUser;
        this.users.push(this.user);
      }
      this.usersCount = this.users.length;
    }, (error) => {
      console.error(error.error);
    });
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('^[a-z][a-z0-9]*$')
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      passwords: new FormGroup({
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(16),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,16}$'),
          ]
        ),
        confirmPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        )
      },
      {
        validators: [
          this.validationService.isPasswordsMatch,
        ]
      }
      ),
      type: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      companyName: new FormControl(
        '',
        [
          Validators.pattern(/^\S*$/)
        ]
      )
    })
  }

  private createAdminUser(): UserProfile {
    const user = new UserProfile();
    user.userName = this.userForm.get('username').value;
    user.password = this.userForm.get('passwords').get('password').value;
    user.email = this.userForm.get('email').value;
    user.type = this.userForm.get('type').value;
    delete user.id;
    delete user.firstName;
    delete user.lastName;
    delete user.isLocked;
    delete user.phoneNumber;
    delete user.address;
    delete user.dateOfBirth;
    delete user.company;

    return user;
  }

  private createCompanyUser(): UserProfile {
    const user = new UserProfile();
    user.userName = this.userForm.get('username').value;
    user.password = this.userForm.get('passwords').get('password').value;
    user.email = this.userForm.get('email').value;
    user.type = this.userForm.get('type').value;
    user.company = { id: this.companiesMap[this.userForm.get('companyName').value] };
    delete user.id;
    delete user.firstName;
    delete user.lastName;
    delete user.isLocked;
    delete user.phoneNumber;
    delete user.address;
    delete user.dateOfBirth;

    return user;
  }

  public get password(): AbstractControl {
    return this.userForm.get('passwords').get('password');
  }

  public get confirmPassword(): AbstractControl {
    return this.userForm.get('passwords').get('confirmPassword');
  }

  public openUserForm(userRef: NgbModalRef): void {
    // this.isUserNew = true;
    this.userForm = this.createFormGroup();
    this.isFormSubmitted = false;
    this.isSubmitFailed = false;
    this.isCompany = false;
    this.modalService.showModal(userRef);
  }

  public viewUserDetails(user: NgbModalRef): void {
    this.modalService.showModal(user);
  }

  public lockUser(id: number): void {
    this.usersService.lockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]?.id === id) {
            this.users[index].isLocked = true;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public unlockUser(id: number): void {
    this.usersService.unlockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]?.id === id) {
            this.users[index].isLocked = false;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public deleteUser(id: number, index: number): void {
    if (confirm("This action is irreversible, are you sure you want to delete the customer?")) {
      this.usersService.deleteUser(id).subscribe(
        response => {
          this.users.splice(index, 1);
          this.usersCount = this.users.length;
        }, error => {
          console.error(error.error);
        }
      )
    }
  }

  public isPasswordsMismatch(control: AbstractControl): boolean {
    return (control.dirty || control.touched)
            && this.userForm.get('passwords').hasError('passwordsNotMatch')
            && control.errors === null;
  }

  public onTypeCompany($event, value: string): void {
    if (value === 'COMPANY') {
      this.companiesService.getAllCompanies().subscribe(
        (response) => {
          this.companies = [];
          for (let index = 0; index < response.length; index++) {
            this.companiesMap[response[index]?.name] = response[index]?.id;
            this.company = new Company();
            this.company.id = response[index]?.id;
            this.company.name = response[index]?.name;
            this.company.email = response[index]?.email;
            this.company.phoneNumber = response[index]?.phoneNumber;
            this.company.address = response[index]?.address;
            this.company.industry = response[index]?.industry;
            this.companies.push(this.company);
            this.isCompany = true;
          }
        }, (error) => {
          console.error(error.error);
        }
      );
    } else {
      this.isCompany = false;
    }
  }

  public saveNewUser(modalRef: NgbActiveModal): void {
    const userType = this.userForm.get('type').value;
    if (userType == 'ADMIN') {
      const user = this.createAdminUser();
      this.usersService.addUser(user).subscribe(
        (response) => {
          user.id = response;
          user.isLocked = false;
          this.users.push(user);
          this.isFormSubmitted = true;
          this.usersCount = this.users.length;
          this.userState = 'created';
          modalRef.dismiss('save clicked');
        }, (error) => {
          console.error(error.error);
          this.isSubmitFailed = true;
          this.formFailureReason = error.error.errorDescription;
        }
      );
    }
    if (userType == 'COMPANY') {
      const user = this.createCompanyUser();
      this.usersService.addUser(user).subscribe(
        (response) => {
          user.id = response;
          user.isLocked = false;
          this.users.push(user);
          this.isFormSubmitted = true;
          this.usersCount = this.users.length;
          this.userState = 'created';
          modalRef.dismiss('save clicked');
        }, (error) => {
          console.error(error.error);
          this.isSubmitFailed = true;
          this.formFailureReason = error.error.errorDescription;
        }
      );
    }
  }

}
