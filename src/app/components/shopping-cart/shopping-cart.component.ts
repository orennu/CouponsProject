import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { ShoppingService } from 'src/app/services/shopping.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Coupon[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.cartItems = this.shoppingService.getCoupons();
  }

}
