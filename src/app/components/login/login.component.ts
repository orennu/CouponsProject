import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/userLoginDetails.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
  public isLoginFailed: boolean;
  public formFailureReason: string;

  constructor(private usersService: UsersService, private router: Router,
              private title: Title) {
                this.title.setTitle('login');
                // this.userLoginDetails = new UserLoginDetails();
  }

  public ngOnInit(): void {
    this.userLoginDetails = new UserLoginDetails();
  }

  public login(): void {
    const observable = this.usersService.login(this.userLoginDetails);
    observable.subscribe(successfulServerRequestData => {
      console.log(successfulServerRequestData);
      this.usersService.setLoginState(successfulServerRequestData.token+'', successfulServerRequestData.id+'');
      this.usersService.loginState.emit(true);

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
      this.usersService.loginState.emit(false);
      this.formFailureReason = serverErrorResponse.error.errorDescription;
    });
  }

}
