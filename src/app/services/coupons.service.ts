import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Coupon } from '../models/coupon.model';


@Injectable({
    providedIn: 'root'
})
export class CouponsService {

    couponSelected = new EventEmitter<Coupon>();

    coupons: Coupon[] = [
        new Coupon(
            'coupon1',
            'coupon1 description',
            'http://bla.com',
            10,
            'FOOD',
            20,
            '2020-11-01',
            '2020-12-01'
        ),
        new Coupon(
            'coupon2',
            'coupon2 description',
            'http://bla.com',
            11,
            'FOOD',
            21,
            '2020-11-01',
            '2020-12-01'
        ),
        new Coupon(
            'coupon3',
            'coupon3 description',
            'http://bla.com',
            12,
            'FOOD',
            22,
            '2020-11-01',
            '2020-12-01'
        ),
        new Coupon(
            'coupon4',
            'coupon4 description',
            'http://bla.com',
            13,
            'FOOD',
            23,
            '2020-11-01',
            '2020-12-01'
        ),
        new Coupon(
            'coupon5',
            'coupon5 description',
            'http://bla.com',
            14,
            'FOOD',
            24,
            '2020-11-01',
            '2020-12-01'
        )
    ];

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {}
    
    getCoupon(index: number): Coupon {
        return this.coupons[index];
    }

    getCoupons(): Coupon[] {
        return this.coupons.slice();
    }
    
}