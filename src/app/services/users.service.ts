import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { UserLoginDetails } from '../models/userLoginDetails.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessfulLoginServerResponse } from '../models/successfulLoginServerResponse.model'
import { APP_CONFIG, IAppConfig } from '../app.config';
import { UserProfile } from '../models/userProfile.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() setLoginState: EventEmitter<boolean> = new EventEmitter();
  userId: number;
  userProfile: UserProfile = new UserProfile();


  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  public getUserId() {
    return this.userId;
  }

  private setUserId(userId: number) {
    this.userId = userId;
  }

  public getProfile() {
    return this.userProfile;
  }

  private setProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post(this.config.apiBaseEndpoint + 'users/login', userLoginDetails);
  }

  public logout() {
    const token = sessionStorage.getItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    this.setLoginState.emit(false);
    this.http.delete(this.config.apiBaseEndpoint + 'users/logout/' + token, { headers: { Authorization: token } }).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  public createResetPassCode(resetPassCodeDetails: Object) {
    return this.http.post(this.config.apiBaseEndpoint + 'users/reset-password/code', resetPassCodeDetails);
  }

  public verifyResetPassCode(resetPassCode: string) {
    return this.http.get(this.config.apiBaseEndpoint + 'users/reset-password/code/' + resetPassCode);
  }

  public resetPassword(resetPasswordDetails: Object) {
    return this.http.post(this.config.apiBaseEndpoint + 'users/reset-password', resetPasswordDetails);
  }

  public register(input: Object) {
    if (input['user']['passwords'] !== undefined && input['user']['passwords'] !== null) {
      delete input['user']['passwords']['confirmPassword'];
      input['user']['password'] = input['user']['passwords']['password'];
      delete input['user']['passwords'];
    }
    return this.http.post(this.config.apiBaseEndpoint + 'customers/register', input, { responseType: 'json' }).pipe(
      map((response) => {
        if (response) {
          return response;
        }
      }, (error: any) => {
        return error;
      })
    )
  }

  public updateUserProfile(input: Object) {
    return this.http.put(this.config.apiBaseEndpoint + 'customers', input, { responseType: 'json' }).pipe(
      map((response) => {
        if (response) {
          return response;
        }
      }, (error: any) => {
        return error;
      })
    )
  }

  public getUserProfile(userId: string) {
    return this.http.get<any>(this.config.apiBaseEndpoint + 'customers/' + userId, { responseType: 'json' }).pipe(
      map((data): any => {
        this.userProfile.firstName = data.firstName;
        this.userProfile.lastName = data.lastName;
        this.userProfile.email = data.user.email;
        this.userProfile.userName = data.user.userName;
        this.userProfile.address = data.address;
        this.userProfile.phoneNumber = data.phoneNumber;
        this.userProfile.dateOfBirth = data.dateOfBirth;
      }, (error: any) => {
        return error;
      })
    )
  }

}
