import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem.model';
import { Coupon } from '../models/coupon.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  // coupons: Coupon[] = [];
  shoppingCartItems: CartItem[] = [];
  cartItem: CartItem;

  constructor() {
    console.log(localStorage.getItem('shoppingCartItems'));
    if (localStorage.getItem('shoppingCartItems') !== null) {
      this.shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems'));
    }
  }

  // public addCoupon(coupon: Coupon): void {
  //   this.coupons.push(coupon);
  //   console.log(this.coupons);
  // }

  public getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('shoppingCartItems'));
  }

  public removeCoupons(): void {
    this.shoppingCartItems = [];
    localStorage.removeItem('shoppingCartItems');
  }

  public addCartItem(coupon: Coupon): void {
    // this.cartItem = this.buildCartItem(coupon);
    let cartItem = new CartItem(coupon.title, coupon.price, coupon.id, 1);
    for (let index = 0; index < this.shoppingCartItems.length; index++) {
      if (this.shoppingCartItems[index].couponId === coupon.id) {
        cartItem.quantity = cartItem.quantity + this.shoppingCartItems[index].quantity;
        this.shoppingCartItems.splice(index, 1);
      }
    }
    this.shoppingCartItems.push(cartItem);
    localStorage.setItem('shoppingCartItems', JSON.stringify(this.shoppingCartItems));
  }

  private buildCartItem(coupon: Coupon): CartItem {
    let counter = 1;
    let cartItem = new CartItem(coupon.title, coupon.price, coupon.id);
    for (let index = 0; index < this.shoppingCartItems.length; index++) {
      if (this.shoppingCartItems[index].couponId === coupon.id) {
        counter++;
      }
    }
    cartItem.quantity = counter;

    return cartItem;
  }
}
