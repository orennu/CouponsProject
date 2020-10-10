import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserLoginDetails } from '../models/userLoginDetails.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessfulLoginServerResponse } from '../models/successfulLoginServerResponse.model'
import { APP_CONFIG, IAppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() setLoginState: EventEmitter<boolean> = new EventEmitter();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post(this.config.apiBaseEndpoint + 'users/login', userLoginDetails);;
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
    return this.http.post(this.config.apiBaseEndpoint + 'customers/register', input, {responseType: 'json'}).pipe(
      map((response) => {
        if (response) {
          return response;
        }
      }, (error: any) => {
        return error;
      })
    )
  }

}