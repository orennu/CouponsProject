import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { UserLoginDetails } from '../models/userLoginDetails.model';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessfulLoginServerResponse } from '../models/successfulLoginServerResponse.model'
import { APP_CONFIG, IAppConfig } from '../app.config';
import { UserProfile } from '../models/userProfile.model';
import { PurchasesService } from './purchases.service';
import { ShoppingService } from './shopping.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() loginState: EventEmitter<boolean> = new EventEmitter();
  userId: number;
  userProfile: UserProfile = new UserProfile();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
                                  private http: HttpClient,
                                  private purchasesService: PurchasesService,
                                  private shoppingService: ShoppingService) { }

  public getUserToken(): string {
    return sessionStorage.getItem('token');
  }

                                  public getUserId(): number {
    return +(sessionStorage.getItem('id'));
  }

  private setUserId(userId: number): void {
    sessionStorage.setItem('id', userId+'');
  }

  public getProfile(): UserProfile {
    return this.userProfile;
  }

  private setProfile(profile: UserProfile): void {
    this.userProfile = profile;
  }

  public getLoginState(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  public setLoginState(token: string, id: string): void {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('token', token);
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post(this.config.apiBaseEndpoint + 'users/login', userLoginDetails);
  }

  public logout(): void {
    const token = sessionStorage.getItem('token');
    const numItem = this.shoppingService.getCartItemsCount();
    if (numItem > 0) {
      if (confirm('There are items in your cart, are you sure you want to logout?')) {
        this.purchasesService.setItemNum(-numItem);
        // localStorage.removeItem('itemsInCart');
        this.shoppingService.removeCoupons();
        this.doLogout(token);
      }
    } else {
        this.doLogout(token);
      }
  }

  public createResetPassCode(resetPassCodeDetails: Object): Observable<any> {
    return this.http.post(this.config.apiBaseEndpoint + 'users/reset-password/code', resetPassCodeDetails);
  }

  public verifyResetPassCode(resetPassCode: string): Observable<any> {
    return this.http.get(this.config.apiBaseEndpoint + 'users/reset-password/code/' + resetPassCode);
  }

  public resetPassword(resetPasswordDetails: Object): Observable<any> {
    return this.http.post(this.config.apiBaseEndpoint + 'users/reset-password', resetPasswordDetails);
  }

  public register(input: Object): Observable<any> {
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

  public updateUserProfile(input: Object): Observable<any> {
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

  public getUserProfile(userId: string): Observable<any> {
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

  private doLogout(token: string): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    this.loginState.emit(false);
    this.http.delete(this.config.apiBaseEndpoint + 'users/logout/' + token, { headers: { Authorization: token } }).subscribe(data => {
      console.log('user logged out');
    }, error => {
      console.log(error.error);
    });
  }

}
