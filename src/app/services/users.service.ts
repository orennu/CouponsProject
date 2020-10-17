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
  
  
  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }
  
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
    sessionStorage.removeItem('token');
    this.setLoginState.emit(false);
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

  public getUserByUserName(userName: string) {
    let params = new HttpParams().set('userName', userName);
    return this.http.get<UserProfile>(this.config.apiBaseEndpoint + 'users/search?', { params: params, responseType: 'json' }).pipe(
      map((data) => {
        return data.id;
      }, (error: any) => {
        return error;
      })
    )
  }

  getUserProfile(userId: number) {
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