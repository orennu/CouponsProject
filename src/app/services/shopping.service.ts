import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  shoppingCartItems: Coupon[] = [];

  constructor() {
    console.log(localStorage.getItem('shoppingCartItems'));
    if (localStorage.getItem('shoppingCartItems') !== null) {
      this.shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems'));
    }
  }

  public addCoupon(coupon: Coupon): void {
    this.shoppingCartItems.push(coupon);
    localStorage.setItem('shoppingCartItems', JSON.stringify(this.shoppingCartItems));
    console.log(this.shoppingCartItems);
  }

  public getCoupons(): Coupon[] {
    return JSON.parse(localStorage.getItem('shoppingCartItems'));
  }

  public removeCoupons(): void {
    this.shoppingCartItems = [];
    localStorage.removeItem('shoppingCartItems');
  }
}
