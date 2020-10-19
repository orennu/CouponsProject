import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/userLoginDetails.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
  public isLoginFailed: boolean;
  public formFailureReason: string;

  constructor(private usersService: UsersService, private router: Router) {
    this.userLoginDetails = new UserLoginDetails();
  }

  ngOnInit(): void {
  }

  public login(): void {
    const observable = this.usersService.login(this.userLoginDetails);
    observable.subscribe(successfulServerRequestData => {
      console.log(successfulServerRequestData);
      sessionStorage.setItem('id', successfulServerRequestData.id+'');
      sessionStorage.setItem('token', successfulServerRequestData.token+'');
      this.usersService.setLoginState.emit(true);

      if (successfulServerRequestData.type == 'CUSTOMER') {
        this.router.navigate(['/customer']);
      }
      if (successfulServerRequestData.type == 'COMPANY') {
        this.router.navigate(['/company']);
      }
      if (successfulServerRequestData.type == 'ADMIN') {
        this.router.navigate(['/admin'])
      }
    }, serverErrorResponse => {
      console.log('Failed: Status ' + serverErrorResponse.status + ' Message ' + serverErrorResponse.message);
      this.isLoginFailed = true;
      this.usersService.setLoginState.emit(false);
      this.formFailureReason = serverErrorResponse.error.errorDescription;
    });
  }

}