import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Coupon } from 'src/app/models/coupon.model';
import { PurchasesService } from 'src/app/services/purchases.service';
import { ShoppingService } from 'src/app/services/shopping.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[];

  constructor(private shoppingService: ShoppingService,
              private purchasesService: PurchasesService) {
              }

  ngOnInit(): void {
    this.cartItems = this.shoppingService.getCartItems();
    console.log(this.cartItems);
  }

  public getSumPrice(): number {
    let sum = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      sum = sum + (this.cartItems[index].quantity * this.cartItems[index].price);
    }
    
    return sum;
  }

  public cleanCart(): void {
    const numItem = this.shoppingService.getCartItemsCount();
    if (numItem > 0) {
      if (confirm('All items in cart will be removed, are you sure you want to continue?')) {
        this.purchasesService.setItemNum(-numItem);
        this.shoppingService.removeCoupons();
        this.cartItems = [];
      }
    }
  }
}
