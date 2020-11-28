import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Coupon } from '../models/coupon.model';


@Injectable({
    providedIn: 'root'
})
export class CouponsService {

  private endpoint: string = 'coupons/';
  public couponSelected = new EventEmitter<Coupon>();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  public getCoupon(couponId: number): Observable<any> {
      return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint + couponId, { responseType: 'json' });
  }

  public getAllCoupons(): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint, { responseType: 'json' });
  }

  public getCouponsByCompanyId(id: number): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint + 'search', { params: { companyId: id+'' },
                                                                                        responseType: 'json' });
  }

  public addCoupon(coupon: Object): Observable<any> {
    return this.http.post(this.config.apiBaseEndpoint + this.endpoint, coupon, { responseType: 'json' });
  }

  public updateCoupon(coupon: Object): Observable<any> {
    return this.http.put(this.config.apiBaseEndpoint + this.endpoint, coupon, { responseType: 'json'});
  }

  public deleteCoupon(id: number): Observable<any> {
    return this.http.delete(this.config.apiBaseEndpoint + this.endpoint + id);
  }

}
