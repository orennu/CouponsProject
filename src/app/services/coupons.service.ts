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
  coupons: Coupon[] = [
      new Coupon(
          1,
          'coupon1',
          'coupon1 description',
          'https://img.grouponcdn.com/deal/47TGpmUFY1Gt41AAFvk4to89AoWn/47-3346x2004/v1/c700x420.webp',
          10,
          'FOOD',
          20,
          '2020-11-01',
          '2020-12-01'
      ),
      new Coupon(
          2,
          'coupon2',
          'coupon2 description',
          'https://img.grouponcdn.com/deal/4Zq1amm9qGtJr9zEVojHXbAxanrs/4Z-700x420/v1/c700x420.webp',
          11,
          'FOOD',
          21,
          '2020-11-01',
          '2020-12-01'
      ),
      new Coupon(
          3,
          'coupon3',
          'coupon3 description',
          'https://img.grouponcdn.com/iam/96UHjg38T7My1pitsY4zEdJA2Ff/96-2048x1229/v1/c700x420.webp',
          12,
          'FOOD',
          22,
          '2020-11-01',
          '2020-12-01'
      ),
      new Coupon(
          4,
          'coupon4',
          'coupon4 description',
          'https://img.grouponcdn.com/deal/fchsJ5i4chdk2MCF7xdT/Ku-2048x1242/v1/c700x420.webp',
          13,
          'FOOD',
          23,
          '2020-11-01',
          '2020-12-01'
      ),
      new Coupon(
          5,
          'coupon5',
          'coupon5 description',
          'https://img.grouponcdn.com/deal/4XiTkN7Ue7wKskFmmraYA1uYpKWR/4X-2048x1229/v1/c700x420.webp',
          14,
          'FOOD',
          24,
          '2020-11-01',
          '2020-12-01'
      )
  ];

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {}

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

  // public updateCoupon(coupon: Object): Observable<any> {}

  public deleteCoupon(id: number): Observable<any> {
    return this.http.delete(this.config.apiBaseEndpoint + this.endpoint + id);
  }

}
